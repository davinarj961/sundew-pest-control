import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateStatus, signOut } from "./actions";

export const dynamic = "force-dynamic";

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

function waLink(phone) {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 10) digits = "91" + digits; // assume India
  return `https://wa.me/${digits}`;
}

const COLS = "grid-cols-[1.1fr_1.1fr_1.2fr_0.9fr_1.5fr_1.1fr_0.9fr_1.7fr]";

export default async function AdminPage() {
  const supabase = await createClient();

  // Second gate: even if the proxy were skipped, no login means no data
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: enquiries, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-cream-dim px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-2xl text-red-700 mb-3">
            Could not load enquiries
          </h1>
          <pre className="bg-white p-4 rounded-lg text-sm text-red-600 overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </main>
    );
  }

  const pending = enquiries.filter((e) => e.status === "pending").length;
  const confirmed = enquiries.filter((e) => e.status === "confirmed").length;

  return (
    <main className="min-h-screen bg-cream-dim px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-forest-950">
              Enquiries Dashboard
            </h1>
            <p className="text-sm text-forest-950/60 mt-1">
              Signed in as {user.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin/reviews"
              className="bg-forest-950 text-cream font-semibold text-sm px-5 py-2.5 rounded-lg"
            >
              Reviews →
            </a>
            <form action={signOut}>
              <button
                type="submit"
                className="border-[1.5px] border-forest-700 text-forest-950 font-semibold text-sm px-5 py-2.5 rounded-lg"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard label="Total" value={enquiries.length} />
          <StatCard label="Pending" value={pending} accent="amber" />
          <StatCard label="Confirmed" value={confirmed} accent="green" />
        </div>

        {/* Table */}
        <div className="bg-white border border-forest-950/10 rounded-2xl overflow-x-auto">
          <div className="min-w-[1150px]">
            <div className={`grid ${COLS} px-6 py-4 bg-forest-950 gap-4`}>
              {[
                "Received",
                "Name",
                "Phone",
                "Type",
                "Service",
                "Location",
                "Status",
                "Action",
              ].map((col) => (
                <span
                  key={col}
                  className="font-mono text-[11px] uppercase tracking-wide text-cream/60"
                >
                  {col}
                </span>
              ))}
            </div>

            {enquiries.length === 0 && (
              <div className="px-6 py-12 text-center text-sm text-forest-950/60">
                No enquiries yet. They will appear here as soon as someone
                submits the contact form.
              </div>
            )}

            {enquiries.map((enq, index) => (
              <div
                key={enq.id}
                className={`grid ${COLS} px-6 py-4 gap-4 items-start text-sm ${
                  index !== enquiries.length - 1
                    ? "border-b border-forest-950/10"
                    : ""
                }`}
              >
                <span className="text-xs text-forest-950/60">
                  {formatDate(enq.created_at)}
                </span>

                <span className="font-semibold text-forest-950">
                  {enq.name}
                </span>

                <div>
                  <a
                    href={`tel:${enq.phone}`}
                    className="text-forest-700 font-medium block"
                  >
                    {enq.phone}
                  </a>
                  <a
                    href={waLink(enq.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-forest-500 font-semibold"
                  >
                    WhatsApp →
                  </a>
                </div>

                <span className="text-forest-950/70 capitalize">
                  {enq.type}
                </span>

                <div className="text-forest-950/70">
                  {enq.service ? (
                    <>
                      <div>{enq.service}</div>
                      {enq.bhk && (
                        <div className="text-xs text-forest-950/50">
                          {enq.bhk}
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="text-forest-950/30">—</span>
                  )}
                  {enq.notes && (
                    <div className="text-xs text-forest-950/50 mt-1.5 italic">
                      "{enq.notes}"
                    </div>
                  )}
                </div>

                <span className="text-forest-950/70">{enq.location}</span>

                <span>
                  <span
                    className={`font-mono text-[10px] uppercase px-2.5 py-1 rounded-full font-semibold ${
                      enq.status === "confirmed"
                        ? "bg-forest-500/15 text-forest-700"
                        : "bg-[#FBF3E1] text-[#B8860B]"
                    }`}
                  >
                    {enq.status}
                  </span>
                </span>

                <form action={updateStatus} className="flex flex-col gap-1.5">
                  <input type="hidden" name="id" value={enq.id} />
                  <input
                    type="hidden"
                    name="status"
                    value={enq.status === "confirmed" ? "pending" : "confirmed"}
                  />
                  {enq.status !== "confirmed" && (
                    <input
                      type="datetime-local"
                      name="scheduled_at"
                      className="border border-forest-950/10 rounded-md px-2 py-1 text-xs bg-cream"
                    />
                  )}
                  {enq.status === "confirmed" && enq.scheduled_at && (
                    <span className="text-xs text-forest-950/60">
                      Visit: {formatDate(enq.scheduled_at)}
                    </span>
                  )}
                  <button
                    type="submit"
                    className="text-xs font-semibold text-forest-700 border border-forest-700/30 rounded-md px-3 py-1.5 hover:bg-forest-500/10"
                  >
                    {enq.status === "confirmed"
                      ? "Mark pending"
                      : "Mark confirmed"}
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, accent }) {
  const color =
    accent === "amber"
      ? "text-[#B8860B]"
      : accent === "green"
        ? "text-forest-500"
        : "text-forest-950";
  return (
    <div className="bg-white border border-forest-950/10 rounded-2xl px-6 py-5">
      <div className="font-mono text-[11px] uppercase tracking-wider text-forest-950/50 mb-1">
        {label}
      </div>
      <div className={`font-serif text-3xl font-semibold ${color}`}>
        {value}
      </div>
    </div>
  );
}
