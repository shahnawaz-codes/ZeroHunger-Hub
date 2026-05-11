// components/RestaurantPartnerCTA.jsx
"use client";
import { useRouter } from "next/navigation";

export function RestaurantPartnerCTA() {
  const router = useRouter();

  return (
    <div className="rounded-2xl border border-neutral-200 overflow-hidden bg-white">
      <div className="h-[3px] bg-brand-green-500" />
      <div className="p-6 flex gap-5">
        <div className="w-12 h-12 rounded-xl bg-brand-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
          {/* house icon */}
          <svg
            className="w-5 h-5 stroke-brand-green-700"
            fill="none"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>

        <div className="flex-1">
          <h2
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
            className="text-xl text-neutral-900 leading-tight mb-2 tracking-tight"
          >
            Turn unsold bag into revenue
          </h2>
          <p className="text-sm text-neutral-500 leading-relaxed mb-4">
            List surplus meals at a discount. Reach nearby customers before
            closing. Zero waste, zero platform fees to start.
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {[
              "Free to list",
              "Set your own prices",
              "Pickup-only",
              "You control quantity",
            ].map((t) => (
              <span
                key={t}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-brand-green-50 text-brand-green-900 border border-brand-green-200"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/become-a-partner")}
              className="text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-85 bg-brand-orange-500 text-white"
            >
              List my restaurant
            </button>
            <button className="text-sm font-medium px-3.5 py-2 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50 transition-colors">
              See how it works
            </button>
          </div>

          <p className="text-[11px] text-neutral-400 mt-3 leading-relaxed">
            Takes 2 minutes. Your account upgrades instantly — no admin approval
            to list bag.
          </p>
        </div>
      </div>

      <div className="flex border-t border-neutral-200 bg-neutral-50/60">
        {[
          ["340+ kg", "saved this week"],
          ["₹180", "avg order value"],
          ["4.8 min", "avg pickup time"],
        ].map(([n, l]) => (
          <div key={l} className="flex-1 text-center py-3">
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                color: "#4CAF50",
                fontSize: 17,
              }}
            >
              {n}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-400 mt-0.5">
              {l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
