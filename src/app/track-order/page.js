"use client";

import { useState } from "react";
import supabase from "../../lib/supabase";

export default function TrackOrder() {

  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function searchOrders() {

    if (!phone.trim()) {

      alert("Please enter your phone number.");

      return;

    }

    setLoading(true);

    const { data, error } =
      await supabase
        .from("orders")
        .select("*")
        .eq("customer_phone", phone)
        .eq("order_source", "customer")
        .order("created_at", { ascending: false });

    if (error) {

      console.log(error);

      setLoading(false);

      return;

    }

    setOrders(data || []);

    if (data && data.length > 0) {

      setCustomerName(data[0].customer_name);

    } else {

      setCustomerName("");

    }

    setSearched(true);

    setLoading(false);

  }

  function badge(status) {

    switch (status) {

      case "Pending":

        return "bg-yellow-100 text-yellow-700";

      case "Processing":

        return "bg-blue-100 text-blue-700";

      case "Shipped":

        return "bg-purple-100 text-purple-700";

      case "Delivered":

        return "bg-green-100 text-green-700";

      default:

        return "bg-gray-100 text-gray-700";

    }

  }

  return (

    <main className="mx-auto max-w-5xl p-6 md:p-10">

      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-black p-8 text-white">

        <p className="uppercase tracking-widest text-blue-100">

          Customer Portal

        </p>

        <h1 className="mt-2 text-4xl font-black">

          📦 Track Your Orders

        </h1>

        <p className="mt-3 max-w-2xl text-blue-100">

          Enter your mobile number to view all your orders and their latest delivery status.

        </p>

      </div>

      <div className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">

        <label className="mb-3 block font-semibold">

          Mobile Number

        </label>

        <div className="flex flex-col gap-4 md:flex-row">

          <input
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            placeholder="03XXXXXXXXX"
            className="flex-1 rounded-2xl border p-4 outline-none focus:border-blue-600"
          />

          <button
            onClick={searchOrders}
            disabled={loading}
            className="rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white hover:bg-blue-700 disabled:bg-gray-400"
          >

            {loading ? "Searching..." : "Track Orders"}

          </button>

        </div>

      </div>

      {searched && customerName && (

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm border">

          <h2 className="text-3xl font-black">

            👤 {customerName}

          </h2>

          <p className="mt-2 text-gray-600">

            Total Orders: <span className="font-bold">{orders.length}</span>

          </p>

        </div>

      )}

      {searched && orders.length === 0 && (

        <div className="mt-8 rounded-3xl border border-dashed bg-white py-20 text-center">

          <div className="text-7xl">

            📦

          </div>

          <h2 className="mt-6 text-3xl font-black">

            No Orders Found

          </h2>

          <p className="mt-3 text-gray-600">

            We couldn't find any customer orders with this mobile number.

          </p>

        </div>

      )}

      {orders.length > 0 && (

        <div className="mt-8 space-y-6">
    
              {orders.map((item) => (

            <div
              key={item.id}
              className="rounded-3xl border bg-white p-6 shadow-sm"
            >

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>

                  <h2 className="text-2xl font-black">

                    {item.product_name}

                  </h2>

                  <p className="mt-2 text-gray-500">

                    Order Date

                  </p>

                  <p className="font-semibold">

                    {new Date(item.created_at).toLocaleDateString()}

                  </p>

                </div>

                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${badge(item.status)}`}
                >

                  {item.status}

                </span>

              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">

                <div className="rounded-2xl bg-gray-50 p-5">

                  <p className="text-sm text-gray-500">

                    Quantity

                  </p>

                  <h3 className="text-xl font-bold">

                    {item.quantity}

                  </h3>

                </div>

                <div className="rounded-2xl bg-gray-50 p-5">

                  <p className="text-sm text-gray-500">

                    Total Price

                  </p>

                  <h3 className="text-xl font-bold text-blue-700">

                    PKR {item.price}

                  </h3>

                </div>

                <div className="rounded-2xl bg-gray-50 p-5">

                  <p className="text-sm text-gray-500">

                    Delivery City

                  </p>

                  <h3 className="text-lg font-semibold">

                    {item.customer_city}

                  </h3>

                </div>

                <div className="rounded-2xl bg-gray-50 p-5">

                  <p className="text-sm text-gray-500">

                    Delivery Address

                  </p>

                  <h3 className="text-lg font-semibold break-words">

                    {item.customer_address}

                  </h3>

                </div>

              </div>

              {item.notes && (

                <div className="mt-5 rounded-2xl bg-blue-50 p-5">

                  <p className="text-sm font-semibold text-blue-700">

                    Order Notes

                  </p>

                  <p className="mt-2 text-gray-700">

                    {item.notes}

                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      )}

    </main>

  );

}