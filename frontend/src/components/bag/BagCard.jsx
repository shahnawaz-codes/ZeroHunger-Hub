"use client";

import { useMemo } from "react";
import Link from "next/link";

/* ── tiny SVG icons (no dependency needed) ───────────── */
function ClockIcon({ className = "" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function MapPinIcon({ className = "" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      className={className} aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function TagIcon({ className = "" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      className={className} aria-hidden="true">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}
function ShoppingBagIcon({ className = "" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      className={className} aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
function FireIcon({ className = "" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      className={className} aria-hidden="true">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

/* ── helpers ──────────────────────────────────────────── */

/** Returns a human-readable countdown string and urgency level */
function getExpiryInfo(expiryTime) {
  if (!expiryTime) return { text: "No expiry set", urgency: "normal" };

  const now = new Date();
  const expiry = new Date(expiryTime);
  const diffMs = expiry - now;

  if (diffMs <= 0) return { text: "Expired", urgency: "expired" };

  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMin / 60);
  const remainMin = diffMin % 60;

  if (diffHrs >= 24) {
    const days = Math.floor(diffHrs / 24);
    return { text: `${days}d ${diffHrs % 24}h left`, urgency: "normal" };
  }
  if (diffHrs >= 3) {
    return { text: `${diffHrs}h ${remainMin}m left`, urgency: "normal" };
  }
  if (diffHrs >= 1) {
    return { text: `${diffHrs}h ${remainMin}m left`, urgency: "warning" };
  }
  return { text: `${diffMin}m left`, urgency: "critical" };
}

/** Format pickup window to a readable slot */
function formatPickupSlot(pickupWindow) {
  if (!pickupWindow?.start || !pickupWindow?.end) return null;

  const fmt = (d) =>
    new Date(d).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return `${fmt(pickupWindow.start)} – ${fmt(pickupWindow.end)}`;
}

/** Calculate discount percentage */
function getDiscountPercent(original, discounted) {
  if (!original || original === 0) return 0;
  return Math.round(((original - (discounted || 0)) / original) * 100);
}

/* category → emoji lookup */
const CATEGORY_EMOJI = {
  bakery: "🥐",
  meals: "🍱",
  grocery: "🥬",
  drinks: "🥤",
  dessert: "🍰",
  other: "🍽️",
};

/* urgency colour map */
const URGENCY_STYLES = {
  normal: "bg-brand-green-50 text-brand-green-700",
  warning: "bg-feedback-warning/10 text-feedback-warning",
  critical: "bg-feedback-error/10 text-feedback-error animate-pulse",
  expired: "bg-neutral-100 text-neutral-400",
};

/* ── COMPONENT ───────────────────────────────────────── */

export function BagCard({ bag, distance }) {
  const {
    _id,
    name,
    description,
    category = "other",
    pricing = {},
    quantity = {},
    pickupWindow,
    expiryTime,
    tags = [],
    image,
    status,
    restaurant,
  } = bag;

  const expiry = useMemo(() => getExpiryInfo(expiryTime), [expiryTime]);
  const pickupSlot = useMemo(() => formatPickupSlot(pickupWindow), [pickupWindow]);
  const discount = useMemo(
    () => getDiscountPercent(pricing.original, pricing.discounted),
    [pricing.original, pricing.discounted],
  );

  const isSoldOut = status === "sold_out" || quantity.left === 0;
  const isExpired = status === "expired" || expiry.urgency === "expired";
  const isUnavailable = isSoldOut || isExpired;

  const emoji = CATEGORY_EMOJI[category] || CATEGORY_EMOJI.other;
  const cuisineName = restaurant?.cuisine;

  return (
    <Link
      href={`/discover/${_id}`}
      id={`bag-card-${_id}`}
      className={[
        "group relative flex flex-col bg-white rounded-2xl overflow-hidden",
        "shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1",
        isUnavailable
          ? "border border-neutral-200 opacity-60 pointer-events-none"
          : "border border-neutral-200/60 hover:border-brand-green-200",
      ].join(" ")}
    >
      {/* ── IMAGE ─────────────────────────────────────── */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-brand-green-50 via-neutral-50 to-neutral-100">
            {emoji}
          </div>
        )}

        {/* gradient overlay at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />

        {/* Discount badge — top left */}
        {discount > 0 && !isUnavailable && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-feedback-error text-white text-xs font-black shadow-lg shadow-feedback-error/30">
              <FireIcon className="text-white" />
              −{discount}% OFF
            </span>
          </div>
        )}

        {/* Quantity left — top right */}
        {!isUnavailable && quantity.left != null && (
          <span className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-dark/80 backdrop-blur-md text-white text-xs font-bold shadow-lg">
            <ShoppingBagIcon className="text-white/90" />
            {quantity.left} left
          </span>
        )}

        {/* Sold-out / Expired overlay */}
        {isUnavailable && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-6 py-2.5 rounded-full bg-white text-neutral-900 font-black text-base shadow-xl">
              {isSoldOut ? "Sold Out" : "Expired"}
            </span>
          </div>
        )}

        {/* Restaurant name on image — bottom */}
        {restaurant?.name && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-black text-brand-green-500 shrink-0 shadow-lg ring-2 ring-white/30">
              {restaurant.name[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold truncate drop-shadow-lg">
                {restaurant.name}
              </p>
              {cuisineName && (
                <p className="text-white/70 text-xs font-medium truncate drop-shadow-md">
                  {cuisineName}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── BODY ──────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title */}
        <h3 className="font-display font-black text-neutral-900 text-base md:text-lg leading-snug line-clamp-2">
          {name}
        </h3>

        {/* Description (if available) */}
        {description && (
          <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 -mt-1">
            {description}
          </p>
        )}

        {/* Category + Tags row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-green-50 text-brand-green-700 text-xs font-bold border border-brand-green-100">
            {emoji} {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 font-medium"
            >
              {tag}
            </span>
          ))}
          {tags.length > 2 && (
            <span className="text-xs text-neutral-400 font-semibold">
              +{tags.length - 2}
            </span>
          )}
        </div>

        {/* Info chips row — Expiry + Distance + Pickup */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {/* Expiry countdown */}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${URGENCY_STYLES[expiry.urgency]}`}>
            <ClockIcon className="shrink-0" />
            {expiry.text}
          </div>

          {/* Distance */}
          {distance != null && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-50 text-neutral-600 text-xs font-bold border border-neutral-200">
              <MapPinIcon className="text-brand-green-200 shrink-0" />
              {distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)} km`}
            </div>
          )}

          {/* Pickup slot */}
          {pickupSlot && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-50 text-neutral-600 text-xs font-bold border border-neutral-200">
              <ClockIcon className="text-neutral-400 shrink-0" />
              {pickupSlot}
            </div>
          )}
        </div>

        {/* Spacer pushes price to bottom */}
        <div className="flex-1" />

        {/* Price row */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100 mt-1">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-2xl text-neutral-900">
              ₹{pricing.discounted ?? pricing.original ?? 0}
            </span>
            {discount > 0 && (
              <span className="text-sm text-neutral-400 line-through font-semibold">
                ₹{pricing.original}
              </span>
            )}
            {discount > 0 && (
              <span className="text-xs text-feedback-success font-bold">
                Save ₹{pricing.original - (pricing.discounted || 0)}
              </span>
            )}
          </div>

          {!isUnavailable && (
            <span className="px-4 py-2 rounded-xl bg-brand-green-500 text-white text-sm font-black transition-all duration-200 group-hover:bg-brand-green-600 group-hover:shadow-lg group-hover:shadow-brand-green-500/25 group-hover:scale-105">
              Grab it →
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
