"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useFood from "@/hooks/food/useFood";
import useCartStore from "@/store/useCartStore";

function getUrgency(expiryTime) {
  const minutes = Math.max(
    0,
    Math.round((new Date(expiryTime) - Date.now()) / 60000),
  );
  if (minutes <= 30)
    return {
      color: "text-red-500 bg-red-50",
      bar: "bg-red-500",
      label: `${minutes}m left — Order now!`,
    };
  if (minutes <= 60)
    return {
      color: "text-amber-600 bg-amber-50",
      bar: "bg-amber-500",
      label: `${minutes}m left — Going fast`,
    };
  const h = Math.floor(minutes / 60),
    m = minutes % 60;
  return {
    color: "text-emerald-600 bg-emerald-50",
    bar: "bg-emerald-500",
    label: m > 0 ? `${h}h ${m}m left` : `${h}h left`,
  };
}

const formatTime = (time) => {
  return new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
// Format a slot object into a readable string
// Adjust the keys (start/end) to match whatever your API actually returns
function formatSlot(slot) {
  if (typeof slot === "string") return slot;
  if (slot?.start && slot?.end)
    return `${formatTime(slot.start)} – ${formatTime(slot.end)}`;
  return JSON.stringify(slot); // fallback so you can see what keys exist
}

export default function FoodDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  // Hooks-------
  const { data: food, isLoading, isError } = useFood(id);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [ordering, setOrdering] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <span className="animate-spin text-3xl">⏳</span>
      </div>
    );
  }
  if (isError || !food) {
    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <div className="flex-1 flex items-center justify-center text-center p-8">
          <div>
            <p className="text-5xl mb-3">😕</p>
            <p className="font-display font-bold text-xl text-gray-700">
              Listing not found
            </p>
            <Link
              href="/"
              className="mt-4 inline-block text-primary-500 font-semibold"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  // Destructure from actual API shape
  const {
    pricing,
    quantity,
    restaurant,
    pickupSlots = [],
    tags = [],
    expiryTime,
  } = food;
  const discountedPrice = pricing.discounted;
  const originalPrice = pricing.original;
  const quantityLeft = quantity.left;
  const quantityTotal = quantity.total;
  const isOutOfStock = quantityLeft <= 0;
  const isExpired = new Date(expiryTime) <= Date.now();

  const urgency = getUrgency(food.expiryTime);
  const discount = Math.round((1 - discountedPrice / originalPrice) * 100);

  const handleCartReserve = async () => {
    if (!selectedSlot) {
      toast.error("Please select a pickup slot first");
      return;
    }
    setOrdering(true);
    const item = {
      foodId: id,
      // snapshot of the food at the time of order
      foodName: food?.name,
      price: discountedPrice,
    };
    addItem(item, selectedSlot, food.restaurant._id);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("🎉 Added item in cart, Check It Out!!");
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-cream">
      <main className="max-w-2xl mx-auto pb-32 md:pb-10">
        {/* Hero image */}
        <div className="relative">
          {food.image ? (
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-72 md:h-96 object-cover md:rounded-b-3xl"
            />
          ) : (
            <div className="w-full h-72 md:h-96 bg-gray-100 md:rounded-b-3xl flex items-center justify-center text-6xl text-gray-300">
              🍽️
            </div>
          )}

          {/* Urgency ribbon */}
          <div
            className={`absolute bottom-4 left-4 right-4 ${urgency.color} rounded-2xl px-4 py-3 flex items-center gap-3`}
          >
            <div
              className={`w-2 h-2 rounded-full ${urgency.bar} animate-pulse shrink-0`}
            />
            <p className="font-bold text-sm">{urgency.label}</p>
            <span className="ml-auto font-black bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
              -{discount}%
            </span>
          </div>

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 w-9 h-9 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            ←
          </button>
        </div>

        <div className="px-4 pt-5">
          {/* Restaurant row */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-black shrink-0 uppercase">
              {restaurant?.name?.[0] ?? "?"}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700">
                {restaurant?.name}
              </p>
              {restaurant?.cuisine && (
                <p className="text-xs text-gray-400 capitalize">
                  {restaurant.cuisine}
                </p>
              )}
            </div>
            {/* rating/reviews not in API — omitted */}
          </div>

          {/* Title */}
          <h1 className="font-display font-black text-2xl text-gray-900 mb-2 leading-tight">
            {food.name}
          </h1>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="tag-pill text-xs bg-orange-50 text-orange-700 capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {food.description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              {food.description}
            </p>
          )}

          {/* Price block */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-5 shadow-sm">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-3xl font-black text-gray-900">
                ₹{discountedPrice}
              </span>
              <div>
                <span className="text-sm text-gray-400 line-through block">
                  ₹{originalPrice}
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  You save ₹{originalPrice - discountedPrice}
                </span>
              </div>
              <span className="ml-auto bg-primary-500 text-white font-black text-lg px-3 py-1.5 rounded-xl">
                -{discount}%
              </span>
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-gray-100 mt-2">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-2 h-2 rounded-full ${quantityLeft > 3 ? "bg-emerald-500" : "bg-red-500"}`}
                />
                <span className="text-xs font-semibold text-gray-600">
                  {isOutOfStock
                    ? "Sold out"
                    : quantityLeft <= 2
                      ? `Last ${quantityLeft}!`
                      : `${quantityLeft} of ${quantityTotal} left`}
                </span>
              </div>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs font-semibold text-gray-600">
                🥡 Pickup only
              </span>
            </div>
          </div>

          {/* Pickup slot selector */}
          {pickupSlots.length > 0 && (
            <div className="mb-5">
              <h3 className="font-display font-bold text-base text-gray-900 mb-2.5">
                Choose Pickup Slot
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {pickupSlots.map((slot, index) => {
                  const label = formatSlot(slot);
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedSlot(slot)}
                      className={`w-full p-3.5 rounded-xl border-2 text-sm font-semibold text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? "border-primary-500 bg-primary-50 text-primary-700"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <span>🕐 {label}</span>
                      {isSelected && (
                        <span className="text-primary-500 font-black text-lg">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sticky CTA */}
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 md:static md:px-4 px-4 pb-3 md:pb-6 bg-cream/95 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none pt-2">
          <button
            onClick={() => handleCartReserve()}
            disabled={ordering || isOutOfStock || isExpired}
            className={`w-full py-4 rounded-2xl font-sans font-black text-base
              bg-brand-orange-500
               flex items-center justify-center gap-2 transition-all 
               hover:bg-brand-orange-600/70 hover:shadow-lg hover:shadow-brand-orange-500/30 active:scale-[0.98]${
                 isOutOfStock || isExpired
                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                   : "bg-brand-green text-white hover:bg-brand-green-dark shadow-lg shadow-brand-green/30 active:scale-[0.98]"
               }`}
          >
            {ordering ? (
              <>
                <span className="animate-spin">⏳</span> Reserving...
              </>
            ) : isOutOfStock ? (
              "Sold Out"
            ) : isExpired ? (
              "Expired"
            ) : (
              <>Add to Cart ₹{discountedPrice}</>
            )}
          </button>
          {selectedSlot === null && !isOutOfStock && (
            <p className="text-center text-xs text-gray-400 mt-1.5">
              Select a slot to continue
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
