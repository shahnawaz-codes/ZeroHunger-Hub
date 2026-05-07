"use client";
import Link from "next/link";

function getUrgency(expiryTime) {
  const minutes = Math.max(
    0,
    Math.round((new Date(expiryTime) - Date.now()) / 60000),
  );
  if (minutes <= 30)
    return { color: "bg-feedback-error", text: `${minutes}m left` };
  if (minutes <= 60)
    return { color: "bg-feedback-warning", text: `${minutes}m left` };
  const h = Math.floor(minutes / 60),
    m = minutes % 60;
  return {
    color: "bg-brand-green-600",
    text: m > 0 ? `${h}h ${m}m` : `${h}h left`,
  };
}

export function FoodCard({ food, compact = false }) {
  const { pricing, quantity, restaurant, expiryTime, tags = [] } = food;

  const urgency = getUrgency(expiryTime);
  const discount = Math.round(
    (1 - pricing.discounted / pricing.original) * 100,
  );
  const isOutOfStock = quantity.left === 0;
  const isLowStock = quantity.left > 0 && quantity.left <= 2;
  const isExpired = new Date(expiryTime) <= Date.now();

  if (isExpired || isOutOfStock) {
    // Still render but visually disabled — don't silently hide
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-200 opacity-50 cursor-not-allowed">
        <div
          className={`relative overflow-hidden ${compact ? "h-36" : "h-44"} bg-neutral-100 flex items-center justify-center`}
        >
          <span className="text-neutral-400 text-sm font-semibold">
            {isOutOfStock ? "Out of Stock" : "Expired"}
          </span>
        </div>
        <div className="p-3">
          <p className="text-xs text-neutral-500 truncate">
            {restaurant?.name}
          </p>
          <h3
            className={`font-bold text-neutral-900 ${compact ? "text-sm" : "text-base"}`}
          >
            {food.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xl font-black text-neutral-400">
              ₹{pricing.discounted}
            </span>
            <span className="text-sm text-neutral-300 line-through">
              ₹{pricing.original}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/discover/${food._id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-neutral-200">
        {/* Image — no image field in API, use placeholder */}
        <div
          className={`relative overflow-hidden ${compact ? "h-36" : "h-44"} bg-neutral-100`}
        >
          {food.image ? (
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300 text-4xl">
              🍽️
            </div>
          )}

          <span
            className={`absolute top-2.5 left-2.5 ${urgency.color} text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1`}
          >
            ⏱ {urgency.text}
          </span>

          <span className="absolute top-2.5 right-2.5 bg-black/80 text-white text-xs font-black px-2 py-1 rounded-full">
            -{discount}%
          </span>

          {isLowStock && (
            <span className="absolute bottom-2.5 left-2.5 bg-feedback-error text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
              Only {quantity.left} left!
            </span>
          )}
        </div>

        <div className="p-3">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-xs text-neutral-500 font-medium truncate max-w-[70%]">
              {restaurant?.name}
            </span>
            {/* distance not in API — omit rather than show undefined */}
            {food.distance != null && (
              <span className="text-xs text-neutral-400 font-medium">
                {food.distance} km
              </span>
            )}
          </div>

          <h3
            className={`font-bold text-neutral-900 leading-tight mb-2 ${compact ? "text-sm" : "text-base"}`}
          >
            {food.name}
          </h3>

          {!compact && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2.5">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-xs bg-brand-orange-50 text-brand-orange-700 capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-neutral-900">
              ₹{pricing.discounted}
            </span>
            <span className="text-sm text-neutral-400 line-through">
              ₹{pricing.original}
            </span>
            <span className="ml-auto text-xs font-semibold text-feedback-success">
              Save ₹{pricing.original - pricing.discounted}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
