"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import AuthGuard from "../../components/authguard";
import { checkOwner } from "../../services/owner";

export default function Dashboard(){

const [loading,setLoading]=useState(true);
const [earnings,setEarnings]=useState(0);
const [sales,setSales]=useState(0);
const [orderCount,setOrderCount]=useState(0);

useEffect(()=>{

async function load(){

const userEmail=
localStorage.getItem("user_email");

if(checkOwner()){

setLoading(false);
return;

}

const { data:user }=
await supabase
.from("users")
.select("subscribed,earnings_balance")
.eq("email",userEmail)
.single();

if(!user||!user.subscribed){

window.location.href="/subscribe";
return;

}

const { data }=
await supabase
.from("orders")
.select("profit")
.eq("user_email",userEmail)
.eq("status","delivered");

const total=
(data||[])
.reduce(
(a,b)=>
a+
Number(b.profit||0),
0
);

setEarnings(
Number(user.earnings_balance||0)
);

setSales(total);

setOrderCount(
(data||[]).length
);

setLoading(false);

}

load();

},[]);

return(

<AuthGuard>

{

loading

?

<div className="min-h-[70vh] flex items-center justify-center">

<div className="text-center">

<div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>

<p className="mt-4 text-gray-600">

Loading Dashboard...

</p>

</div>

</div>

:

<main className="p-8">

<div className="mb-12 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 md:p-10 shadow-sm">

  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

    <div>

      <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

        👋 Welcome Back

      </span>

      <h1 className="mt-5 text-3xl font-black tracking-tight text-gray-900 md:text-5xl">

        Business Dashboard

      </h1>

      <p className="mt-4 max-w-2xl text-base leading-7 text-gray-700 md:text-lg">

        Manage your products, referral network, earnings, and business growth from one professional dashboard.

      </p>

    </div>

    <div>

      <div className="rounded-2xl border border-blue-200 bg-white px-6 py-4 text-center shadow-md">

        <div className="text-3xl">

          🤝

        </div>

        <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-blue-600">

          Account Type

        </p>

        <p className="mt-1 text-lg font-bold text-gray-900">

          Business Partner

        </p>

      </div>

    </div>

  </div>

</div>

<div className="grid md:grid-cols-3 gap-6">

<div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

<p className="text-gray-500 text-sm">

💰 Total Earnings

</p>

<h2 className="text-4xl font-black mt-4 tracking-tight">

PKR {earnings+sales}

</h2>

</div>

<div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

<p className="text-gray-500 text-sm">

👥 Referral Rewards

</p>

<h2 className="text-4xl font-black mt-4 tracking-tight">

PKR {earnings}

</h2>

</div>

<div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

<p className="text-gray-500 text-sm">

📦 Product Profit

</p>

<h2 className="text-4xl font-black mt-4 tracking-tight">

PKR {sales}

</h2>

<p className="mt-3 text-sm text-gray-500">

Delivered Orders: {orderCount}

</p>

</div>

</div>

<div className="mt-16">

<div className="mb-8">

<p className="text-blue-600 font-semibold uppercase tracking-wider">

Business Center

</p>

<h2 className="text-3xl font-black mt-2">

Manage Your Business

</h2>

<p className="text-gray-600 mt-3">

Access all your business tools from one place.

</p>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

<a
href="/products"
className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500 transition-all duration-300"
>

<div className="text-5xl">

📦

</div>

<h3 className="text-2xl font-bold mt-6">

Browse Products

</h3>

<p className="mt-4 text-gray-600 leading-7">

Explore premium products and start earning through every sale.

</p>

<div className="mt-8 text-blue-600 font-semibold">

Explore →

</div>

</a>

<a
href="/invite"
className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
>

<div className="text-5xl">

👥

</div>

<h3 className="text-2xl font-bold mt-6">

Invite Partners

</h3>

<p className="mt-4 text-gray-600 leading-7">

Grow your referral network and increase your passive income.

</p>

<div className="mt-8 text-blue-600 font-semibold">

Invite →

</div>

</a>

<a
href="/orders"
className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
>

<div className="text-5xl">

📋

</div>

<h3 className="text-2xl font-bold mt-6">

My Orders

</h3>

<p className="mt-4 text-gray-600 leading-7">

Track every order and monitor delivery progress.

</p>

<div className="mt-8 text-blue-600 font-semibold">

View →

</div>

</a>

<a
href="/analytics"
className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
>

<div className="text-5xl">

📈

</div>

<h3 className="text-2xl font-bold mt-6">

Analytics

</h3>

<p className="mt-4 text-gray-600 leading-7">

Analyze your performance and monitor business growth.

</p>

<div className="mt-8 text-blue-600 font-semibold">

Open →

</div>

</a>

</div>

</div>

<section className="mt-16">

<h2 className="text-2xl font-bold mb-6">

Business Summary

</h2>

<div className="grid md:grid-cols-2 gap-6">

<div className="bg-white border rounded-3xl p-8 shadow-sm">

<h3 className="text-lg font-bold">

📈 Your Progress

</h3>

<p className="text-gray-600 mt-4 leading-7">

Keep growing your business by sharing quality products and inviting new Business Partners. Every successful referral and completed order increases your earnings.

</p>

</div>

<div className="bg-white border rounded-3xl p-8 shadow-sm">

<h3 className="text-lg font-bold">

🎯 Next Goal

</h3>

<p className="text-gray-600 mt-4 leading-7">

Increase your product sales, expand your referral network and build a consistent monthly income through Kamyab Hub.

</p>

</div>

</div>

</section>

</main>

}

</AuthGuard>

);

}