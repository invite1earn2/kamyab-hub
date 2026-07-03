"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { addToCart } from "../../services/cart";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    setProducts(data || []);
    setLoading(false);
  }

  function addProductToCart(item) {
    addToCart(item, 1);
    window.location.href = "/cart";
  }

  function discount(item) {
    if (
      !item.original_price ||
      Number(item.original_price) <= Number(item.price)
    ) {
      return null;
    }

    return Math.round(
      ((item.original_price - item.price) / item.original_price) * 100
    );
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
          Shop confidently and enjoy premium quality products.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3">
        {products.map((item) => {
          const off = discount(item);

          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="h-56 overflow-hidden bg-gray-100 sm:h-64 md:h-72">
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

              <div className="p-2.5">

                <h2 className="min-h-[36px] text-[15px] font-bold leading-5 text-gray-900">
                  {item.name}
                </h2>

                <p className="mt-2 text-xl font-black text-blue-700">
                  PKR {item.price}
                </p>

                {off && (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm text-gray-400 line-through">
                      PKR {item.original_price}
                    </span>

                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-600">
                      {off}% OFF
                    </span>
                  </div>
                )}

                <div className="mt-2">

                  {item.stock_status === "In Stock" && (
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold text-green-700">
                      🟢 In Stock
                    </span>
                  )}

                  {item.stock_status === "Limited Stock" && (
                    <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-[11px] font-semibold text-yellow-700">
                      🟡 Limited Stock
                    </span>
                  )}

                  {item.stock_status === "Out of Stock" && (
                    <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-[11px] font-semibold text-red-700">
                      🔴 Out of Stock
                    </span>
                  )}

                </div>

                <div className="mt-3">

                  <button
                    onClick={() => addProductToCart(item)}
                    disabled={item.stock_status === "Out of Stock"}
                    className={`w-full rounded-2xl py-2.5 font-bold text-white transition ${
                      item.stock_status === "Out of Stock"
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {item.stock_status === "Out of Stock"
                      ? "Out of Stock"
                      : "🛒 Add to Cart"}
                  </button>

                </div>

              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}