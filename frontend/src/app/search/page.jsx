'use client';
import { useState } from 'react';
import { FoodCard } from '@/components/FoodCard';
import { FOOD_LISTINGS, CATEGORIES } from '@/lib/dummy-data';

/**
 * Render a searchable, filterable food listings page with client-side query and filter controls.
 *
 * Renders a search input, a toggleable filter panel (cuisine toggles, max price/distance/time sliders),
 * and a results area that displays matching FOOD_LISTINGS or an empty-state. Manages local state for
 * the text query, selected cuisines, maxPrice (default 500), maxDistance (default 10), maxTimeLeft (default 180),
 * and filter panel visibility; exposes cuisine toggling and a clear-filters action.
 *
 * @returns {JSX.Element} The search page UI.
 */
export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [maxPrice, setMaxPrice] = useState(500);
  const [maxDistance, setMaxDistance] = useState(10);
  const [maxTimeLeft, setMaxTimeLeft] = useState(180);
  const [showFilters, setShowFilters] = useState(false);

  const toggleCuisine = (c) =>
    setSelectedCuisines(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const cuisines = [...new Set(FOOD_LISTINGS.map(f => f.cuisine))];

  const results = FOOD_LISTINGS.filter(f => {
    const matchesQuery = !query || f.name.toLowerCase().includes(query.toLowerCase()) || f.restaurantName.toLowerCase().includes(query.toLowerCase());
    const matchesCuisine = selectedCuisines.length === 0 || selectedCuisines.includes(f.cuisine);
    const matchesPrice = f.discountedPrice <= maxPrice;
    const matchesDistance = f.distance <= maxDistance;
    const matchesTime = f.expiresInMinutes <= maxTimeLeft;
    return matchesQuery && matchesCuisine && matchesPrice && matchesDistance && matchesTime;
  });

  const activeFiltersCount = selectedCuisines.length + (maxPrice < 500 ? 1 : 0) + (maxDistance < 10 ? 1 : 0) + (maxTimeLeft < 180 ? 1 : 0);

  const clearFilters = () => {
    setSelectedCuisines([]);
    setMaxPrice(500);
    setMaxDistance(10);
    setMaxTimeLeft(180);
  };

  return (
    <div className="min-h-screen bg-cream">

      <main className="max-w-6xl mx-auto px-4 pb-24 md:pb-8 pt-5">
        {/* Search bar */}
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search food, restaurants..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            <span className="font-bold text-gray-900">{results.length}</span> results
            {query && <span className="text-gray-400"> for "{query}"</span>}
          </p>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-all ${
              showFilters || activeFiltersCount > 0
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            <span>⚙️</span>
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-primary-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-5">
          {/* Filter Panel */}
          {showFilters && (
            <div className="w-64 shrink-0 animate-slide-up">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-gray-900">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <button onClick={clearFilters} className="text-xs text-primary-500 font-bold hover:underline">
                      Clear all
                    </button>
                  )}
                </div>

                {/* Cuisine */}
                <div className="mb-5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Cuisine</label>
                  <div className="flex flex-wrap gap-1.5">
                    {cuisines.map(c => {
                      const cat = CATEGORIES.find(x => x.id === c);
                      return (
                        <button
                          key={c}
                          onClick={() => toggleCuisine(c)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                            selectedCuisines.includes(c)
                              ? 'bg-primary-500 text-white border-primary-500'
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary-300'
                          }`}
                        >
                          {cat?.emoji} {c}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                    Max Price: <span className="text-gray-900">₹{maxPrice}</span>
                  </label>
                  <input type="range" min={50} max={500} step={25} value={maxPrice}
                    onChange={e => setMaxPrice(+e.target.value)}
                    className="w-full accent-primary-500 cursor-pointer" />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>₹50</span><span>₹500</span>
                  </div>
                </div>

                {/* Distance */}
                <div className="mb-5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                    Distance: <span className="text-gray-900">{maxDistance} km</span>
                  </label>
                  <input type="range" min={0.5} max={10} step={0.5} value={maxDistance}
                    onChange={e => setMaxDistance(+e.target.value)}
                    className="w-full accent-primary-500 cursor-pointer" />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>0.5 km</span><span>10 km</span>
                  </div>
                </div>

                {/* Time left */}
                <div className="mb-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                    Time left: <span className="text-gray-900">
                      {maxTimeLeft >= 180 ? 'Any' : maxTimeLeft < 60 ? `${maxTimeLeft}m` : `${Math.floor(maxTimeLeft / 60)}h`}
                    </span>
                  </label>
                  <input type="range" min={30} max={180} step={15} value={maxTimeLeft}
                    onChange={e => setMaxTimeLeft(+e.target.value)}
                    className="w-full accent-primary-500 cursor-pointer" />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>30m</span><span>3h+</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            {results.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-display font-bold text-gray-700 text-lg">No results found</p>
                <p className="text-gray-400 text-sm mt-1">Try different filters or check back later</p>
                <button onClick={clearFilters} className="mt-4 text-sm font-bold text-primary-500 hover:underline">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {results.map(food => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
