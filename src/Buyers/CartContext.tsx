import { createContext, useContext, useMemo, useState } from "react";
import type { CreateOrderItemPayload } from "../lib/types/order";
import type { Listing } from "../lib/types/listing";

// listing_id doubles as the identity POST /orders needs — price/name/etc are
// display-only, the backend recomputes unit_price/discount/line_total itself.
export interface CartItem extends CreateOrderItemPayload {
  produce_name: string;
  category_name: string;
  unit: string;
  price: number;
  image: string | null;
  // Snapshot of the listing's available stock at add-time, used to clamp
  // quantity client-side. The backend is still the source of truth at checkout.
  stock: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (listing: Listing) => void;
  removeItem: (listingId: number) => void;
  updateQty: (listingId: number, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

const DELIVERY_FEE = 1500;

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (listing: Listing) => {
    if (listing.stock <= 0) return;
    setItems((prev) => {
      const existing = prev.find((item) => item.listing_id === listing.id);
      if (existing) {
        if (existing.quantity >= listing.stock) return prev;
        return prev.map((item) =>
          item.listing_id === listing.id
            ? { ...item, quantity: Math.min(item.quantity + 1, listing.stock) }
            : item,
        );
      }
      return [
        ...prev,
        {
          listing_id: listing.id,
          quantity: 1,
          produce_name: listing.produce.name,
          category_name: listing.produce.category.name,
          unit: listing.unit ?? "unit",
          price: Number(listing.price),
          image: listing.primary_image_url ?? listing.produce.image_url,
          stock: listing.stock,
        },
      ];
    });
  };

  const removeItem = (listingId: number) => {
    setItems((prev) => prev.filter((item) => item.listing_id !== listingId));
  };

  const updateQty = (listingId: number, qty: number) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.listing_id === listingId
          ? { ...item, quantity: Math.min(qty, item.stock) }
          : item,
      ),
    );
  };

  const clear = () => setItems([]);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [items],
  );
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clear,
        count,
        subtotal,
        deliveryFee,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
