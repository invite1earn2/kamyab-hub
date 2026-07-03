"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import supabase from "../../../lib/supabase";
import { createOrder } from "../../../services/order";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [role, setRole] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    setLoading(true);

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    setProduct(data || null);

    setRole(localStorage.getItem("user_role"));

    setLoading(false);
  }

  async function sellProduct() {
    await createOrder(product);

    alert("Order Created Successfully");
  }

  function addToCart() {
    alert("Shopping Cart will be implemented in Phase 3.");
  }

  function buyNow() {
    alert("Checkout will be implemented in Phase 4.");
  }

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <p className="mt-4 font-medium text-gray-600">
            Loading Product...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-5xl p-8">
        <h1 className="text-3xl font-black">
          Product Not Found
        </h1>

        <p className="mt-3 text-gray-600">
          The requested product does not exist.
        </p>

        <Link
          href="/products"
          className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
        >
          ← Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-6 md:p-10">

      <Link
        href="/products"
        className="mb-8 inline-block text-blue-600 font-semibold hover:underline"
      >
        ← Back to Products
      </Link>

      <div className="grid gap-10 md:grid-cols-2">

        <div className="overflow-hidden rounded-3xl border bg-gray-100">

          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-[500px] items-center justify-center text-8xl">
              📦
            </div>
          )}

        </div>

        <div>

          <h1 className="text-4xl font-black">
            {product.name}
          </h1>

          <p className="mt-5 text-4xl font-black text-blue-700">
            PKR {product.price}
          </p>

          <div className="mt-5">
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              🚚 Nationwide Delivery Available
            </span>
          </div>

          <div className="mt-8 rounded-2xl bg-gray-50 p-5 leading-7 text-gray-600">
            This is a premium Kamyab Hub product.

            <br />
            <br />

            Place your order today and enjoy reliable nationwide delivery.
          </div>

          <div className="mt-8">

            <p className="mb-3 font-bold">
              Quantity
            </p>

            <div className="flex w-fit items-center rounded-xl border">

              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
                className="px-5 py-3 text-xl"
              >
                −
              </button>

              <div className="w-16 text-center font-bold">
                {quantity}
              </div>

              <button
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
                className="px-5 py-3 text-xl"
              >
                +
              </button>

            </div>

          </div>

          <div className="mt-10 space-y-3">

            <button
              onClick={addToCart}
              className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white hover:bg-blue-700"
            >
              🛒 Add to Cart
            </button>

            <button
              onClick={buyNow}
              className="w-full rounded-2xl bg-green-600 py-4 text-lg font-bold text-white hover:bg-green-700"
            >
              ⚡ Buy Now
            </button>

            {role === "Business Partner" && (
              <button
                onClick={sellProduct}
                className="w-full rounded-2xl bg-black py-4 text-lg font-bold text-white hover:bg-gray-800"
              >
                💼 Sell Product
              </button>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}