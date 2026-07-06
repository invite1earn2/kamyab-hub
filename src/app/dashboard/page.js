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
const [availableSpins,setAvailableSpins]=useState(0);
const [rewardPoints,setRewardPoints]=useState(0);
const [userName,setUserName]=useState("");

useEffect(()=>{

async function load(){

const userEmail=
localStorage.getItem("user_email");

const { data:user }=
await supabase
.from("users")
.select("name,subscribed,earnings_balance,lifetime_earnings,total_referrals,reward_points")
.eq("email",userEmail)
.single();
console.log("Dashboard User:", user);

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

setRewardPoints(

Number(user.reward_points||0)

);
setUserName(

user.name || "Business Partner"

);

setSales(total);

setOrderCount(
(data||[]).length
);

const { data: spin } =
await supabase

.from("user_spin_status")

.select("available_spins")

.eq(
"user_email",
userEmail
)

.single();

setAvailableSpins(
Number(
spin?.available_spins || 0
)
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

<div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 p-6 text-white shadow-2xl">

<div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

<div className="relative z-10">

<div className="flex items-start justify-between">

<div>

<p className="text-sm text-white/80">

👋 Welcome Back

</p>

<h1 className="mt-2 text-3xl font-black">

{userName}

</h1>

<p className="mt-1 text-white/80">

Business Partner

</p>

</div>

<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur-xl">

🤝

</div>

</div>

<div className="mt-6 grid grid-cols-2 gap-3">

<div className="rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-xl">

<div className="text-xs text-white/70">

🎡 Available Spins

</div>

<div className="mt-2 text-3xl font-black">

{availableSpins}

</div>

</div>

<div className="rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-xl">

<div className="text-xs text-white/70">

🪙 Reward Points

</div>

<div className="mt-2 text-3xl font-black">

{rewardPoints}

</div>

</div>

</div>

</div>

</div>

<div className="grid grid-cols-2 gap-3 md:gap-5">

<div className="relative overflow-hidden rounded-3xl border border-green-200/40 bg-white/70 backdrop-blur-xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95">

<div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-transparent to-transparent"></div>

<div className="relative z-10 flex items-start justify-between">

<div>

<p className="text-xs font-semibold uppercase tracking-wider text-green-700">

Available Balance

</p>

<h2 className="mt-2 text-3xl font-black text-gray-900">

PKR {balance}

</h2>

<p className="mt-3 text-xs font-semibold text-green-600">

Live Wallet Balance

</p>

</div>

<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-3xl shadow-lg">

💰

</div>

</div>

</div>

<div className="relative overflow-hidden rounded-3xl border border-blue-200/40 bg-white/70 backdrop-blur-xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95">

<div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-transparent"></div>

<div className="relative z-10 flex items-start justify-between">

<div>

<p className="text-xs font-semibold uppercase tracking-wider text-blue-700">

Successful Referrals

</p>

<h2 className="mt-2 text-3xl font-black text-gray-900">

{referrals}

</h2>

<p className="mt-3 text-xs font-semibold text-blue-600">

Business Partners Joined

</p>

</div>

<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl shadow-lg">

👥

</div>

</div>

</div>

 <div className="relative overflow-hidden rounded-3xl border border-purple-200/40 bg-white/70 backdrop-blur-xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95">

<div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-transparent to-transparent"></div>

<div className="relative z-10 flex items-start justify-between">

<div>

<p className="text-xs font-semibold uppercase tracking-wider text-purple-700">

Spin Rewards

</p>

<h2 className="mt-2 text-3xl font-black text-gray-900">

{rewardPoints}

</h2>

<p className="mt-3 text-xs font-semibold text-purple-600">

Kamyab Reward Points

</p>

</div>

<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-3xl shadow-lg">

🎡

</div>

</div>

</div>

<div className="relative overflow-hidden rounded-3xl border border-orange-200/40 bg-white/70 backdrop-blur-xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95">

<div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-transparent"></div>

<div className="relative z-10 flex items-start justify-between">

<div>

<p className="text-xs font-semibold uppercase tracking-wider text-orange-700">

Delivered Orders

</p>

<h2 className="mt-2 text-3xl font-black text-gray-900">

{orderCount}

</h2>

<p className="mt-3 text-xs font-semibold text-orange-600">

Completed Orders

</p>

</div>

<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-3xl shadow-lg">

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
<a
  href="/lucky-spin"
  className="group rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-600 to-pink-600 p-8 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
>

  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-4xl">

    🎡

  </div>

  <h3 className="mt-6 text-2xl font-bold">

    Kamyab Lucky Spin

  </h3>

  <p className="mt-4 leading-7 text-purple-100">

    Spin every day and win exciting rewards. Invite successful Business Partners to unlock more spins.

  </p>

  <div className="mt-6">

    <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold">

      Available Spins: {availableSpins}

    </span>

  </div>

  <div className="mt-8 inline-flex items-center font-semibold">

    Spin Now

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