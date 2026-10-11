import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { setApproved, deleteReview } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("approved", { ascending: true }) // pending first
    .order("created_at", { ascending: false });

  const reviews = data ?? [];
  const pendingCount = reviews.filter((r) => !r.approved).length;

  return (
    <main className="min-h-screen bg-cream-dim px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-forest-950">
              Review Moderation
            </h1>
            <p className="text-sm text-forest-950/60 mt-1">
              {pendingCount} waiting for approval · {reviews.length} total
            </p>
          </div>
          <a
            href="/admin"
            className="border-[1.5px] border-forest-700 text-forest-950 font-semibold text-sm px-5 py-2.5 rounded-lg"
          >
            ← Enquiries
          </a>
        </div>

        {error && (
          <pre className="bg-white p-4 rounded-lg text-sm text-red-600 mb-6 overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        )}

        {reviews.length === 0 && (
          <div className="bg-white border border-forest-950/10 rounded-2xl p-10 text-center text-sm text-forest-950/60">
            No reviews submitted yet.
          </div>
        )}

        <div className="flex flex-col gap-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white border border-forest-950/10 rounded-2xl p-6"
            >
              <div className="flex flex-wrap justify-between items-start gap-3 mb-2">
                <div>
                  <div className="font-semibold text-forest-950">{r.name}</div>
                  <div className="text-xs text-forest-950/60 font-mono">
                    {r.service}
                    {r.location ? ` · ${r.location}` : ""}
                  </div>
                </div>
                <span
                  className={`font-mono text-[10px] uppercase px-2.5 py-1 rounded-full font-semibold ${
                    r.approved
                      ? "bg-forest-500/15 text-forest-700"
                      : "bg-[#FBF3E1] text-[#B8860B]"
                  }`}
                >
                  {r.approved ? "Published" : "Pending"}
                </span>
              </div>

              <div className="text-gold text-sm">{"★".repeat(r.rating)}</div>
              <p className="text-sm text-forest-950/70 leading-relaxed mt-2">
                {r.body}
              </p>

              <div className="flex gap-2.5 mt-4">
                <form action={setApproved}>
                  <input type="hidden" name="id" value={r.id} />
                  <input
                    type="hidden"
                    name="approved"
                    value={r.approved ? "false" : "true"}
                  />
                  <button
                    type="submit"
                    className="text-xs font-semibold text-forest-700 border border-forest-700/30 rounded-md px-3.5 py-1.5 hover:bg-forest-500/10"
                  >
                    {r.approved ? "Unpublish" : "Approve & publish"}
                  </button>
                </form>

                <form action={deleteReview}>
                  <input type="hidden" name="id" value={r.id} />
                  <button
                    type="submit"
                    className="text-xs font-semibold text-red-700 border border-red-200 rounded-md px-3.5 py-1.5 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
