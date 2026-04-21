'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { RESTAURANT_STATS, RESTAURANT_LISTINGS, RESTAURANT_ORDERS } from '@/lib/dummy-data';

const ORDER_STATUS = {
  ready_for_pickup: { label: 'Ready', color: 'bg-emerald-100 text-emerald-700' },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Done', color: 'bg-gray-100 text-gray-600' },
};

/**
 * Render a compact metric card with an emoji, a prominent value (optionally with a unit), and a descriptive label.
 * @param {{emoji: string, value: string|number, unit?: string, label: string, accent?: boolean}} props
 * @param {string} props.emoji - A single-character or emoji string shown prominently at the top-left.
 * @param {string|number} props.value - The main metric value to display.
 * @param {string} [props.unit] - Optional unit text displayed alongside the value (e.g., "kg", "%", "k").
 * @param {string} props.label - A short descriptive label shown below the value.
 * @param {boolean} [props.accent=false] - When true, use the accent (primary) styling variant; otherwise use the default white/bordered variant.
 * @returns {JSX.Element} A styled JSX element representing the stat card.
 */
function StatCard({ emoji, value, unit, label, accent = false }) {
  return (
    <div className={`rounded-2xl p-4 ${accent ? 'bg-primary-500' : 'bg-white border border-gray-100'} shadow-sm`}>
      <p className="text-2xl mb-1">{emoji}</p>
      <p className={`font-display font-black text-2xl leading-none ${accent ? 'text-white' : 'text-gray-900'}`}>
        {value}<span className={`text-sm font-bold ml-0.5 ${accent ? 'text-primary-200' : 'text-gray-500'}`}>{unit}</span>
      </p>
      <p className={`text-xs font-medium mt-1 ${accent ? 'text-primary-100' : 'text-gray-400'}`}>{label}</p>
    </div>
  );
}

/**
 * Renders the "Overview" tab showing today's, this week's, and all-time impact metrics for the restaurant.
 * @param {Object} props
 * @param {Object} props.stats - Aggregated impact statistics.
 * @param {number} props.stats.todayMealsSaved - Meals saved today.
 * @param {number} props.stats.todayEarnings - Earnings for today (number, will be formatted for display).
 * @param {number} props.stats.todayCO2Saved - Kilograms of CO₂ saved today.
 * @param {number} props.stats.weeklyMealsSaved - Meals saved this week.
 * @param {number} props.stats.weeklyEarnings - Earnings for the week (number, displayed as formatted k‑value).
 * @param {number} props.stats.weeklyCO2Saved - Kilograms of CO₂ prevented this week.
 * @param {number} props.stats.totalMealsSaved - Total meals rescued (all time).
 * @param {number} props.stats.totalCO2Saved - Total kilograms of CO₂ never emitted (all time).
 * @returns {JSX.Element} The Overview tab UI with stat cards and an all-time impact summary.
 */
function OverviewTab({ stats }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Today</p>
        <div className="grid grid-cols-3 gap-3">
          <StatCard emoji="🍱" value={stats.todayMealsSaved} unit="" label="Meals saved" accent />
          <StatCard emoji="₹" value={stats.todayEarnings.toLocaleString()} unit="" label="Earned today" />
          <StatCard emoji="🌍" value={stats.todayCO2Saved} unit="kg" label="CO₂ saved" />
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">This Week</p>
        <div className="grid grid-cols-3 gap-3">
          <StatCard emoji="📦" value={stats.weeklyMealsSaved} unit="" label="Meals saved" />
          <StatCard emoji="💰" value={`₹${(stats.weeklyEarnings / 1000).toFixed(1)}k`} unit="" label="Weekly earnings" />
          <StatCard emoji="♻️" value={stats.weeklyCO2Saved} unit="kg" label="CO₂ prevented" />
        </div>
      </div>
      <div className="bg-[#111] rounded-2xl p-5 text-center">
        <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">All Time Impact</p>
        <p className="font-display font-black text-3xl text-white mb-0.5">
          {stats.totalMealsSaved.toLocaleString()} <span className="text-primary-500">meals</span> rescued
        </p>
        <p className="text-white/50 text-sm">{stats.totalCO2Saved.toLocaleString()}kg CO₂ never emitted 🌱</p>
      </div>
    </div>
  );
}

/**
 * Render the Listings tab showing current food listings and controls to add, edit, or remove items.
 *
 * @param {Object[]} listings - Array of listing objects to display.
 *   Each listing is expected to include: `id`, `name`, `image`, `status` ('active' or other),
 *   `pickupSlot`, `discountedPrice`, `originalPrice`, `quantityLeft`, `totalQuantity`, and `ordersReceived`.
 * @param {Function} onAdd - Callback invoked when the "+ Add New" button is clicked.
 * @return {JSX.Element} The rendered Listings tab element.
 */
function ListingsTab({ listings, onAdd }) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <p className="font-display font-bold text-gray-900">{listings.length} Listings</p>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 bg-primary-500 text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-primary-600 transition-colors shadow-sm"
        >
          + Add New
        </button>
      </div>
      <div className="space-y-3">
        {listings.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex gap-3 p-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display font-bold text-gray-900 text-sm leading-tight">{item.name}</p>
                  <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status === 'active' ? '● Live' : '✕ Sold Out'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">🕐 {item.pickupSlot}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-black text-gray-900 text-base">₹{item.discountedPrice}</span>
                  <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 px-4 py-2.5 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3 text-xs font-semibold text-gray-500">
                <span>📦 {item.quantityLeft}/{item.totalQuantity} left</span>
                <span>·</span>
                <span>🛍️ {item.ordersReceived} orders</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toast.success('Edit mode')} className="text-xs font-bold text-gray-500 hover:text-gray-700 px-2 py-1 hover:bg-gray-200 rounded-lg transition-colors">
                  Edit
                </button>
                <button onClick={() => toast.error('Listing removed')} className="text-xs font-bold text-red-400 hover:text-red-600 px-2 py-1 hover:bg-red-50 rounded-lg transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Render a filterable list of restaurant orders with status badges and basic order details.
 *
 * @param {Object[]} orders - Array of order objects to display. Each order should include:
 *   - id: unique identifier
 *   - customerName: customer's full name
 *   - status: one of the order status keys (e.g., 'confirmed', 'ready_for_pickup', 'completed')
 *   - foodName: name of the ordered item
 *   - pickupSlot: scheduled pickup time/slot
 *   - orderId: merchant-visible order identifier
 *   - price: numeric or string price to display
 *   - orderTime: formatted time string for the order
 * @returns {JSX.Element} The Orders tab UI containing filter buttons and a list of order cards.
 */
function OrdersTab({ orders }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="animate-fade-in">
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
        {['all', 'confirmed', 'ready_for_pickup', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
              filter === f ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {f === 'all' ? 'All' : f === 'ready_for_pickup' ? 'Ready' : f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'all' && <span className="ml-1 text-[10px] bg-primary-500 text-white px-1.5 py-0.5 rounded-full">{orders.length}</span>}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(order => {
          const s = ORDER_STATUS[order.status] || ORDER_STATUS.confirmed;
          return (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-black text-gray-700 shrink-0">
                {order.customerName.split(' ')[0][0]}{order.customerName.split(' ')[1]?.[0] || ''}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-bold text-gray-900 text-sm">{order.customerName}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.color}`}>{s.label}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{order.foodName}</p>
                <p className="text-xs text-gray-400">🕐 {order.pickupSlot} · {order.orderId}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-black text-gray-900">₹{order.price}</p>
                <p className="text-[10px] text-gray-400">{order.orderTime}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Renders the "Add Food" tab: a form to create and publish a new food listing.
 *
 * Validates required fields and that the discounted price is lower than the original,
 * displays toast feedback for errors and success, simulates a short publish delay,
 * and invokes the provided callback after a successful publish.
 *
 * @param {{ onSuccess: function }} props - Component props.
 * @param {function} props.onSuccess - Callback called once the listing is successfully published.
 * @returns {JSX.Element} The Add Food tab form UI.
 */
function AddFoodTab({ onSuccess }) {
  const [form, setForm] = useState({
    name: '', category: 'Indian', description: '',
    originalPrice: '', discountedPrice: '', quantity: '',
    pickupStart: '', pickupEnd: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const discount = form.originalPrice && form.discountedPrice
    ? Math.round((1 - form.discountedPrice / form.originalPrice) * 100)
    : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.originalPrice || !form.discountedPrice || !form.quantity || !form.pickupStart) {
      toast.error('Please fill all required fields'); return;
    }
    if (+form.discountedPrice >= +form.originalPrice) {
      toast.error('Discounted price must be lower than original'); return;
    }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success('🎉 Listing published! Users can now see it.');
    onSuccess();
    setSubmitting(false);
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 bg-white";
  const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
      <div>
        <label className={labelClass}>Food Name *</label>
        <input className={inputClass} placeholder="e.g. Dal Makhani + 2 Butter Naan"
          value={form.name} onChange={e => set('name', e.target.value)} />
      </div>

      <div>
        <label className={labelClass}>Category</label>
        <select className={inputClass} value={form.category} onChange={e => set('category', e.target.value)}>
          {['Indian', 'Bakery', 'Italian', 'Japanese', 'American', 'Healthy', 'Thai', 'Other'].map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea className={`${inputClass} h-24 resize-none`} placeholder="What's in it? How fresh? Any allergens?"
          value={form.description} onChange={e => set('description', e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Original Price (₹) *</label>
          <input type="number" className={inputClass} placeholder="350"
            value={form.originalPrice} onChange={e => set('originalPrice', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Your Price (₹) *</label>
          <input type="number" className={inputClass} placeholder="120"
            value={form.discountedPrice} onChange={e => set('discountedPrice', e.target.value)} />
        </div>
      </div>

      {discount > 0 && (
        <div className={`text-center py-2 rounded-xl text-sm font-bold ${discount >= 50 ? 'bg-emerald-50 text-emerald-700' : discount >= 30 ? 'bg-amber-50 text-amber-700' : 'bg-gray-50 text-gray-600'}`}>
          {discount >= 50 ? '🔥' : '💡'} {discount}% off · Great deal for customers!
        </div>
      )}

      <div>
        <label className={labelClass}>Quantity Available *</label>
        <input type="number" className={inputClass} placeholder="e.g. 5"
          value={form.quantity} onChange={e => set('quantity', e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Pickup From *</label>
          <input type="time" className={inputClass}
            value={form.pickupStart} onChange={e => set('pickupStart', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Pickup Until</label>
          <input type="time" className={inputClass}
            value={form.pickupEnd} onChange={e => set('pickupEnd', e.target.value)} />
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center">
        <p className="text-2xl mb-1">📸</p>
        <p className="text-sm font-bold text-gray-600">Upload food photo</p>
        <p className="text-xs text-gray-400 mt-0.5">Good photos get 3× more orders</p>
        <button type="button" className="mt-3 text-sm font-bold text-primary-500 border border-primary-300 px-4 py-1.5 rounded-full hover:bg-primary-50 transition-colors">
          Choose Photo
        </button>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary-500 text-white font-display font-black py-4 rounded-2xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {submitting ? <><span className="animate-spin">⏳</span> Publishing...</> : 'Publish Listing 🚀'}
      </button>
    </form>
  );
}

/**
 * Renders the restaurant dashboard with tabbed navigation for Overview, Listings, Orders, and Add Food.
 *
 * Maintains local tab state to switch views; the Orders tab shows a badge with the count of non-completed orders.
 *
 * @returns {JSX.Element} The dashboard UI element.
 */
export default function RestaurantPage() {
  const [tab, setTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'listings', label: '📦 Listings' },
    { id: 'orders', label: `🛍️ Orders` },
    { id: 'add', label: '+ Add Food' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Restaurant header (no user navbar) */}
      <header className="sticky top-0 z-50 bg-[#111] border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div>
            <p className="font-display font-black text-white text-lg">Zero<span className="text-primary-500">Hunger</span></p>
            <p className="text-white/40 text-[10px] font-medium -mt-0.5">Restaurant Dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-black">SG</div>
            <div className="hidden sm:block">
              <p className="text-white text-xs font-bold">Spice Garden</p>
              <p className="text-white/40 text-[10px]">CG Road, Ahmedabad</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-5 pb-10">
        {/* Tab navigation */}
        <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 shadow-sm mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 flex-1 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                tab === t.id
                  ? t.id === 'add' ? 'bg-primary-500 text-white' : 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
              {t.id === 'orders' && (
                <span className="ml-1 bg-primary-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                  {RESTAURANT_ORDERS.filter(o => o.status !== 'completed').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'overview' && <OverviewTab stats={RESTAURANT_STATS} />}
        {tab === 'listings' && <ListingsTab listings={RESTAURANT_LISTINGS} onAdd={() => setTab('add')} />}
        {tab === 'orders' && <OrdersTab orders={RESTAURANT_ORDERS} />}
        {tab === 'add' && <AddFoodTab onSuccess={() => setTab('listings')} />}
      </main>
    </div>
  );
}
