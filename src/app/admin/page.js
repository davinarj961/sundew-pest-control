const dummyEnquiries = [
  {
    id: "SDW-2905",
    name: "Arjun Prakash",
    phone: "+91 98765 11111",
    type: "Service Booking",
    service: "Export Cargo Fumigation",
    location: "Coimbatore",
    status: "pending",
    date: "22 Sep 2026",
  },
  {
    id: "SDW-2904",
    name: "Meena Raj",
    phone: "+91 98765 22222",
    type: "Free Inspection",
    service: "Termite Treatment",
    location: "Anna Nagar, Chennai",
    status: "confirmed",
    date: "21 Sep 2026",
  },
  {
    id: "SDW-2903",
    name: "Suresh Babu",
    phone: "+91 98765 33333",
    type: "Service Booking",
    service: "Warehouse Fumigation",
    location: "Madurai",
    status: "confirmed",
    date: "20 Sep 2026",
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-cream-dim px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-forest-950">
              Enquiries Dashboard
            </h1>
            <p className="text-sm text-forest-950/60 mt-1">
              All contact form and booking submissions
            </p>
          </div>
          <div className="font-mono text-xs text-forest-950/50 uppercase tracking-wider">
            {dummyEnquiries.length} Total
          </div>
        </div>

        <div className="bg-white border border-forest-950/10 rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-7 px-6 py-4 bg-forest-950 gap-4">
            {["ID", "Name", "Phone", "Type", "Service", "Location", "Status"].map(
              (col) => (
                <span
                  key={col}
                  className="font-mono text-[11px] uppercase tracking-wide text-cream/60"
                >
                  {col}
                </span>
              )
            )}
          </div>

          {/* Table rows */}
          {dummyEnquiries.map((enq, index) => (
            <div
              key={enq.id}
              className={`grid grid-cols-7 px-6 py-4 gap-4 items-center text-sm ${
                index !== dummyEnquiries.length - 1
                  ? "border-b border-forest-950/10"
                  : ""
              }`}
            >
              <span className="font-mono text-xs text-forest-950/60">{enq.id}</span>
              <span className="font-semibold text-forest-950">{enq.name}</span>
              <span className="text-forest-950/70">{enq.phone}</span>
              <span className="text-forest-950/70">{enq.type}</span>
              <span className="text-forest-950/70">{enq.service}</span>
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
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}