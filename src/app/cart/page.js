"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getCart,
  removeFromCart,
  updateQuantity,
  getCartTotal,
} from "../../services/cart";

export default function Cart() {
  const [cart, setCart] = useState([]);

  function loadCart() {
    setCart(getCart());
  }

  useEffect(() => {
    loadCart();
  }, []);

  function increase(item) {
    updateQuantity(item.id, item.quantity + 1);
    loadCart();
  }

  function decrease(item) {
    updateQuantity(item.id, item.quantity - 1);
    loadCart();
  }

  function remove(item) {
    removeFromCart(item.id);
    loadCart();
  }

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-4xl p-10 text-center">

        <div className="text-7xl">🛒</div>

        <h1 className="mt-6 text-4xl font-black">
          Your Cart is Empty
        </h1>

        <p className="mt-3 text-gray-600">
          Browse our products and add your favorite items.
        </p>

        <Link
          href="/products"
          className="mt-8 inline-block rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white hover:bg-blue-700"
        >
          Continue Shopping
        </Link>

      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-6 md:p-10">

      <h1 className="mb-10 text-4xl font-black">
        Shopping Cart
      </h1>

      <div className="space-y-6">

        {cart.map((item) => (

          <div
            key={item.id}
            className="flex gap-5 rounded-3xl border bg-white p-5 shadow-sm"
          >

            <div className="h-28 w-28 overflow-hidden rounded-2xl bg-gray-100">

              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-4xl">
                  📦
                </div>
              )}

            </div>

            <div className="flex-1">

              <h2 className="text-xl font-bold">
                {item.name}
              </h2>

              <p className="mt-2 font-black text-blue-700">
                PKR {item.price}
              </p>

              <div className="mt-4 flex items-center gap-3">

                <button
                  onClick={() => decrease(item)}
                  className="rounded-xl border px-4 py-2"
                >
                  −
                </button>

                <span className="font-bold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increase(item)}
                  className="rounded-xl border px-4 py-2"
                >
                  +
                </button>

              </div>

            </div>

            <div className="text-right">

              <p className="font-black">
                PKR {item.price * item.quantity}
              </p>

              <button
                onClick={() => remove(item)}
                className="mt-5 text-red-600 font-semibold hover:underline"
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-10 rounded-3xl border bg-gray-50 p-8">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-black">
            Total
          </h2>

          <h2 className="text-3xl font-black text-blue-700">
            PKR {getCartTotal()}
          </h2>

        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2">

  <Link
    href="/products"
    className="rounded-2xl border border-gray-300 py-4 text-center text-lg font-bold text-gray-700 transition hover:bg-gray-100"
  >
    🛍 Want to Buy More?
  </Link>

  <Link
    href="/checkout"
    className="rounded-2xl bg-black py-4 text-center text-lg font-bold text-white transition hover:bg-gray-800"
  >
    Proceed to Checkout →
  </Link>

</div>

      </div>

    </main>
  );
}