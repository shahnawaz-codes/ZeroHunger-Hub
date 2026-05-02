// components/RestaurantPartnerCTA.jsx
'use client';
import { useRouter } from 'next/navigation';

export function RestaurantPartnerCTA() {
  const router = useRouter();

  return (
    <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white">
      <div className="h-[3px] bg-[#4CAF50]" />
      <div className="p-6 flex gap-5">
        <div className="w-12 h-12 rounded-xl bg-[#EAF3DE] flex items-center justify-center flex-shrink-0 mt-0.5">
          {/* house icon */}
          <svg className="w-5 h-5 stroke-[#3B6D11]" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>

        <div className="flex-1">
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
              className="text-xl text-gray-900 leading-tight mb-2 tracking-tight">
            Turn unsold food into revenue
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            List surplus meals at a discount. Reach nearby customers before closing. 
            Zero waste, zero platform fees to start.
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {['Free to list', 'Set your own prices', 'Pickup-only', 'You control quantity'].map(t => (
              <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-md"
                style={{ background: '#EAF3DE', color: '#27500A', border: '0.5px solid #C0DD97' }}>
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/restaurant/register')}
              className="text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-85"
              style={{ background: '#FF9800', color: '#412402' }}>
              List my restaurant
            </button>
            <button className="text-sm font-medium px-3.5 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              See how it works
            </button>
          </div>

          <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
            Takes 2 minutes. Your account upgrades instantly — no admin approval to list food.
          </p>
        </div>
      </div>

      <div className="flex border-t border-gray-100 bg-gray-50/60">
        {[['340+ kg', 'saved this week'], ['₹180', 'avg order value'], ['4.8 min', 'avg pickup time']].map(([n, l]) => (
          <div key={l} className="flex-1 text-center py-3">
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#3B6D11', fontSize: 17 }}>{n}</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}