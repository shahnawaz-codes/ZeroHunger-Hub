"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import { showToast } from "@/components/ui";
import Link from "next/link";

/* ─── Countdown helper ─────────────────────────────────────── */
function useCountdown(expiryAt) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    const tick = () => {
      const left = expiryAt
        ? Math.max(0, Math.floor((expiryAt - Date.now()) / 1000))
        : 0;
      setSecs(left);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiryAt]);
  const m = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return { display: `${m}:${s}`, isUrgent: secs < 120, expired: secs === 0 };
}

/* ─── Item Card — square-box format ────────────────────────── */
function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  const savings = Math.round(item.price * 0.35 * item.quantity); // estimate original

  return (
    <div className="group relative bg-[#1a1a1a] border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-200">
      {/* top color strip keyed to item */}
      <div className="h-[2px] bg-gradient-to-r from-brand-green via-brand-orange to-brand-green opacity-60" />

      <div className="p-4">
        {/* emoji placeholder since items don't carry image */}
        <div className="flex gap-4 items-start">
          {/* square food icon box */}
          <div className="w-14 h-14 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-2xl flex-shrink-0">
            🍱
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="text-white font-bold text-sm leading-snug truncate pr-6"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {item.foodName}
            </p>
            <p className="text-white/40 text-[11px] font-medium mt-0.5">
              per item
            </p>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span
                className="text-brand-green font-black text-lg leading-none"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                ₹{item.price}
              </span>
              <span className="text-white/25 text-xs line-through">
                ₹{Math.round(item.price / 0.65)}
              </span>
            </div>
          </div>

          {/* remove button */}
          <button
            onClick={onRemove}
            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-white/30 hover:text-red-400 transition-all text-xs"
          >
            ✕
          </button>
        </div>

        {/* bottom row: qty + subtotal */}
        <div className="flex items-center justify-between mt-4">
          {/* Qty control — square boxes */}
          <div className="flex items-center gap-0 bg-white/5 rounded-xl overflow-hidden border border-white/8">
            <button
              onClick={onDecrement}
              className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all text-lg font-light"
            >
              −
            </button>
            <span
              className="w-9 h-9 flex items-center justify-center text-white font-bold text-sm border-x border-white/8"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {item.quantity}
            </span>
            <button
              onClick={onIncrement}
              className="w-9 h-9 flex items-center justify-center text-brand-green hover:bg-brand-green/10 transition-all text-lg font-light"
            >
              +
            </button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <p className="text-white/40 text-[10px] font-medium uppercase tracking-wider">
              subtotal
            </p>
            <p
              className="text-white font-black text-base"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              ₹{item.price * item.quantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Order Summary box ────────────────────────────────────── */
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
            Saving ~{(subtotal * 0.003).toFixed(1)}kg CO₂ by rescuing this food
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

/* ─── Empty state ──────────────────────────────────────────── */
function EmptyCart() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center text-4xl mb-5">
        🛒
      </div>
      <h2
        className="text-white font-extrabold text-xl mb-2"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        Cart is empty
      </h2>
      <p className="text-white/40 text-sm mb-8 max-w-xs leading-relaxed">
        You haven't added any food yet. Browse deals near you and rescue a meal.
      </p>
      <Link
        href="/discover"
        className="px-6 py-3 rounded-xl bg-brand-green text-white font-bold text-sm hover:opacity-90 transition-opacity"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        Browse food deals →
      </Link>
    </div>
  );
}

/* ─── Main Cart Page ───────────────────────────────────────── */
export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const slot = useCartStore((s) => s.slot);
  const expiryAt = useCartStore((s) => s.expiryAt);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const initializeCart = useCartStore((s) => s.initializeCart);

  const [isOrdering, setIsOrdering] = useState(false);
  const countdown = useCountdown(expiryAt);

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  // // If cart expired, clear it
  // useEffect(() => {
  //   if (expiryAt && countdown.expired && items.length > 0) {
  //     clearCart();
  //     showToast.error("Your cart reservation expired. Items cleared.");
  //   }
  // }, [countdown.expired]);

  const handleCheckout = async () => {
    setIsOrdering(true);
    // TODO: wire to useCreateOrder + build payload from store

    await new Promise((r) => setTimeout(r, 1500));
    showToast.success("Order placed! 🎉");
    clearCart();
    router.push("/orders");
    setIsOrdering(false);
  };

  return (
    <div className="min-h-screen bg-[#111]">
      {/* ── Header ── */}
      <div className="sticky top-14 z-40 bg-[#111]/90 backdrop-blur-md border-b border-white/6">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all text-sm"
            >
              ←
            </button>
            <h1
              className="text-white font-extrabold text-base"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Cart
              {items.length > 0 && (
                <span className="ml-2 text-[11px] font-bold bg-brand-green text-white px-2 py-0.5 rounded-full">
                  {items.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </h1>
          </div>

          {/* Expiry countdown */}
          {items.length > 0 && expiryAt && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-colors ${
                countdown.isUrgent
                  ? "bg-red-500/15 border-red-500/30 text-red-400"
                  : "bg-brand-green/10 border-brand-green/25 text-brand-green"
              }`}
            >
              <span className={countdown.isUrgent ? "animate-ping-once" : ""}>
                ⏱
              </span>
              <span>{countdown.display}</span>
            </div>
          )}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 pt-5 pb-28 md:pb-10">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col md:flex-row gap-5">
            {/* ── Left column: items ── */}
            <div className="flex-1 min-w-0 space-y-3">
              {/* Restaurant info row */}
              <div className="flex items-center gap-3 px-1 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-green/15 border border-brand-green/25 flex items-center justify-center text-sm">
                  🏪
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">
                    From one restaurant
                  </p>
                  <p className="text-white/70 text-sm font-semibold">
                    Same-restaurant policy enforced
                  </p>
                </div>
              </div>

              {/* Item cards */}
              {items.map((item) => (
                <CartItem
                  key={item.foodId}
                  item={item}
                  onIncrement={() => setQuantity(item.foodId, "INCREMENT")}
                  onDecrement={() => setQuantity(item.foodId, "DECREMENT")}
                  onRemove={() => removeItem(item.foodId)}
                />
              ))}

              {/* Clear cart */}
              <button
                onClick={() => {
                  if (confirm("Clear your entire cart?")) clearCart();
                }}
                className="w-full py-3 rounded-xl border border-white/6 text-white/30 hover:text-red-400 hover:border-red-500/20 text-xs font-semibold transition-all mt-2"
              >
                Clear cart
              </button>

              {/* Info boxes — square grid */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { icon: "🛡️", label: "Secure checkout" },
                  { icon: "🥡", label: "Pickup only" },
                  { icon: "♻️", label: "Zero waste" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="bg-white/3 border border-white/6 rounded-xl p-3 text-center"
                  >
                    <div className="text-xl mb-1">{b.icon}</div>
                    <p className="text-white/40 text-[10px] font-semibold leading-tight">
                      {b.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right column: summary ── */}
            <div className="md:w-80 shrink-0">
              <div className="sticky top-32">
                <OrderSummary
                  items={items}
                  slot={slot}
                  onCheckout={handleCheckout}
                  isLoading={isOrdering}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile sticky CTA */}
      {items.length > 0 && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 px-4 pb-3 bg-[#111]/95 backdrop-blur-md border-t border-white/6 pt-3">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-white/50 text-xs font-medium">
              {items.reduce((s, i) => s + i.quantity, 0)} items ·{" "}
              <span className="text-brand-green">
                ₹
                {Math.round(
                  items.reduce((s, i) => s + i.price * i.quantity * 0.35, 0),
                )}{" "}
                saved
              </span>
            </span>
            <span
              className="text-white font-black"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              ₹{items.reduce((s, i) => s + i.price * i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isOrdering || !slot}
            className={`w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all
              ${
                !slot
                  ? "bg-white/5 text-white/30"
                  : "bg-brand-orange text-[#2a1500] shadow-lg shadow-brand-orange/25"
              }`}
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {!slot
              ? "Select pickup slot first"
              : `Place Order · ₹${items.reduce((s, i) => s + i.price * i.quantity, 0)}`}
          </button>
        </div>
      )}
    </div>
  );
}
