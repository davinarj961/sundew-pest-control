"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error | norating

  function close() {
    setOpen(false);
    setStatus("idle");
    setRating(0);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (rating === 0) {
      setStatus("norating");
      return;
    }

    setStatus("sending");
    const data = new FormData(e.target);
    if (data.get("website")) {
      setStatus("success");
      return;
    }

    const { error } = await supabase.from("reviews").insert({
      name: data.get("name"),
      service: data.get("service"),
      location: data.get("location") || null,
      rating,
      body: data.get("body"),
    });

    if (error) {
      console.error("Review insert error:", error);
      setStatus("error");
      return;
    }

    setStatus("success");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-forest-950 text-cream font-semibold text-sm px-5 py-3 rounded-lg"
      >
        + Add Your Review
      </button>

      {open && (
        <div className="fixed inset-0 bg-forest-950/55 flex items-center justify-center z-[200] p-5">
          <div className="bg-white rounded-2xl p-8 max-w-[440px] w-full max-h-[90vh] overflow-y-auto">
            {status === "success" ? (
              <div className="text-center py-4">
                <h3 className="font-serif text-2xl text-forest-950 mb-2">
                  Thank you!
                </h3>
                <p className="text-sm text-forest-950/70 mb-6">
                  Your review has been received and will appear on this page
                  once our team approves it.
                </p>
                <button
                  onClick={close}
                  className="bg-forest-950 text-cream font-semibold text-sm px-6 py-2.5 rounded-lg"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label>Website</label>
                  <input
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <h3 className="font-serif text-2xl text-forest-950 mb-1.5">
                  Share your experience
                </h3>
                <p className="text-sm text-forest-950/60 mb-5">
                  Your review helps other customers trust our service.
                </p>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-forest-950 block mb-1.5">
                    Your Name
                  </label>
                  <input
                    name="name"
                    required
                    className="input"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-forest-950 block mb-1.5">
                    Service Used
                  </label>
                  <select name="service" className="input">
                    <option>Household Pest Control</option>
                    <option>Termite Treatment</option>
                    <option>Export Fumigation</option>
                    <option>Chamber Fumigation</option>
                    <option>Vessel Fumigation</option>
                    <option>Warehouse Fumigation</option>
                    <option>Commercial Contract</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-forest-950 block mb-1.5">
                    City / Area (optional)
                  </label>
                  <input
                    name="location"
                    className="input"
                    placeholder="e.g. Madurai"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-forest-950 block mb-1.5">
                    Rating
                  </label>
                  <div className="flex gap-1.5 text-2xl">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        onClick={() => setRating(n)}
                        className={`cursor-pointer ${
                          n <= rating ? "text-gold" : "text-forest-950/10"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {status === "norating" && (
                    <p className="text-xs text-red-700 mt-1.5">
                      Please choose a star rating.
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-forest-950 block mb-1.5">
                    Your Review
                  </label>
                  <textarea
                    name="body"
                    required
                    rows={3}
                    maxLength={600}
                    minlength={10}
                    className="input"
                    placeholder="Tell us about your experience..."
                  ></textarea>
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-700 mb-3">
                    Something went wrong. Please try again.
                  </p>
                )}
                <p className="text-xs text-forest-950/50 mt-1">
                  Your name, city and review will be shown publicly once
                  approved.
                </p>

                <div className="flex gap-2.5 mt-5">
                  <button
                    type="button"
                    onClick={close}
                    className="flex-1 border-[1.5px] border-forest-950/10 text-forest-950/70 font-semibold text-sm py-2.5 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex-1 bg-forest-950 text-cream font-semibold text-sm py-2.5 rounded-lg disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending..." : "Submit Review"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
