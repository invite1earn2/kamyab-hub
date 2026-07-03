"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { getCartTotal } from "../../services/cart";
import { placeCustomerOrder } from "../../services/customerOrder";

export default function Checkout() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  function update(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function submit(e) {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.city ||
      !form.address
    ) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      setLoading(true);

      await placeCustomerOrder(form);

      router.push("/order-success");
    } catch (err) {
      console.error(err);
      alert("Unable to place your order.");
    }

    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-3xl p-6 md:p-10">

      <h1 className="mb-8 text-4xl font-black">
        Checkout
      </h1>

      <form
        onSubmit={submit}
        className="space-y-5 rounded-3xl border bg-white p-8 shadow-sm"
      >

        <input
          name="name"
          placeholder="Full Name"
          onChange={update}
          className="w-full rounded-xl border p-4"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={update}
          className="w-full rounded-xl border p-4"
        />

        <input
          name="city"
          placeholder="City"
          onChange={update}
          className="w-full rounded-xl border p-4"
        />

        <textarea
          name="address"
          placeholder="Complete Address"
          rows={4}
          onChange={update}
          className="w-full rounded-xl border p-4"
        />

        <textarea
          name="notes"
          placeholder="Order Notes (Optional)"
          rows={3}
          onChange={update}
          className="w-full rounded-xl border p-4"
        />

        <div className="rounded-2xl bg-gray-50 p-5">

          <div className="flex justify-between">

            <span className="font-semibold">
              Order Total
            </span>

            <span className="text-2xl font-black text-blue-700">
              PKR {getCartTotal()}
            </span>

          </div>

        </div>

        <button
          disabled={loading}
          className="w-full rounded-2xl bg-black py-4 text-lg font-bold text-white hover:bg-gray-800"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </form>

    </main>
  );
}