"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export type CartItem = {
  id: string;

  // IMPORTANT FIX
  variantId: string;

  name: string;
  variant: string;
  price: number;
  mrp: number;
  rating: number;
  quantity: number;
  image?: string;
};

// FIXED TYPE
type AddCartItem = Omit<CartItem, "id" | "quantity">;

type CartContextType = {
  cart: CartItem[];
  loading: boolean
  addToCart: (item: AddCartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  getTotal: () => number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);
export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const getStorageKey = () => {
    const userId = (session?.user as any)?.id;
    return userId ? `cart_${userId}` : "guest_cart"; };

  useEffect(() => {
    setLoading(true);
    setCart([]);
  const userId = (session?.user as any)?.id;
  if (userId) {
    const userCartKey = `cart_${userId}`;
    const guestCart = localStorage.getItem("guest_cart");
    const userCart = localStorage.getItem(userCartKey);



    if (guestCart) {

  const guestItems = JSON.parse(guestCart);

  const existingItems = userCart
    ? JSON.parse(userCart)
    : [];

  const mergedCart = [...existingItems];

  guestItems.forEach((guestItem: any) => {

    const existing = mergedCart.find(
      (item: any) =>
        item.variantId === guestItem.variantId
    );

    if (existing) {

      existing.quantity += guestItem.quantity;

    } else {

      mergedCart.push(guestItem);

    }

  });

  localStorage.setItem(
    userCartKey,
    JSON.stringify(mergedCart)
  );

  localStorage.removeItem("guest_cart");

}

    const stored = localStorage.getItem(userCartKey);

    setCart(
      stored
        ? JSON.parse(stored).filter(
            (item: any) => item.variantId
          )
        : []
    );
    

  } else {
    const stored = localStorage.getItem("guest_cart");
    setCart( stored ? JSON.parse(stored).filter(
            (item: any) => item.variantId
          ) : []
    );
    
  }
  setLoading(false);
}, [session]);



  // SAVE CART
  useEffect(() => { 
    if(loading) return;
    localStorage.setItem(
    getStorageKey(), JSON.stringify(cart) ); 
  }, [cart, session, loading]);

  // ADD TO CART
  const addToCart = (item: AddCartItem) => {
    const key = item.variantId;
    setCart((prev) => {
      const existing = prev.find( (p) => p.variantId === key );
      // IF EXISTS
      if (existing) {
        return prev.map((p) =>
          p.variantId === key
            ? {
              ...p,
              quantity: p.quantity + 1,
            }
            : p
        );
      }

      // NEW ITEM
      return [
        ...prev,
        {
          ...item,
          id: crypto.randomUUID(),
          quantity: 1,
        },
      ];
    });
  };

  // REMOVE
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id) );
  };

  // INCREASE
  const increaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      )
    );
  };

  // DECREASE
  const decreaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id &&
          item.quantity > 1
          ? {
            ...item,
            quantity: item.quantity - 1,
          }
          : item
      )
    );
  };

  // TOTAL
  const getTotal = () =>
    cart.reduce( (t, i) => t + i.price * i.quantity, 0 );
  // CLEAR
  const clearCart = () =>  {
    localStorage.removeItem(getStorageKey());
    setCart([]); };
  return (
    <CartContext.Provider
      value={{
        cart,loading, addToCart, removeFromCart, increaseQty, decreaseQty, getTotal, clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) { throw new Error("CartContext missing"); }
  return ctx;
};