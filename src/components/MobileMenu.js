"use client";

export default function MobileMenu({
  open,
  user,
  isCompany,
  logout,
  closeMenu,
}) {
  if (!open) return null;

  return (
    <div className="md:hidden border-t border-gray-200 bg-white shadow-xl animate-in slide-in-from-top duration-300">
      <div className="px-5 py-5 space-y-2">

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
            <a href="/dashboard" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">📊 Dashboard</a>

            <a href="/products" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">📦 Products</a>

            <a href="/invite" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">👥 Invite</a>

            <a href="/orders" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">🛒 Orders</a>

            <a href="/withdraw" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">💰 Withdraw</a>

            <a href="/analytics" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">📈 Analytics</a>

            <a href="/my-withdrawals" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">🏦 My Withdrawals</a>

            <button
              onClick={logout}
              className="w-full mt-4 rounded-xl bg-red-600 text-white py-3 font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}

        {user && isCompany && (
          <>
            <a href="/company" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">👑 Company Dashboard</a>

            <a href="/company-products" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">📦 Product Management</a>

            <a href="/dashboard" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">📊 Dashboard</a>

            <a href="/products" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">🛍 Products</a>

            <a href="/invite" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">👥 Invite</a>

            <a href="/orders" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">🛒 Orders</a>

            <a href="/analytics" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">📈 Analytics</a>

            <a href="/subscriptions" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">💳 Subscriptions</a>

            <a href="/company-orders" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">🚚 Company Orders</a>

            <a href="/withdrawals" onClick={closeMenu} className="block rounded-xl px-4 py-3 hover:bg-blue-50">💸 Withdrawal Management</a>

            <button
              onClick={logout}
              className="w-full mt-4 rounded-xl bg-red-600 text-white py-3 font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </div>
  );
}