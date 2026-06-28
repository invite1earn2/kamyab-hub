"use client";

import {
useEffect,
useState
}
from "react";

import MobileMenu
from "./MobileMenu";

export default function Navbar(){

const [
user,
setUser
]=
useState("");

const [
isCompany,
setIsCompany
]=
useState(false);
const [
menuOpen,
setMenuOpen
]=
useState(false);

useEffect(()=>{

const email=
localStorage.getItem(
"user_email"
);

const role=
localStorage.getItem(
"user_role"
);

if(email){

setUser(
email.split("@")[0]
);

}

setIsCompany(
role==="owner"
);

},[]);

function closeMenu(){

setMenuOpen(false);

}
function logout(){

localStorage.removeItem(
"user_email"
);

localStorage.removeItem(
"user_id"
);

localStorage.removeItem(
"user_role"
);

window.location.href="/login";

}

return(

<nav className="p-5 border-b flex justify-between items-center">

<div>

<div>

<h1 className="text-2xl font-black text-gray-900">

🚀 Kamyab Hub

</h1>

<p className="text-xs text-blue-600 font-semibold tracking-wide">

Har Qadam Kamyabi Ki Taraf

</p>

</div>

{

user&&

<>

<p className="text-sm text-gray-700 mt-2">

Welcome Back,

<span className="font-bold text-gray-900">

{" "}{user}

</span>

👋

</p>

<p
className={`

inline-flex

mt-2

rounded-full

px-3

py-1

text-xs

font-semibold

${

isCompany

?

"bg-purple-100 text-purple-700"

:

"bg-amber-100 text-amber-700"

}

`}
>

{

isCompany

?

"👑 Platform Owner"

:

"🤝 Business Partner"

}

</p>

</>

}

</div>

<>
  {/* Desktop Navigation */}

  <div className="hidden lg:flex items-center gap-6">

    <a
      href="/"
      className="font-medium text-gray-700 hover:text-blue-600 transition"
    >
      Home
    </a>

    {!user && (
      <>
        <a
          href="/signup"
          className="font-medium text-gray-700 hover:text-blue-600 transition"
        >
          Signup
        </a>

        <a
          href="/login"
          className="font-medium text-gray-700 hover:text-blue-600 transition"
        >
          Login
        </a>
      </>
    )}

    {user && isCompany && (
      <>
        <a href="/company">Company</a>

        <a href="/company-products">Products</a>

        <a href="/dashboard">Dashboard</a>

        <a href="/analytics">Analytics</a>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition"
        >
          Logout
        </button>
      </>
    )}

    {user && !isCompany && (
      <>
        <a href="/dashboard">Dashboard</a>

        <a href="/products">Products</a>

        <a href="/invite">Invite</a>

        <a href="/orders">Orders</a>

        <a href="/withdraw">Withdraw</a>

        <a href="/analytics">Analytics</a>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition"
        >
          Logout
        </button>
      </>
    )}

  </div>

  {/* Mobile Button */}

  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="lg:hidden text-3xl font-bold text-gray-800"
  >
    ☰
  </button>
</>

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