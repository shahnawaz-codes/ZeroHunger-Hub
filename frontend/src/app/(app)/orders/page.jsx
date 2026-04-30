"use client";
import { useState } from "react";
import { MY_ORDERS } from "@/lib/dummy-data";

const STATUS_CONFIG = {
  ready_for_pickup: {
    label: "Ready for Pickup 🎉",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  confirmed: {
    label: "Order Confirmed",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    color: "bg-gray-50 text-gray-600 border-gray-200",
    dot: "bg-gray-400",
  },
};

/**
 * Render a five-star rating control that displays the current selection and lets the user pick a rating.
 *
 * @param {Object} props
 * @param {number} props.value - Current rating (1–5); stars with index less than or equal to this appear selected.
 * @param {(n: number) => void} props.onChange - Callback invoked with the chosen rating (1–5) when a star is clicked.
 * @returns {JSX.Element} The star rating React element.
 */
function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`text-xl transition-transform hover:scale-110 ${n <= value ? "text-amber-400" : "text-gray-200"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

/**
 * Render a single order card displaying order details and controls for active or historical orders.
 *
 * Displays order image, food and restaurant info, pickup slot or order timestamp, price and savings,
 * and CO₂ impact. When `isActive` is true, shows an "Active Order" header, status pill, optional
 * pickup code (for `ready_for_pickup`), and a "View →" link. When `isActive` is false, renders a
 * 1–5 star rating control and a thank-you acknowledgement after rating; rating is kept in local state.
 *
 * @param {Object} props
 * @param {Object} props.order - Order data. Expected properties:
 *   - {string} id
 *   - {string} orderId
 *   - {string} image
 *   - {string} foodName
 *   - {string} restaurantName
 *   - {string} pickupSlot
 *   - {string} date
 *   - {string} orderTime
 *   - {number|string} price
 *   - {number|string} savings
 *   - {number|string} co2Saved
 *   - {string} subStatus
 *   - {number} [rating]
 * @param {boolean} props.isActive - Whether the order is in the "Active" tab; controls conditional UI.
 * @returns {JSX.Element} The rendered order card component.
 */
function OrderCard({ order, isActive }) {
  const [rating, setRating] = useState(order.rating || 0);
  const [rated, setRated] = useState(!!order.rating);
  const status = STATUS_CONFIG[order.subStatus] || STATUS_CONFIG.confirmed;

  const handleRate = (val) => {
    setRating(val);
    setRated(true);
  };

  return (
    <div
      className={`bg-white rounded-2xl border overflow-hidden shadow-sm ${isActive ? "border-primary-200" : "border-gray-100"}`}
    >
      {isActive && (
        <div className="bg-primary-500 px-4 py-1.5 flex items-center justify-between">
          <span className="text-white text-xs font-bold">
            Active Order · {order.orderId}
          </span>
          <div
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${order.subStatus === "ready_for_pickup" ? "bg-white/20" : "bg-white/10"}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`}
            />
            <span className="text-white text-[10px] font-bold">
              {status.label}
            </span>
          </div>
        </div>
      )}

      <div className="p-4 flex gap-3">
        <img
          src={order.image}
          alt={order.foodName}
          className="w-20 h-20 rounded-xl object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-gray-900 text-sm leading-tight mb-0.5">
            {order.foodName}
          </p>
          <p className="text-xs text-gray-500 mb-1">{order.restaurantName}</p>
          <p className="text-xs text-gray-400">🕐 {order.pickupSlot}</p>
          {!isActive && (
            <p className="text-xs text-gray-300 mt-0.5">
              {order.date} · {order.orderTime}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="font-black text-gray-900 text-base">₹{order.price}</p>
          <p className="text-xs text-emerald-600 font-semibold mt-0.5">
            Saved ₹{order.savings}
          </p>
        </div>
      </div>

      {/* Impact row */}
      <div className="mx-4 mb-4 bg-emerald-50 rounded-xl px-3 py-2 flex items-center gap-3">
        <span>🌍</span>
        <p className="text-xs text-emerald-700 font-medium">
          You saved <strong>{order.co2Saved}kg CO₂</strong> with this order
        </p>
      </div>

      {isActive && order.subStatus === "ready_for_pickup" && (
        <div className="mx-4 mb-4 bg-gray-900 rounded-xl p-3 text-center">
          <p className="text-white font-black text-2xl tracking-widest">
            {order.orderId}
          </p>
          <p className="text-white/50 text-xs mt-0.5">
            Show this code at pickup
          </p>
        </div>
      )}

      {isActive && (
        <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            {order.date} · Ordered at {order.orderTime}
          </p>
          <a
            href={`/food/${order.id}`}
            className="text-xs font-bold text-primary-500 hover:underline"
          >
            View →
          </a>
        </div>
      )}

      {!isActive && (
        <div className="border-t border-gray-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500">
              Rate your experience
            </p>
            {rated && (
              <span className="text-xs text-emerald-600 font-bold">
                Thanks! ✓
              </span>
            )}
          </div>
          <StarRating value={rating} onChange={handleRate} />
        </div>
      )}
    </div>
  );
}

/**
 * Render the Orders page UI with an impact summary, tabs for "Active" and "History", and the corresponding order listings.
 *
 * @returns {JSX.Element} The Orders page element.
 */
export default function OrdersPage() {
  const [tab, setTab] = useState("active");
  const active = MY_ORDERS.filter((o) => o.status === "active");
  const history = MY_ORDERS.filter((o) => o.status === "history");

  const totalSaved = MY_ORDERS.reduce((sum, o) => sum + o.savings, 0);
  const totalCO2 = MY_ORDERS.reduce((sum, o) => sum + o.co2Saved, 0).toFixed(1);

  return (
    <div className="min-h-screen bg-cream">
      <main className="max-w-2xl mx-auto px-4 pb-24 md:pb-8 pt-5">
        <h1 className="font-display font-black text-2xl text-gray-900 mb-1">
          My Orders
        </h1>
        <p className="text-sm text-gray-500 mb-5">
          Track pickups and view your impact
        </p>

        {/* Impact summary */}
        <div className="bg-[#111] rounded-2xl p-4 mb-5 grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="font-display font-black text-white text-xl">
              {MY_ORDERS.length}
            </p>
            <p className="text-white/40 text-[10px] font-medium mt-0.5">
              Total Orders
            </p>
          </div>
          <div className="text-center border-x border-white/10">
            <p className="font-display font-black text-primary-400 text-xl">
              ₹{totalSaved}
            </p>
            <p className="text-white/40 text-[10px] font-medium mt-0.5">
              Total Saved
            </p>
          </div>
          <div className="text-center">
            <p className="font-display font-black text-emerald-400 text-xl">
              {totalCO2}kg
            </p>
            <p className="text-white/40 text-[10px] font-medium mt-0.5">
              CO₂ Saved
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-xl border border-gray-100 p-1 mb-5 shadow-sm">
          <button
            onClick={() => setTab("active")}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              tab === "active"
                ? "bg-gray-900 text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Active
            {active.length > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${tab === "active" ? "bg-primary-500" : "bg-gray-200 text-gray-600"}`}
              >
                {active.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab("history")}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              tab === "history"
                ? "bg-gray-900 text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            History
          </button>
        </div>

        {/* Order cards */}
        <div className="space-y-3 animate-fade-in">
          {tab === "active" &&
            (active.length === 0 ? (
              <div className="text-center py-14 bg-white rounded-2xl border border-gray-100">
                <p className="text-4xl mb-3">🛍️</p>
                <p className="font-display font-bold text-gray-700">
                  No active orders
                </p>
                <a
                  href="/"
                  className="mt-3 inline-block text-sm font-bold text-primary-500"
                >
                  Browse food →
                </a>
              </div>
            ) : (
              active.map((o) => <OrderCard key={o.id} order={o} isActive />)
            ))}
          {tab === "history" &&
            (history.length === 0 ? (
              <div className="text-center py-14 bg-white rounded-2xl border border-gray-100">
                <p className="text-4xl mb-3">📋</p>
                <p className="font-display font-bold text-gray-700">
                  No past orders yet
                </p>
              </div>
            ) : (
              history.map((o) => (
                <OrderCard key={o.id} order={o} isActive={false} />
              ))
            ))}
        </div>
      </main>
    </div>
  );
}
