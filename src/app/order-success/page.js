"use client";

import Link from "next/link";

export default function OrderSuccess() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-6">

      <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow-xl border text-center">

        <div className="text-7xl">
          🎉
        </div>

        <h1 className="mt-6 text-4xl font-black text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="mt-5 text-gray-600 leading-7">
          Thank you for shopping with
          <span className="font-bold"> Kamyab Hub</span>.
          <br />
          Your order has been received and will be processed shortly.
        </p>

        <div className="mt-10 grid gap-4">

          <Link
            href="/products"
            className="rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white transition hover:bg-blue-700"
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="rounded-2xl border border-gray-300 py-4 text-lg font-bold text-gray-700 transition hover:bg-gray-100"
          >
            Back to Home
          </Link>

        </div>

      </div>

    </main>
  );
}