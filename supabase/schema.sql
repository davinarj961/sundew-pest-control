-- ============ ENQUIRIES ============
create table if not exists public.enquiries (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  location text not null,
  type text not null,
  service text,
  bhk text,
  notes text,
  status text not null default 'pending',
  scheduled_at timestamptz,
  constraint enquiries_name_len check (char_length(name) between 2 and 100),
  constraint enquiries_phone_len check (char_length(phone) between 10 and 20),
  constraint enquiries_location_len check (char_length(location) between 2 and 200),
  constraint enquiries_notes_len check (notes is null or char_length(notes) <= 1000),
  constraint enquiries_type_valid check (type in ('inspection', 'booking')),
  constraint enquiries_status_valid check (status in ('pending', 'confirmed'))
);

alter table public.enquiries enable row level security;

create policy "Allow public inserts"
on public.enquiries for insert to anon
with check (true);

create policy "Admins can read enquiries"
on public.enquiries for select to authenticated
using (true);

create policy "Admins can update enquiries"
on public.enquiries for update to authenticated
using (true) with check (true);

-- Max 3 enquiries per phone number per hour
create or replace function public.limit_enquiry_spam()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if (
    select count(*) from public.enquiries e
    where right(regexp_replace(e.phone, '\D', '', 'g'), 10)
        = right(regexp_replace(new.phone, '\D', '', 'g'), 10)
      and e.created_at > now() - interval '1 hour'
  ) >= 3 then
    raise exception 'Too many enquiries from this number. Please try again later.';
  end if;
  return new;
end;
$$;

create trigger enquiry_rate_limit
before insert on public.enquiries
for each row execute function public.limit_enquiry_spam();

-- Public appointment lookup (returns status fields only)
create or replace function public.check_appointment(p_phone text)
returns table (
  ref text, type text, service text, bhk text,
  status text, scheduled_at timestamptz, created_at timestamptz
)
language sql security definer set search_path = public
as $$
  select ('SDW-' || e.id::text) as ref,
         e.type, e.service, e.bhk, e.status, e.scheduled_at, e.created_at
  from public.enquiries e
  where length(regexp_replace(p_phone, '\D', '', 'g')) >= 10
    and right(regexp_replace(e.phone, '\D', '', 'g'), 10)
      = right(regexp_replace(p_phone, '\D', '', 'g'), 10)
  order by e.created_at desc
  limit 5;
$$;

revoke all on function public.check_appointment(text) from public;
grant execute on function public.check_appointment(text) to anon, authenticated;

-- ============ REVIEWS ============
create table if not exists public.reviews (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  service text,
  location text,
  rating int not null check (rating between 1 and 5),
  body text not null,
  approved boolean not null default false,
  constraint reviews_name_len check (char_length(name) between 2 and 100),
  constraint reviews_body_len check (char_length(body) between 10 and 600)
);

alter table public.reviews enable row level security;

create policy "Public can submit reviews"
on public.reviews for insert to anon, authenticated
with check (approved = false);

create policy "Public can read approved reviews"
on public.reviews for select to anon
using (approved = true);

create policy "Admins can read all reviews"
on public.reviews for select to authenticated
using (true);

create policy "Admins can update reviews"
on public.reviews for update to authenticated
using (true) with check (true);

create policy "Admins can delete reviews"
on public.reviews for delete to authenticated
using (true);

-- Cap the moderation queue at 25 pending reviews
create or replace function public.limit_review_spam()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if (select count(*) from public.reviews where approved = false) >= 25 then
    raise exception 'Too many pending reviews. Please try again later.';
  end if;
  return new;
end;
$$;

create trigger review_queue_limit
before insert on public.reviews
for each row execute function public.limit_review_spam();