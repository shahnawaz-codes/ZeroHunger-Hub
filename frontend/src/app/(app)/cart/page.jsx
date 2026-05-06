"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import { showToast } from "@/components/ui";
import Link from "next/link";
import { shallow } from "zustand/shallow";
import { useCountdown } from "@/utils/countdown";
import { CartItem } from "@/components/cart/CartItem";
import { EmptyCart } from "@/components/cart/EmptyCart";
import OrderSummary from "@/components/cart/OrderSummary";

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const slot = useCartStore((s) => s.slot);
  const expiryAt = useCartStore((s) => s.expiryAt);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const initializeCart = useCartStore((s) => s.initializeCart, shallow);

  const [isOrdering, setIsOrdering] = useState(false);
  const countdown = useCountdown(expiryAt);

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  // If cart expired, clear it
  useEffect(() => {
    console.log("expiryAt:", expiryAt);
    console.log("countdown.expired:", countdown.expired);
    if (expiryAt && countdown.expired) {
      clearCart();
      showToast.error("Your cart reservation expired. Items cleared.");
    }
  }, [countdown.expired]);

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
