"use client";

import { useEffect } from "react";

export default function MobileMenu({

  open,
  user,
  isCompany,
  logout,
  closeMenu,

}) {

  useEffect(() => {

    if (open) {

      document.body.style.overflow = "hidden";

    } else {

      document.body.style.overflow = "";

    }

    return () => {

      document.body.style.overflow = "";

    };

  }, [open]);

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 md:hidden">

      {/* Background */}

      <div
        className="absolute inset-0 bg-black/40"
        onClick={closeMenu}
      />

      {/* Menu */}

      <div className="absolute top-0 right-0 h-screen w-full bg-white overflow-y-auto shadow-2xl">

        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-5 py-4">

          <h2 className="text-xl font-bold">

            Menu

          </h2>

          <button
            onClick={closeMenu}
            className="rounded-lg px-3 py-2 hover:bg-gray-100"
          >

            ✕

          </button>

        </div>

        <div className="px-5 py-5 space-y-2 pb-10">

          <a
            href="/"
            onClick={closeMenu}
            className="block rounded-xl px-4 py-3 hover:bg-blue-50 font-medium text-gray-700"
          >
            🏠 Home
          </a>

          {!user && (
            <>
              <a
                href="/signup"
                onClick={closeMenu}
                className="block rounded-xl px-4 py-3 hover:bg-blue-50 font-medium text-gray-700"
              >
                👤 Signup
              </a>

              <a
                href="/login"
                onClick={closeMenu}
                className="block rounded-xl px-4 py-3 hover:bg-blue-50 font-medium text-gray-700"
              >
                🔑 Login
              </a>
            </>
          )}

          {user && !isCompany && (
            <>
              <a href="/dashboard" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">📊 Dashboard</a>

              <a href="/products" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">📦 Products</a>

              <a href="/invite" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">👥 Invite</a>

              <a href="/orders" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">🛒 Orders</a>

              <a href="/payment-settings" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">💳 Payment Settings</a>

              <a href="/withdraw" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">💰 Withdraw</a>

              <a href="/analytics" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">📈 Analytics</a>

              <a href="/my-withdrawals" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">🏦 My Withdrawals</a>

              <button
                onClick={logout}
                className="w-full mt-6 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}

         {user && isCompany && (
<>
<div className="mt-2 mb-3 px-2 text-xs font-bold uppercase tracking-widest text-gray-500">
👑 Company Management
</div>

<a href="/company" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">
🏠 Company Dashboard
</a>

<a href="/company-products" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">
📦 Product Management
</a>

<a href="/subscriptions" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">
💳 Subscription Management
</a>

<a href="/company-orders" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">
🚚 Company Orders
</a>

<a href="/withdrawals" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">
💸 Withdrawal Management
</a>

<a href="/company-reviews" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">
💬 Community Reviews
</a>

<hr className="my-5" />

<div className="mb-3 px-2 text-xs font-bold uppercase tracking-widest text-gray-500">
👤 Partner Area
</div>

<a href="/dashboard" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">
📊 Dashboard
</a>

<a href="/products" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">
🛍 Products
</a>

<a href="/invite" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">
👥 Invite
</a>

<a href="/orders" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">
🛒 Orders
</a>

<a href="/payment-settings" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">
💳 Payment Settings
</a>

<a href="/withdraw" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">
💰 Withdraw
</a>

<a href="/my-withdrawals" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">
🏦 My Withdrawals
</a>

<a href="/analytics" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition">
📈 Analytics
</a>

<hr className="my-5" />

<a
href="/"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition"
>
🏠 Home
</a>

<button
onClick={logout}
className="w-full mt-6 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition"
>
🚪 Logout
</button>

</>
)}   

        </div>

      </div>

    </div>

  );

}