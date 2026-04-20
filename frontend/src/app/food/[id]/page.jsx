'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FOOD_LISTINGS } from '@/lib/dummy-data';
import toast from 'react-hot-toast';

function getUrgency(minutes) {
  if (minutes <= 30) return { color: 'text-red-500 bg-red-50', bar: 'bg-red-500', label: `${minutes}m left — Order now!` };
  if (minutes <= 60) return { color: 'text-amber-600 bg-amber-50', bar: 'bg-amber-500', label: `${minutes}m left — Going fast` };
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return { color: 'text-emerald-600 bg-emerald-50', bar: 'bg-emerald-500', label: m > 0 ? `${h}h ${m}m left` : `${h}h left` };
}

export default function FoodDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const food = FOOD_LISTINGS.find(f => f.id === id);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [ordering, setOrdering] = useState(false);

  if (!food) {
    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <div className="flex-1 flex items-center justify-center text-center p-8">
          <div>
            <p className="text-5xl mb-3">😕</p>
            <p className="font-display font-bold text-xl text-gray-700">Listing not found</p>
            <Link href="/" className="mt-4 inline-block text-primary-500 font-semibold">← Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const urgency = getUrgency(food.expiresInMinutes);
  const discount = Math.round((1 - food.discountedPrice / food.originalPrice) * 100);

  const handleReserve = async () => {
    if (!selectedSlot) {
      toast.error('Please select a pickup slot first');
      return;
    }
    setOrdering(true);
    await new Promise(r => setTimeout(r, 1200));
    toast.success('🎉 Order reserved! Check your orders.');
    router.push('/orders');
  };

  return (
    <div className="min-h-screen bg-cream">
      <main className="max-w-2xl mx-auto pb-32 md:pb-10">
        {/* Hero image */}
        <div className="relative">
          <img src={food.image} alt={food.name} className="w-full h-72 md:h-96 object-cover md:rounded-b-3xl" />

          {/* Urgency ribbon */}
          <div className={`absolute bottom-4 left-4 right-4 ${urgency.color} rounded-2xl px-4 py-3 flex items-center gap-3`}>
            <div className={`w-2 h-2 rounded-full ${urgency.bar} animate-pulse shrink-0`} />
            <p className="font-bold text-sm">{urgency.label}</p>
            <span className={`ml-auto font-black text-lg bg-${discount >= 60 ? 'primary-500' : 'gray-800'} text-white px-3 py-1 rounded-full text-sm`}>
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
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-black shrink-0">
              {food.restaurantName[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700">{food.restaurantName}</p>
              <p className="text-xs text-gray-400">📍 {food.address} · {food.distance} km away</p>
            </div>
            <div className="ml-auto flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
              <span>⭐</span>
              <span className="text-sm font-bold">{food.rating}</span>
              <span className="text-xs text-amber-500">({food.reviews})</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display font-black text-2xl text-gray-900 mb-2 leading-tight">{food.name}</h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {food.tags.map(tag => (
              <span key={tag} className={`tag-pill text-xs ${tag === 'Veg' || tag === 'Vegan' ? 'bg-green-50 text-green-700' : tag === 'Healthy' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'}`}>
                {tag}
              </span>
            ))}
            <span className="tag-pill bg-blue-50 text-blue-700">🌍 Saves {food.co2Saved}kg CO₂</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-5">{food.description}</p>

          {/* Price block */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-5 shadow-sm">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-3xl font-black text-gray-900">₹{food.discountedPrice}</span>
              <div>
                <span className="text-sm text-gray-400 line-through block">₹{food.originalPrice}</span>
                <span className="text-xs font-bold text-emerald-600">You save ₹{food.originalPrice - food.discountedPrice}</span>
              </div>
              <span className="ml-auto bg-primary-500 text-white font-black text-lg px-3 py-1.5 rounded-xl">-{discount}%</span>
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-gray-100 mt-2">
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${food.quantityLeft > 3 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span className="text-xs font-semibold text-gray-600">
                  {food.quantityLeft <= 0 ? 'Sold out' : food.quantityLeft <= 2 ? `Last ${food.quantityLeft}!` : `${food.quantityLeft} of ${food.quantity} left`}
                </span>
              </div>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs font-semibold text-gray-600">🥡 Pickup only</span>
            </div>
          </div>

          {/* Pickup slot selector */}
          <div className="mb-5">
            <h3 className="font-display font-bold text-base text-gray-900 mb-2.5">Choose Pickup Slot</h3>
            <div className="grid grid-cols-1 gap-2">
              {food.pickupSlots.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`w-full p-3.5 rounded-xl border-2 text-sm font-semibold text-left transition-all flex items-center justify-between ${
                    selectedSlot === slot
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>🕐 {slot}</span>
                  {selectedSlot === slot && <span className="text-primary-500 font-black text-lg">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-gray-100 rounded-2xl h-40 flex items-center justify-center mb-5 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-200 opacity-60" />
            <div className="relative text-center">
              <p className="text-2xl mb-1">📍</p>
              <p className="text-sm font-bold text-gray-700">{food.address}</p>
              <p className="text-xs text-gray-500">{food.distance} km from you</p>
            </div>
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 md:static md:px-4 px-4 pb-3 md:pb-6 bg-cream/95 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none pt-2">
          <button
            onClick={handleReserve}
            disabled={ordering || food.quantityLeft === 0}
            className={`w-full py-4 rounded-2xl font-display font-black text-base flex items-center justify-center gap-2 transition-all ${
              food.quantityLeft === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/30 active:scale-[0.98]'
            }`}
          >
            {ordering ? (
              <><span className="animate-spin">⏳</span> Reserving...</>
            ) : food.quantityLeft === 0 ? (
              'Sold Out'
            ) : (
              <>Reserve for ₹{food.discountedPrice} {selectedSlot ? `· ${selectedSlot}` : ''}</>
            )}
          </button>
          {!selectedSlot && food.quantityLeft > 0 && (
            <p className="text-center text-xs text-gray-400 mt-1.5">Select a slot to continue</p>
          )}
        </div>
      </main>
    </div>
  );
}
