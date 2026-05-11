"use client";
import Link from "next/link";

export function EmptyCart() {
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
        You haven't added any bag yet. Browse deals near you and rescue a meal.
      </p>
      <Link
        href="/discover"
        className="px-6 py-3 rounded-xl bg-brand-green text-white font-bold text-sm hover:opacity-90 transition-opacity"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        Browse bag deals →
      </Link>
    </div>
  );
}
