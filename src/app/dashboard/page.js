"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import AuthGuard from "../../components/authguard";
import { checkOwner } from "../../services/owner";

export default function Dashboard(){

const [loading,setLoading]=useState(true);
const [balance,setBalance]=useState(0);
const [lifetime,setLifetime]=useState(0);
const [referrals,setReferrals]=useState(0);
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
.select("subscribed,earnings_balance,lifetime_earnings,total_referrals")
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

setBalance(
Number(user.earnings_balance||0)
);

setLifetime(
Number(user.lifetime_earnings||0)
);

setReferrals(
Number(user.total_referrals||0)
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

Preparing your business dashboard...

</p>

</div>

</div>

:

<main className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">

<div className="mb-12 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 p-6 md:p-10 shadow-sm">

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

<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

<div className="rounded-3xl border border-green-100 bg-white p-7 shadow-sm hover:shadow-2xl
hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">

<div className="flex items-start justify-between">

<div>

<p className="text-sm font-semibold uppercase tracking-wider text-gray-500">

Available Balance

</p>

<h2 className="mt-3 text-4xl font-black text-gray-900">

PKR {balance}
</h2>

<p className="mt-3 text-sm text-green-600 font-semibold">

▲ Your total business income

</p>

</div>

<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl">

💰

</div>

</div>

</div>

<div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm hover:shadow-2xl
hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">

  <div className="flex items-start justify-between">

    <div>

      <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">

        Lifetime Earnings

      </p>

      <h2 className="mt-3 text-4xl font-black text-gray-900">

       PKR {lifetime}

      </h2>

      <p className="mt-3 text-sm font-semibold text-blue-600">

        {referrals} Successful Referrals
      </p>

    </div>

    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">

      👥

    </div>

  </div>

</div>

<div className="rounded-3xl border border-amber-100 bg-white p-7 shadow-sm hover:shadow-2xl
hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300">

  <div className="flex items-start justify-between">

    <div>

      <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">

        Product Profit

      </p>

      <h2 className="mt-3 text-4xl font-black text-gray-900">

        PKR {sales}

      </h2>

      <p className="mt-3 text-sm font-semibold text-amber-600">

        {orderCount} Delivered Orders

      </p>

    </div>

    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-3xl">

      📦

    </div>

  </div>

</div>

</div>

<div className="mt-20">

<div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

  <div>

    <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

      🚀 Quick Actions

    </span>

    <h2 className="mt-5 text-3xl md:text-4xl font-black text-gray-900">

      Manage Your Business

    </h2>

    <p className="mt-3 max-w-2xl text-gray-700 leading-7">

      Everything you need to sell products, grow referrals, track orders and monitor your business from one professional dashboard.

    </p>

  </div>

</div>

<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

<a
  href="/products"
  className="group rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
>

  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-4xl">

    📦

  </div>

  <h3 className="mt-6 text-2xl font-bold">

    Browse Products

  </h3>

  <p className="mt-4 leading-7 text-blue-100">

    Explore premium products, earn profits from every sale and grow your business.

  </p>

  <div className="mt-8 inline-flex items-center font-semibold">

    Explore Products

    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">

      →

    </span>

  </div>

</a>

<a
  href="/invite"
  className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl
hover:scale-[1.02]"
>

  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-4xl">

    👥

  </div>

  <h3 className="mt-6 text-2xl font-bold text-gray-900">

    Invite Partners

  </h3>

  <p className="mt-4 leading-7 text-gray-600">

    Grow your referral network and build a consistent passive income.

  </p>

  <div className="mt-8 inline-flex items-center font-semibold text-blue-600">

    Invite Now

    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">

      →

    </span>

  </div>

</a>

<a
  href="/orders"
  className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-2xl
hover:scale-[1.02]"
>

  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-4xl">

    📋

  </div>

  <h3 className="mt-6 text-2xl font-bold text-gray-900">

    My Orders

  </h3>

  <p className="mt-4 leading-7 text-gray-600">

    Monitor every order and stay updated with delivery progress.

  </p>

  <div className="mt-8 inline-flex items-center font-semibold text-green-600">

    View Orders

    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">

      →

    </span>

  </div>

</a>

<a
  href="/analytics"
  className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-2xl
hover:scale-[1.02]"
>

  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-4xl">

    📈

  </div>

  <h3 className="mt-6 text-2xl font-bold text-gray-900">

    Analytics

  </h3>

  <p className="mt-4 leading-7 text-gray-600">

    Analyze your business performance and discover new growth opportunities.

  </p>

  <div className="mt-8 inline-flex items-center font-semibold text-amber-600">

    Open Analytics

    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">

      →

    </span>

  </div>

</a>
</div>

</div>

<section className="mt-20">

<div className="mb-8">

<span className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

📊 Business Insights

</span>

<h2 className="mt-5 text-3xl font-black text-gray-900">

Your Growth Overview

</h2>

<p className="mt-3 max-w-2xl text-gray-700 leading-7">

Stay focused on growing your business through product sales, referral rewards and consistent customer engagement.

</p>

</div>

<div className="grid gap-6 lg:grid-cols-2">

<div className="rounded-3xl border border-green-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
hover:scale-[1.02]">

  <div className="flex items-center gap-4">

    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl">

      📈

    </div>

    <div>

      <h3 className="text-xl font-bold text-gray-900">

        Your Progress

      </h3>

      <p className="text-sm font-semibold text-green-600">

        Keep Building Momentum

      </p>

    </div>

  </div>

  <p className="mt-6 leading-7 text-gray-600">

    Continue promoting premium products and inviting new Business Partners. Every successful sale and referral strengthens your long-term income.

  </p>

</div>

<div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
hover:scale-[1.02]">

  <div className="flex items-center gap-4">

    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">

      🎯

    </div>

    <div>

      <h3 className="text-xl font-bold text-gray-900">

        Next Goal

      </h3>

      <p className="text-sm font-semibold text-blue-600">

        Grow Every Month

      </p>

    </div>

  </div>

  <p className="mt-6 leading-7 text-gray-600">

    Expand your referral network, increase product sales and create a consistent monthly income through Kamyab Hub.

  </p>

</div>

</div>

</section>

</main>

}

</AuthGuard>

);

}