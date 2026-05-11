"use client";

function OrderSummary({ items, slot, onCheckout, isLoading }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const originalTotal = items.reduce(
    (s, i) => s + Math.round(i.price / 0.65) * i.quantity,
    0,
  );
  const savings = originalTotal - subtotal;
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const formatSlot = (s) => {
    if (!s) return "—";
    if (typeof s === "string") return s;
    if (s?.start && s?.end) {
      const fmt = (t) =>
        new Date(t).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      return `${fmt(s.start)} – ${fmt(s.end)}`;
    }
    return JSON.stringify(s);
  };

  return (
    <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl overflow-hidden">
      <div className="h-[2px] bg-brand-green" />
      <div className="p-5">
        <h3
          className="text-white font-extrabold text-base mb-4"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Order Summary
        </h3>

        {/* line items */}
        <div className="space-y-2.5 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Items ({totalItems})</span>
            <span className="text-white/70">₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Original value</span>
            <span className="text-white/40 line-through">₹{originalTotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-brand-green font-semibold">You save</span>
            <span className="text-brand-green font-bold">−₹{savings}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Delivery fee</span>
            <span className="text-brand-green font-semibold">
              Free (pickup)
            </span>
          </div>
        </div>

        <div className="border-t border-white/8 pt-4 mb-4">
          <div className="flex justify-between">
            <span
              className="text-white font-bold"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Total
            </span>
            <span
              className="text-white font-black text-xl"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              ₹{subtotal}
            </span>
          </div>
        </div>

        {/* Pickup slot pill */}
        {slot && (
          <div className="bg-brand-green/10 border border-brand-green/25 rounded-xl p-3 mb-4 flex items-center gap-2.5">
            <span className="text-brand-green text-base">🕐</span>
            <div>
              <p className="text-brand-green text-[10px] font-bold uppercase tracking-wider">
                Pickup Slot
              </p>
              <p className="text-white text-sm font-semibold mt-0.5">
                {formatSlot(slot)}
              </p>
            </div>
          </div>
        )}

        {/* CO2 impact teaser */}
        <div className="bg-emerald-500/8 border border-emerald-500/15 rounded-xl p-3 mb-5 flex items-center gap-2.5">
          <span className="text-lg">🌍</span>
          <p className="text-emerald-400 text-xs font-medium leading-snug">
            Saving ~{(subtotal * 0.003).toFixed(1)}kg CO₂ by rescuing this bag
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onCheckout}
          disabled={isLoading || !slot}
          className={`w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all
            ${
              !slot
                ? "bg-white/5 text-white/30 cursor-not-allowed"
                : "bg-brand-orange text-[#2a1500] hover:opacity-90 active:scale-[0.98] shadow-lg shadow-brand-orange/20"
            }`}
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⏳</span> Placing order...
            </>
          ) : !slot ? (
            "Select a slot to continue"
          ) : (
            <>
              Place Order · ₹{subtotal} <span className="opacity-60">→</span>
            </>
          )}
        </button>
        {!slot && (
          <p className="text-center text-white/25 text-[11px] mt-2">
            Go back and select a pickup slot
          </p>
        )}
      </div>
    </div>
  );
}

export default OrderSummary;
