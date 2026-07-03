"use client";

import { useEffect } from "react";
import NotificationBadge from "./NotificationBadge";

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

      <div className="absolute top-0 right-0 h-screen w-full overflow-y-auto bg-white shadow-2xl">

        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-5 py-4">

          <h2 className="text-xl font-bold">

            Menu

          </h2>

          <button
            onClick={closeMenu}
            className="rounded-lg px-3 py-2 transition hover:bg-gray-100"
          >

            ✕

          </button>

        </div>

        <div className="space-y-2 px-5 py-5 pb-10">

          <a
            href="/"
            onClick={closeMenu}
            className="block rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-blue-50"
          >

            🏠 Home

          </a>

          {!user && (

            <>

              <a
                href="/signup"
                onClick={closeMenu}
                className="block rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-blue-50"
              >

                👤 Signup

              </a>

              <a
                href="/login"
                onClick={closeMenu}
                className="block rounded-xl px-4 py-3 font-medium text-gray-700 transition hover:bg-blue-50"
              >

                🔑 Login

              </a>

            </>

          )}

          {user && !isCompany && (

            <>

              <a href="/dashboard" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700">

                📊 Dashboard

              </a>

              <a href="/products" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700">

                📦 Products

              </a>

              <a href="/invite" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700">

                👥 Invite

              </a>

              <a href="/orders" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700">

                🛒 Orders

              </a>

              <a href="/payment-settings" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700">

                💳 Payment Settings

              </a>

              <a href="/withdraw" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700">

                💰 Withdraw

              </a>

              <a href="/analytics" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700">

                📈 Analytics

              </a>

              <NotificationBadge />

              <a href="/my-withdrawals" onClick={closeMenu} className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700">

                🏦 My Withdrawals

              </a>

              <button
                onClick={logout}
                className="mt-6 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
              >

                Logout

              </button>

            </>

          )}

          {user && isCompany && (

            <>
          <div className="mb-3 mt-2 px-2 text-xs font-bold uppercase tracking-widest text-gray-500">

👑 Company Management

</div>

<a
href="/company"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
>

🏠 Company Dashboard

</a>

<a
href="/company-products"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
>

📦 Product Management

</a>

<a
href="/subscriptions"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
>

💳 Subscription Management

</a>

<a
href="/company-orders"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
>

🚚 Company Orders

</a>

<a
href="/withdrawals"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
>

💸 Withdrawal Management

</a>

<a
href="/company-reviews"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
>

💬 Community Reviews

</a>

<hr className="my-5" />

<div className="mb-3 px-2 text-xs font-bold uppercase tracking-widest text-gray-500">

👤 Partner Area

</div>

<a
href="/dashboard"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
>

📊 Dashboard

</a>

<a
href="/products"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
>

🛍 Products

</a>

<a
href="/invite"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
>

👥 Invite

</a>

<a
href="/orders"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
>

🛒 Orders

</a>

<a
href="/payment-settings"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
>

💳 Payment Settings

</a>

<a
href="/withdraw"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
>

💰 Withdraw

</a>

<a
href="/analytics"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
>

📈 Analytics

</a>

<NotificationBadge />

<a
href="/my-withdrawals"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
>

🏦 My Withdrawals

</a>

<hr className="my-5" />

<a
href="/"
onClick={closeMenu}
className="block rounded-xl px-4 py-3 font-medium text-gray-800 transition hover:bg-blue-50 hover:text-blue-700"
>

🏠 Home

</a>

<button
onClick={logout}
className="mt-6 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
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