import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewForm from "@/components/ReviewForm";
import { supabase } from "@/lib/supabaseClient";

// Re-check for newly approved reviews at most once a minute
export const revalidate = 60;

export default async function ReviewsPage() {
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  const reviews = data ?? [];
  const average = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
        1,
      )
    : null;

  return (
    <main>
      <Navbar />

      <section className="px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-forest-700 bg-forest-500/10 px-3.5 py-1.5 rounded-full mb-5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500"></span>
            Customer Reviews
          </div>

          <div className="flex flex-wrap justify-between items-end gap-6 mb-11">
            <div>
              <h1 className="font-serif text-4xl font-semibold text-forest-950 mb-2.5">
                What our customers say
              </h1>
              <p className="text-forest-950/70 text-sm">
                Feedback from homes, restaurants and businesses across Tamil
                Nadu.
              </p>
            </div>

            {average && (
              <div className="flex items-center gap-4 bg-white border border-forest-950/10 rounded-2xl px-6 py-4">
                <div className="font-serif text-4xl font-semibold text-forest-950">
                  {average}
                </div>
                <div>
                  <div className="text-gold text-sm">★★★★★</div>
                  <div className="text-xs text-forest-950/60">
                    {reviews.length} review{reviews.length === 1 ? "" : "s"}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-9">
            <ReviewForm />
          </div>

          {reviews.length === 0 ? (
            <div className="bg-white border border-forest-950/10 rounded-2xl p-10 text-center text-sm text-forest-950/60">
              No reviews yet. Be the first to share your experience.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-white border border-forest-950/10 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest-300 to-forest-700 text-cream flex items-center justify-center text-sm font-semibold">
                      {r.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-forest-950">
                        {r.name}
                      </div>
                      <div className="text-xs text-forest-950/60 font-mono">
                        {r.service}
                      </div>
                    </div>
                  </div>
                  <div className="text-gold text-xs">
                    {"★".repeat(r.rating)}
                    <span className="text-forest-950/15">
                      {"★".repeat(5 - r.rating)}
                    </span>
                  </div>
                  <p className="text-sm text-forest-950/70 leading-relaxed mt-2.5">
                    {r.body}
                  </p>
                  {r.location && (
                    <div className="text-xs text-forest-950/40 font-mono mt-3">
                      {r.location}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
