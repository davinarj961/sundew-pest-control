import { supabase } from "@/lib/supabaseClient";

export default async function AdminPage() {
  const { data: enquiries, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-cream-dim px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-2xl text-red-700 mb-3">
            Connection Error
          </h1>
          <pre className="bg-white p-4 rounded-lg text-sm text-red-600 overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream-dim px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-3xl font-semibold text-forest-950 mb-2">
          Connection Test
        </h1>
        <p className="text-sm text-forest-950/60 mb-8">
          Fetched {enquiries.length} row(s) directly from Supabase.
        </p>

        <pre className="bg-white border border-forest-950/10 rounded-xl p-6 text-sm overflow-auto">
          {JSON.stringify(enquiries, null, 2)}
        </pre>
      </div>
    </main>
  );
}