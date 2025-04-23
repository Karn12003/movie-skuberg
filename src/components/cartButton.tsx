'use client';

import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { CheckoutPopup } from './checkoutPopup';

interface Props {
  cart: Movie[];
  total: number;
  onOrder: () => void;
  clearCart: () => void;
}

export const CartButton: React.FC<Props> = ({
  cart,
  total,
  onOrder,
  clearCart,
}) => {
  const [open, setOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (isCheckoutOpen && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isCheckoutOpen, countdown]);

  const discount = cart.length >= 5 ? 0.2 : cart.length >= 3 ? 0.1 : 0;
  const discountedTotal = total * (1 - discount);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative p-2 bg-zinc-800 rounded-full hover:bg-zinc-700"
      >
        <ShoppingCart className="text-white w-6 h-6" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg z-50 text-white">
          <div className="p-4 max-h-60 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-sm text-gray-400">Your cart is empty.</p>
            ) : (
              cart.map((movie) => (
                <div key={movie.id} className="mb-2 text-sm">
                  {movie.title} - ${movie.price}
                </div>
              ))
            )}
          </div>
          <div className="border-t border-zinc-800 p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Total:</span>
              <span className="text-sm font-semibold">
                ${discountedTotal.toFixed(2)}
              </span>
            </div>
            {discount > 0 && (
              <div className="text-xs text-purple-400 mb-2">
                Discount: {discount * 100}% off
              </div>
            )}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-2 text-sm bg-purple-600 hover:bg-purple-700 rounded mb-2"
            >
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full text-sm text-red-400 hover:underline"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}

      {/* เปิด Checkout Popup เมื่อ isCheckoutOpen เป็น true */}
      {isCheckoutOpen && (
        <CheckoutPopup
          open={isCheckoutOpen}
          onOpenChange={setIsCheckoutOpen}
          countdown={countdown}
          discount={discount}
        />
      )}
    </div>
  );
};
