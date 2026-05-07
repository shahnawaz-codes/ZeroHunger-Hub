export function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  const savings = Math.round(item.price * 0.35 * item.quantity); // estimate original

  return (
    <div className="group relative bg-[#1a1a1a] border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-200">
      {/* top color strip keyed to item */}
      <div className="h-[2px] bg-gradient-to-r from-brand-green via-brand-orange to-brand-green opacity-60" />

      <div className="p-4">
        {/* emoji placeholder since items don't carry image */}
        <div className="flex gap-4 items-start">
          {/* square food icon box */}
          <div className="w-14 h-14 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-2xl flex-shrink-0">
            🍱
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="text-white font-bold text-sm leading-snug truncate pr-6"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {item.foodName}
            </p>
            <p className="text-white/40 text-[11px] font-medium mt-0.5">
              per item
            </p>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span
                className="text-brand-green font-black text-lg leading-none"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                ₹{item.price}
              </span>
              <span className="text-white/25 text-xs line-through">
                ₹{Math.round(item.price / 0.65)}
              </span>
            </div>
          </div>

          {/* remove button */}
          <button
            onClick={onRemove}
            className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-white/30 hover:text-red-400 transition-all text-xs"
          >
            ✕
          </button>
        </div>

        {/* bottom row: qty + subtotal */}
        <div className="flex items-center justify-between mt-4">
          {/* Qty control — square boxes */}
          <div className="flex items-center gap-0 bg-white/5 rounded-xl overflow-hidden border border-white/8">
            <button
              onClick={onDecrement}
              className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all text-lg font-light"
            >
              −
            </button>
            <span
              className="w-9 h-9 flex items-center justify-center text-white font-bold text-sm border-x border-white/8"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {item.quantity}
            </span>
            <button
              onClick={onIncrement}
              className="w-9 h-9 flex items-center justify-center text-brand-green hover:bg-brand-green/10 transition-all text-lg font-light"
            >
              +
            </button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <p className="text-white/40 text-[10px] font-medium uppercase tracking-wider">
              subtotal
            </p>
            <p
              className="text-white font-black text-base"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              ₹{item.price * item.quantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}