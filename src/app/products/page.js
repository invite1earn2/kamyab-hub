"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "../../lib/supabase";
import { createOrder } from "../../services/order";
import { addToCart } from "../../services/cart";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [role, setRole] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    setProducts(data || []);

    setRole(localStorage.getItem("user_role"));

    setLoading(false);
  }

  async function sell(item) {
    await createOrder(item);
    alert("Order Created Successfully");
  }

  function addProductToCart(item) {
  addToCart(item, 1);
  alert("Product added to cart.");
}

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <p className="mt-4 font-medium text-gray-600">
            Loading Products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="p-6 md:p-10">
      <div className="mb-10">
        <p className="font-semibold uppercase tracking-wider text-blue-600">
          Marketplace
        </p>

        <h1 className="mt-2 text-4xl font-black">
          Products Marketplace
        </h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Browse quality products with nationwide delivery.
          Become a Business Partner to earn commissions by selling
          Kamyab Hub products.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3">
        {products.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="h-46 overflow-hidden bg-gray-100 sm:h-48 md:h-52">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-6xl">
                  📦
                </div>
              )}
            </div>

            <div className="p-3">
              <h2 className="min-h-[44px] text-[15px] font-bold leading-5 text-gray-900">
                {item.name}
              </h2>

              <p className="mt-2 text-xl font-black text-blue-700">
                PKR {item.price}
              </p>

              <div className="mt-2">
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold text-green-700">
                  🚚 Delivery Available
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <Link
                  href={`/product/${item.id}`}
                  className="block w-full rounded-2xl border border-gray-300 py-3 text-center font-bold transition hover:bg-gray-100"
                >
                  👁 View Details
                </Link>

                <button
  onClick={() => addProductToCart(item)}
                  className="w-full rounded-2xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700"
                >
                  🛒 Add to Cart
                </button>

                {role === "Business Partner" && (
                  <button
                    onClick={() => sell(item)}
                    className="w-full rounded-2xl bg-black py-3 font-bold text-white transition hover:bg-gray-800"
                  >
                    💼 Sell Product
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}