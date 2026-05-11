"use client";
import { useState } from "react";
import { bagCard } from "@/components/bag/bagCard";
import { bag_LISTINGS, CATEGORIES } from "@/lib/dummy-data";
import usebags from "@/hooks/bag/usebags";

export default function DiscoverPage() {
  const { data: results = [], isLoading, isError, error } = usebags();

  return (
    <div className="min-h-screen bg-cream">
      <main className="max-w-6xl mx-auto px-4 pb-24 md:pb-8 pt-5">
        {/* Search bar */}
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search bag, restaurants..."
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            <span className="font-bold text-gray-900">
              {results.length || 5}
            </span>
            results
            {/* {query && <span className="text-gray-400"> for "{query}"</span>} */}
          </p>
        </div>

        <div className="flex gap-5">
          {/* Results */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <p className="text-2xl animate-spin">⏳</p>
                <p className="font-display font-bold text-gray-700 text-lg mt-3">
                  Loading bags...
                </p>
              </div>
            ) : isError ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <p className="text-4xl mb-3">⚠️</p>
                <p className="font-display font-bold text-gray-700 text-lg">
                  Error loading bags
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  {error?.message || "Something went wrong"}
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-display font-bold text-gray-700 text-lg">
                  No results found
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {results.map((bag) => (
                  <bagCard key={bag._id} bag={bag} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
