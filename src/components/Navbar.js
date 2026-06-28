"use client";

import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [user, setUser] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
              <a href="/dashboard">Dashboard</a>
              <a href="/products">Products</a>
              <a href="/invite">Invite</a>
              <a href="/orders">Orders</a>
              <a href="/payment-settings">Payment Settings</a>
              <a href="/withdraw">Withdraw</a>
              <a href="/analytics">Analytics</a>
              <a href="/my-withdrawals">Withdrawals</a>

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
              <a href="/company">Company</a>
              <a href="/company-products">Products</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/analytics">Analytics</a>
              <a href="/subscriptions">Subscriptions</a>
              <a href="/company-orders">Orders</a>
              <a href="/withdrawals">Withdrawals</a>

              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
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