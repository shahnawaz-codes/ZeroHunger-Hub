'use client';
import Link from 'next/link';

function getUrgency(minutes) {
  if (minutes <= 30) return { color: 'bg-red-500', text: `${minutes}m left` };
  if (minutes <= 60) return { color: 'bg-amber-500', text: `${minutes}m left` };
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return { color: 'bg-emerald-600', text: m > 0 ? `${h}h ${m}m` : `${h}h left` };
}

export function FoodCard({ food, compact = false }) {
  const urgency = getUrgency(food.expiresInMinutes);
  const discount = Math.round((1 - food.discountedPrice / food.originalPrice) * 100);

  return (
    <Link href={`/food/${food.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-gray-100">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={food.image}
            alt={food.name}
            className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${compact ? 'h-36' : 'h-44'}`}
          />
          {/* Time badge */}
          <span className={`absolute top-2.5 left-2.5 ${urgency.color} text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1`}>
            ⏱ {urgency.text}
          </span>
          {/* Discount badge */}
          <span className="absolute top-2.5 right-2.5 bg-black/80 text-white text-xs font-black px-2 py-1 rounded-full">
            -{discount}%
          </span>
          {/* Low stock */}
          {food.quantityLeft <= 2 && (
            <span className="absolute bottom-2.5 left-2.5 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
              Only {food.quantityLeft} left!
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-xs text-gray-500 font-medium truncate max-w-[70%]">{food.restaurantName}</span>
            <span className="text-xs text-gray-400 font-medium">{food.distance} km</span>
          </div>
          <h3 className={`font-display font-bold text-gray-900 leading-tight mb-2 ${compact ? 'text-sm' : 'text-base'}`}>
            {food.name}
          </h3>

          {/* Tags */}
          {!compact && (
            <div className="flex flex-wrap gap-1 mb-2.5">
              {food.tags.slice(0, 2).map(tag => (
                <span key={tag} className={`tag-pill ${tag === 'Veg' || tag === 'Vegan' || tag === 'Healthy' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                  {tag === 'Veg' ? '🟢' : tag === 'Vegan' ? '🌱' : '🔴'} {tag}
                </span>
              ))}
              <span className="tag-pill bg-gray-50 text-gray-600">
                ⭐ {food.rating}
              </span>
            </div>
          )}

          {/* Price row */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-gray-900">₹{food.discountedPrice}</span>
            <span className="text-sm text-gray-400 line-through">₹{food.originalPrice}</span>
            <span className="ml-auto text-xs font-semibold text-emerald-600">Save ₹{food.originalPrice - food.discountedPrice}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
