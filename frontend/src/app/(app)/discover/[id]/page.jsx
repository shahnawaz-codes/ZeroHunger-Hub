"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/ui";
import useBag from "@/hooks/bag/useBag";

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
const formatTime =
 (time) => {
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

export default function bagDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  // Hooks-------
  const { data: bag, isLoading, isError } = useBag(id);
  const [ordering, setOrdering] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-brand-green-200 border-t-brand-green-500 rounded-none animate-spin" />
          <p className="font-sans text-sm text-neutral-500 uppercase tracking-widest">Loading...</p>
        </div>
      </div>
    );
  }
  if (isError || !bag) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center text-center p-8">
          <div className="max-w-xs border border-neutral-200 bg-white p-8 rounded-none">
            <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2 uppercase">
              Bag Not Found
            </h2>
            <p className="text-neutral-500 text-sm mb-8">
              The requested item is currently unavailable or has been removed.
            </p>
            <Link
              href="/discover"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-brand-green-500 text-white font-bold uppercase tracking-widest text-xs hover:bg-brand-green-600 transition-colors rounded-none"
            >
              Back to Discover
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
  } = bag;
  const discountedPrice = pricing.discounted;
  const originalPrice = pricing.original;
  const quantityLeft = quantity.left;
  const quantityTotal = quantity.total;
  const isOutOfStock = quantityLeft <= 0;
  const expiryDate = new Date(expiryTime);
  const isExpired =
    !expiryTime ||
    isNaN(expiryDate.getTime()) ||
    expiryDate.getTime() <= Date.now();
  const urgency = getUrgency(expiryTime);
  const discount = Math.round((1 - discountedPrice / originalPrice) * 100);

  const handleCartReserve = async () => {
    setOrdering(true);
    const item = {
      bagId: id,
      bagName: bag?.name,
      price: discountedPrice,
    };
    await new Promise((r) => setTimeout(r, 1200));
    showToast.success("Reservation successful. Proceeding to orders.");
    router.push("/orders");
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-24 font-sans">
      <main className="max-w-screen-lg mx-auto">
        {/* Hero Section */}
        <div className="relative h-[35vh] md:h-[45vh] overflow-hidden border-b border-neutral-200">
          {bag.image ? (
            <img
              src={bag.image}
              alt={bag.name}
              className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
            />
          ) : (
            <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-6xl text-neutral-300">
              NO IMAGE
            </div>
          )}

          {/* Overlays */}
          <div className="absolute inset-0 bg-neutral-900/40" />
          
          <button
            onClick={() => router.back()}
            className="absolute top-8 left-8 w-10 h-10 bg-white text-neutral-900 border border-neutral-200 rounded-none flex items-center justify-center hover:bg-neutral-50 transition-all active:scale-95 group z-20"
          >
            <span className="text-xl group-hover:-translate-x-0.5 transition-transform">←</span>
          </button>

          <div className="absolute bottom-10 left-8 right-8 flex flex-col gap-4 z-10">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-brand-green-500 text-white text-[10px] font-bold rounded-none uppercase tracking-[0.2em]">
                {bag.type || "SURPRISE BAG"}
              </span>
              {isOutOfStock && (
                <span className="px-2 py-0.5 bg-neutral-900 text-white text-[10px] font-bold rounded-none uppercase tracking-[0.2em]">
                  OUT OF STOCK
                </span>
              )}
            </div>
            <h1 className="font-display font-bold text-4xl md:text-6xl text-white leading-none uppercase tracking-tight">
              {bag.name}
            </h1>
          </div>
        </div>

        <div className="px-8 -mt-12 relative z-20">
          {/* Main Info Header */}
          <div className="bg-white border border-neutral-200 rounded-none p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 border border-neutral-100 flex items-center justify-center rounded-none bg-neutral-50`}>
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${urgency.color.split(' ')[0]}`}>
                  Status: {urgency.label.split('—')[0]}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-neutral-900 tracking-tighter uppercase">Available Until {formatTime(expiryTime)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-8 border-l border-neutral-100 pl-8 h-full">
              <div className="text-left">
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-1">Price Analysis</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-neutral-900 tracking-tighter">₹{discountedPrice}</span>
                  <span className="text-xs text-neutral-400 font-bold line-through">₹{originalPrice}</span>
                </div>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 px-4 py-2 rounded-none flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">OFF</span>
                <span className="text-lg font-bold text-brand-green-500">{discount}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
            {/* Left Column: Info */}
            <div className="md:col-span-8 space-y-8">
              {/* Restaurant Details Section */}
              <section className="bg-white border border-neutral-200 rounded-none p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-neutral-100">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-none bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-400 text-2xl font-bold">
                      {restaurant?.name?.[0] ?? "R"}
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-2xl text-neutral-900 uppercase tracking-tight">
                        {restaurant?.name}
                      </h2>
                      <p className="text-xs text-neutral-400 font-bold uppercase tracking-[0.15em] mt-1">
                        {restaurant?.cuisine || "General Food Service"}
                      </p>
                    </div>
                  </div>
                  {bag.distance && (
                    <div className="bg-neutral-50 border border-neutral-200 px-4 py-2 rounded-none">
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-0.5">Proximity</p>
                      <p className="text-sm font-bold text-neutral-900 uppercase">{bag.distance} KM</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                  <div className="space-y-1">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Location Address</p>
                    <p className="text-sm text-neutral-700 font-medium leading-relaxed">
                      {restaurant?.address || "Registered business address not provided."}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Contact Info</p>
                    <p className="text-sm text-neutral-700 font-medium leading-relaxed">
                      Please refer to order confirmation for direct contact details.
                    </p>
                  </div>
                </div>
              </section>

              {/* Description Section */}
              <section className="bg-white border border-neutral-200 rounded-none p-8 space-y-6">
                <h3 className="font-display font-bold text-lg text-neutral-900 uppercase tracking-widest border-b border-neutral-100 pb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-brand-green-500" />
                  Product Description
                </h3>
                <p className="text-neutral-500 text-sm leading-8 max-w-2xl">
                  {bag.description || "Comprehensive description not available for this surprise bag. Expected contents may vary based on daily inventory availability. Includes surplus high-quality food items."}
                </p>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-neutral-50 border border-neutral-200 text-neutral-500 text-[10px] font-bold uppercase tracking-widest rounded-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Right Column: Inventory & Window */}
            <div className="md:col-span-4 space-y-8">
              {/* Inventory Control */}
              <section className="bg-white border border-neutral-200 rounded-none p-8">
                <h3 className="font-display font-bold text-xs text-neutral-400 uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
                  Inventory
                  <span className={`text-[10px] ${quantityLeft > 0 ? 'text-brand-green-500' : 'text-neutral-400'}`}>
                    {quantityLeft > 0 ? 'IN STOCK' : 'N/A'}
                  </span>
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-4xl font-bold text-neutral-900 tracking-tighter">{quantityLeft}</p>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Items Available</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-neutral-300 tracking-tighter">{quantityTotal}</p>
                      <p className="text-[10px] text-neutral-300 font-bold uppercase tracking-widest">Batch Size</p>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-neutral-50 rounded-none overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-700 ${quantityLeft > 2 ? 'bg-brand-green-500' : 'bg-neutral-900'}`}
                      style={{ width: `${(quantityLeft / quantityTotal) * 100}%` }}
                    />
                  </div>
                </div>
              </section>

              {/* Pickup Window */}
              <section className="bg-white border border-neutral-200 rounded-none p-8">
                <h3 className="font-display font-bold text-xs text-neutral-400 uppercase tracking-[0.2em] mb-6">
                  Fulfillment Window
                </h3>
                <div className="p-4 border-2 border-neutral-100 rounded-none bg-neutral-50">
                  <div className="flex items-start gap-4">
                    <span className="text-xl mt-1">🕒</span>
                    <div>
                      <p className="text-sm font-bold text-neutral-900 uppercase">
                        {pickupSlots.length > 0 ? formatSlot(pickupSlots[0]) : "TBD"}
                      </p>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Single Pickup Window</p>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-neutral-400 mt-6 leading-relaxed">
                  * Fulfillment is only available during the specified window. Missed pickups are non-refundable.
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-neutral-200 z-50">
          <div className="max-w-screen-lg mx-auto flex items-center justify-between gap-8">
            <div className="hidden md:block">
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em] mb-1">Total Committed</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-neutral-900 tracking-tighter">₹{discountedPrice}</span>
                <span className="text-xs font-bold text-neutral-400 uppercase">INR</span>
              </div>
            </div>
            <button
              onClick={() => handleCartReserve()}
              disabled={ordering || isOutOfStock || isExpired}
              className={`h-16 px-12 rounded-none font-sans font-bold text-sm uppercase tracking-[0.2em]
                transition-all duration-200 active:scale-[0.98]
                ${isOutOfStock || isExpired
                  ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200"
                  : "bg-neutral-900 text-white hover:bg-black"
                }`}
            >
              {ordering ? (
                <span className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-none animate-spin" />
                  Processing Request
                </span>
              ) : isOutOfStock ? (
                "Inventory Depleted"
              ) : isExpired ? (
                "Window Closed"
              ) : (
                "Confirm Reservation"
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
