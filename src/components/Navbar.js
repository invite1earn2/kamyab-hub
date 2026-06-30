"use client";

import { useEffect, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [user, setUser] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [companyMenu, setCompanyMenu] = useState(false);
const [partnerMenu, setPartnerMenu] = useState(false);
const dropdownRef = useRef(null);
  useEffect(() => {
    const email = localStorage.getItem("user_email");
    const role = localStorage.getItem("user_role");

    if (email) {
      setUser(email.split("@")[0]);
    }

    setIsCompany(role === "owner");
  }, []);

  function logout() {
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_role");
    window.location.href = "/login";
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-start justify-between">

        {/* LEFT */}

        <div className="flex-1">

          <h1 className="text-2xl md:text-3xl font-black text-gray-900">
            🚀 Kamyab Hub
          </h1>

          <p className="text-blue-600 font-semibold text-xs md:text-sm mt-1">
            Har Qadam Kamyabi Ki Taraf
          </p>

          {user && (
            <>

              <p className="mt-3 text-sm text-gray-700">
                Welcome Back,
                <span className="font-bold text-gray-900">
                  {" "}{user}
                </span>
                👋
              </p>

              <span
                className={`inline-flex mt-2 rounded-full px-3 py-1 text-xs font-semibold ${
                  isCompany
                    ? "bg-purple-100 text-purple-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {isCompany ? "👑 Platform Owner" : "🤝 Business Partner"}
              </span>

            </>
          )}

        </div>

        {/* DESKTOP MENU */}

        <div className="hidden lg:flex items-center gap-6">

          <a href="/" className="hover:text-blue-600 transition">
            Home
          </a>

          <a href="/products" className="hover:text-blue-600 transition">
  Products
</a>

          {!user && (
            <>
              <a href="/signup" className="hover:text-blue-600 transition">
                Signup
              </a>

              <a href="/login" className="hover:text-blue-600 transition">
                Login
              </a>
            </>
          )}

{user && !isCompany && (
  <>
    <a href="/dashboard" className="hover:text-blue-600 transition">
      Dashboard
    </a>

    <a href="/invite" className="hover:text-blue-600 transition">
      Invite
    </a>

    <a href="/orders" className="hover:text-blue-600 transition">
      Orders
    </a>

    <a href="/payment-settings" className="hover:text-blue-600 transition">
      Payment Settings
    </a>

    <a href="/withdraw" className="hover:text-blue-600 transition">
      Withdraw
    </a>

    <a href="/analytics" className="hover:text-blue-600 transition">
      Analytics
    </a>

    <a href="/my-withdrawals" className="hover:text-blue-600 transition">
      Withdrawals
    </a>

    <a href="/notifications" className="hover:text-blue-600 transition">
      Notifications
    </a>

    <button
      onClick={logout}
      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
    >
      Logout
    </button>
  </>
)}

{user && isCompany && (
<>

<div className="relative">

<button
onClick={()=>{
setCompanyMenu(!companyMenu);
setPartnerMenu(false);
}}
className="rounded-xl bg-purple-100 px-4 py-2 font-semibold text-purple-700 hover:bg-purple-200 transition"
>

👑 Company ▾

</button>

{

companyMenu && (

<div className="absolute left-0 mt-3 w-64 rounded-2xl border bg-white shadow-2xl overflow-hidden z-50">

<a
href="/company"
className="block px-5 py-3 hover:bg-gray-100"
>
📊 Company Dashboard
</a>

<a
href="/company-products"
className="block px-5 py-3 hover:bg-gray-100"
>
📦 Product Management
</a>

<a
href="/subscriptions"
className="block px-5 py-3 hover:bg-gray-100"
>
💳 Subscriptions
</a>

<a
href="/company-orders"
className="block px-5 py-3 hover:bg-gray-100"
>
🚚 Company Orders
</a>

<a
href="/withdrawals"
className="block px-5 py-3 hover:bg-gray-100"
>
💸 Withdrawal Management
</a>

<a
href="/analytics"
className="block px-5 py-3 hover:bg-gray-100"
>
📈 Company Analytics
</a>

<a
href="/company-reviews"
className="block px-5 py-3 hover:bg-gray-100"
>
💬 Community Reviews
</a>

</div>

)

}

</div>

</>

)}

{user && isCompany && (
<>

<div className="relative ml-3">

<button
onClick={()=>{
setPartnerMenu(!partnerMenu);
setCompanyMenu(false);
}}
className="rounded-xl bg-blue-100 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-200 transition"
>

🤝 Partner ▾

</button>

{

partnerMenu && (

<div className="absolute left-0 mt-3 w-64 rounded-2xl border bg-white shadow-2xl overflow-hidden z-50">

<a
href="/dashboard"
className="block px-5 py-3 hover:bg-gray-100"
>
📊 Dashboard
</a>

<a
href="/products"
className="block px-5 py-3 hover:bg-gray-100"
>
📦 Products
</a>

<a
href="/invite"
className="block px-5 py-3 hover:bg-gray-100"
>
👥 Invite Partners
</a>

<a
href="/orders"
className="block px-5 py-3 hover:bg-gray-100"
>
🛒 My Orders
</a>

<a
href="/payment-settings"
className="block px-5 py-3 hover:bg-gray-100"
>
🏦 Payment Settings
</a>

<a
href="/withdraw"
className="block px-5 py-3 hover:bg-gray-100"
>
💰 Withdraw
</a>

<a
href="/my-withdrawals"
className="block px-5 py-3 hover:bg-gray-100"
>
📄 Withdrawal History
</a>

<a
href="/analytics"
className="block px-5 py-3 hover:bg-gray-100"
>
📈 Analytics
</a>

<a
href="/notifications"
className="block px-5 py-3 hover:bg-gray-100"
>
🔔 Notifications
</a>

</div>

)

}

</div>

<button
onClick={logout}
className="ml-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
>
Logout
</button>

</>

)}

        </div>

        {/* MOBILE BUTTON */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden ml-4 w-12 h-12 rounded-2xl border border-gray-300 bg-white shadow-lg flex items-center justify-center text-2xl font-bold text-gray-900 active:scale-95 transition"
        >
          ☰
        </button>

      </div>

      <MobileMenu
        open={menuOpen}
        user={user}
        isCompany={isCompany}
        logout={logout}
        closeMenu={closeMenu}
      />

    </nav>
  );
}