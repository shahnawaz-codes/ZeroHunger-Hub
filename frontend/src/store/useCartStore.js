import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      // STATE--------
      items: [],
      slot: null,
      restaurantId: null,
      expiryAt: null,

      // ACTION--------
      addItem: (newItem, pickupSlot, restId) => {
        get().checkExpiry();
        const { slot, restaurantId, items, validateCart } = get();
        // slot and restaurantId = max->1 and set expeiry cart
        if (slot && restaurantId) {
          if (!validateCart(pickupSlot, restId)) return;
        }
        // if item is already exist then increment qnty +1
        const isExist = items.find(
          (cartItem) => cartItem.foodId == newItem.foodId,
        );
        if (isExist) {
          //increment qnty +1
          set((state) => ({
            items: state.items.map((cartItem) => {
              return cartItem.foodId === newItem.foodId
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem;
            }),
          }));
        } else {
          //-- go ahead in items state and spread privous data in , and add the new item
          set((state) => ({
            items: [...state.items, { ...newItem, quantity: 1 }],
          }));
        }
        if (!slot && !restaurantId) {
          set({
            slot: pickupSlot,
            restaurantId: restId,
            expiryAt: Date.now() + 10 * 60 * 1000, // 10 min
          });
        }
      },
      removeItem: (foodId) => {
        set((state) => ({
          items: state.items.filter((i) => i.foodId !== foodId),
        }));
      },
      setSlot: (slot) => {
        set((state) => ({ slot: slot }));
      },
      setQuantity: (foodId, action) => {
        if (action === "DECREMENT") {
          const item = get().items.find((i) => i.foodId === foodId);
          if (item?.quantity <= 1) {
            get().removeItem(foodId);
            return;
          }
        }
        //-- Based on action we perform two task
        set((state) => ({
          items: state.items.map((i) =>
            //-- if id same then perform task otherwise return original items[]
            i.foodId === foodId
              ? action === "INCREMENT"
                ? { ...i, quantity: i.quantity + 1 }
                : { ...i, quantity: i.quantity - 1 }
              : i,
          ),
        }));
      },
      initializeCart: () => {
        get().checkExpiry(); // clear cart if expired
        const { items, clearCart } = get();
        const cleanGhostItems = items.filter((i) => i.quantity > 0); // clean those items who has 0 qnty
        if (cleanGhostItems.length !== items.length) {
          set({ items: cleanGhostItems });
        }
        if (items.length === 0) {
          set({
            slot: null,
            restaurantId: null,
          });
        }
      },
      clearCart: () => {
        set(() => ({
          items: [],
          slot: null,
          restaurantId: null,
          expiryAt: null,
        }));
      },
      validateCart: (pickupSlot, restId) => {
        const { slot, restaurantId } = get();
        if (pickupSlot && slot._id !== pickupSlot._id) {
          alert("you can choose only one pickslot at a cart");
          return false;
        }
        if (restaurantId && restId !== restaurantId) {
          alert("food must be come from same restaruant ");
          return false;
        }
        return true;
      },
      checkExpiry: () => {
        const { expiryAt, clearCart } = get();
        if (expiryAt && Date.now() > expiryAt) {
          return clearCart();
        }
      },
    }),
    { name: "items-cart" },
  ),
);

export default useCartStore;
