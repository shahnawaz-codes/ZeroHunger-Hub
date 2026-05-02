"use client";
import { Button } from "@/components/ui";
import useCartStore from "@/store/useCartStore";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

export default function cartPage() {
  const items = useCartStore((state) => state.items);
  const slot = useCartStore((state) => state.slot);
  const setSlot = useCartStore((state) => state.setSlot);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  
  return (
    <div>
      <p>cart page</p>
    </div>
  );
}
