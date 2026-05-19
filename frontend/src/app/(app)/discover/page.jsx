// src/app/(app)/discover/page.jsx
"use client";

import { useState, useMemo } from "react";
import { BagCard } from "@/components/bag/BagCard";
import useNearbyBags from "@/hooks/bag/useNearbyBags";
import useLocation from "@/hooks/location/useLocation";
import { PageLoader } from "@/components/ui";

/* ── tiny inline icons ───────────────────────────────── */
function SearchIcon({ className = "" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function FilterIcon({ className = "" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      className={className} aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  );
}
function MapPinIcon({ className = "" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      className={className} aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function SortIcon({ className = "" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      className={className} aria-hidden="true">
      <path d="M11 5h10" /><path d="M11 9h7" /><path d="M11 13h4" />
      <path d="m3 17 4 4 4-4" /><path d="M7 3v18" />
    </svg>
  );
}

/* ── categories ──────────────────────────────────────── */
const CATEGORIES = [
  { key: "all", label: "All", emoji: "✨" },
  { key: "meals", label: "Meals", emoji: "🍱" },
  { key: "bakery", label: "Bakery", emoji: "🥐" },
  { key: "grocery", label: "Grocery", emoji: "🥬" },
  { key: "dessert", label: "Dessert", emoji: "🍰" },
  { key: "drinks", label: "Drinks", emoji: "🥤" },
  { key: "other", label: "Other", emoji: "🍽️" },
];

const SORT_OPTIONS = [
  { key: "expiry", label: "Expiring soon" },
  { key: "price_low", label: "Price: Low → High" },
  { key: "price_high", label: "Price: High → Low" },
  { key: "discount", label: "Best deal" },
];

/* ── page ────────────────────────────────────────────── */

export default function DiscoverPage() {
  const { location, isLoading: locationLoading, error: locationError } = useLocation();

  const {
    data: bags = [],
    isLoading,
    isError,
  } = useNearbyBags({
    lat: location?.lat,
    lng: location?.lng,
    radius: 5, // km
  });

  /* — local filters & search — */
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("expiry");
  const [showSortMenu, setShowSortMenu] = useState(false);

  /* — processed bag list — */
  const processedBags = useMemo(() => {
    let list = [...bags];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.name?.toLowerCase().includes(q) ||
          b.description?.toLowerCase().includes(q) ||
          b.restaurant?.name?.toLowerCase().includes(q) ||
          b.restaurant?.cuisine?.toLowerCase().includes(q) ||
          b.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }

    // Category filter
    if (activeCategory !== "all") {
      list = list.filter((b) => b.category === activeCategory);
    }

    // Sorting
    list.sort((a, b) => {
      switch (sortBy) {
        case "price_low":
          return (a.pricing?.discounted ?? a.pricing?.original ?? 0) -
            (b.pricing?.discounted ?? b.pricing?.original ?? 0);
        case "price_high":
          return (b.pricing?.discounted ?? b.pricing?.original ?? 0) -
            (a.pricing?.discounted ?? a.pricing?.original ?? 0);
        case "discount": {
          const discA = a.pricing?.original
            ? ((a.pricing.original - (a.pricing.discounted || 0)) / a.pricing.original)
            : 0;
          const discB = b.pricing?.original
            ? ((b.pricing.original - (b.pricing.discounted || 0)) / b.pricing.original)
            : 0;
          return discB - discA;
        }
        case "expiry":
        default:
          return new Date(a.expiryTime || "9999") - new Date(b.expiryTime || "9999");
      }
    });

    return list;
  }, [bags, search, activeCategory, sortBy]);

  /* ── loading states ─────────────────────────────────── */
  if (locationLoading || isLoading) return <PageLoader />;

  /* ── main render ────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-surface-page">
      {/* ── HERO HEADER ──────────────────────────────── */}
      <section className="relative bg-brand-green-500 overflow-hidden">
        {/* decorative shapes */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-green-600/30 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-brand-green-200/10 blur-2xl" />

        <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-8 md:pt-14 md:pb-10">
          <div className="flex items-center gap-2 text-brand-green-100/60 text-xs font-semibold mb-3 tracking-wide">
            <MapPinIcon />
            {locationError
              ? "Using default location (Surat)"
              : "Showing bags near you"}
          </div>

          <h1 className="font-display font-black text-white text-3xl md:text-4xl leading-tight mb-2">
            Discover Surprise Bags
          </h1>
          <p className="text-brand-green-100/70 text-sm md:text-base max-w-lg mb-6">
            Rescue delicious food from restaurants nearby — save money and
            reduce waste at the same time.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              id="discover-search"
              type="text"
              placeholder="Search bags, restaurants, cuisine…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/95 backdrop-blur text-sm text-neutral-900 placeholder:text-neutral-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-green-200 transition-all"
            />
          </div>
        </div>
      </section>

      {/* ── FILTERS BAR ──────────────────────────────── */}
      <div className="sticky top-[60px] z-30 bg-white/80 backdrop-blur-xl border-b border-neutral-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          {/* Category pills — scrollable */}
          <div className="flex-1 overflow-x-auto hide-scrollbar">
            <div className="flex gap-1.5 min-w-max">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  id={`filter-${cat.key}`}
                  onClick={() => setActiveCategory(cat.key)}
                  className={[
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all",
                    activeCategory === cat.key
                      ? "bg-brand-green-500 text-white shadow-md shadow-brand-green-500/20"
                      : "bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-brand-green-200 hover:text-brand-green-500",
                  ].join(" ")}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort dropdown */}
          <div className="relative shrink-0">
            <button
              id="sort-toggle"
              onClick={() => setShowSortMenu((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-brand-green-200 hover:text-brand-green-500 transition-all"
            >
              <SortIcon />
              <span className="hidden sm:inline">
                {SORT_OPTIONS.find((s) => s.key === sortBy)?.label}
              </span>
              <span className="sm:hidden">Sort</span>
            </button>

            {showSortMenu && (
              <>
                {/* backdrop to close */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowSortMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-neutral-200 shadow-xl z-50 py-1 animate-in fade-in slide-in-from-top-2">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      id={`sort-${opt.key}`}
                      onClick={() => { setSortBy(opt.key); setShowSortMenu(false); }}
                      className={[
                        "w-full text-left px-3.5 py-2 text-xs font-semibold transition-colors",
                        sortBy === opt.key
                          ? "bg-brand-green-50 text-brand-green-700"
                          : "text-neutral-600 hover:bg-neutral-50",
                      ].join(" ")}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── BAG GRID ─────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 py-6 pb-20 md:pb-10">
        {/* Result count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-neutral-500">
            {processedBags.length}{" "}
            {processedBags.length === 1 ? "bag" : "bags"} found
            {search.trim() ? ` for "${search}"` : ""}
          </p>
        </div>

        {/* Error state */}
        {isError && (
          <div className="text-center py-16 bg-white rounded-2xl border border-feedback-error/20">
            <p className="text-4xl mb-3">⚠️</p>
            <p className="font-display font-bold text-neutral-700 mb-1">
              Something went wrong
            </p>
            <p className="text-sm text-neutral-500">
              We couldn't load bags. Please try again later.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!isError && processedBags.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200">
            <p className="text-5xl mb-4">🔍</p>
            <p className="font-display font-bold text-neutral-700 text-lg mb-1">
              No bags found
            </p>
            <p className="text-sm text-neutral-500 max-w-xs mx-auto mb-5">
              {search.trim()
                ? `No results for "${search}". Try different keywords.`
                : activeCategory !== "all"
                  ? "No bags available in this category. Try another one!"
                  : "No bags available near you right now. Check back soon!"}
            </p>
            {(search.trim() || activeCategory !== "all") && (
              <button
                onClick={() => { setSearch(""); setActiveCategory("all"); }}
                className="px-4 py-2 rounded-lg bg-brand-green-500 text-white text-xs font-bold hover:bg-brand-green-600 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {!isError && processedBags.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedBags.map((bag) => (
              <BagCard key={bag._id} bag={bag} />
            ))}
          </div>
        )}
      </main>

      {/* ── inline styles for hiding scrollbar ────────── */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
