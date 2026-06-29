"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export default function Home(){

const [reviews,setReviews]=useState([]);

useEffect(()=>{

loadReviews();

},[]);

async function loadReviews(){

const { data }=

await supabase

.from("community_reviews")

.select("*")

.eq("status","active")

.order("featured",{ascending:false})

.order("display_order",{ascending:true});

setReviews(data||[]);

}

return(

<main className="min-h-screen bg-gray-50">

{/* Announcement Bar */}

<div className="bg-black text-white overflow-hidden border-b border-gray-800">

  <div className="flex whitespace-nowrap animate-marquee">

    <div className="flex shrink-0 items-center py-3">

      <span className="px-8 font-semibold text-sm md:text-base">
        🎉 Har Dost Ko Invite Karein Aur PKR 300 Kamayein • 📦 Products Sell Karein Aur Munafa Kamayein • 💰 Apna Business Grow Karein
      </span>

      <span className="px-8 font-semibold text-sm md:text-base">
        🎉 Har Dost Ko Invite Karein Aur PKR 300 Kamayein • 📦 Products Sell Karein Aur Munafa Kamayein • 💰 Apna Business Grow Karein
      </span>

    </div>

    <div className="flex shrink-0 items-center py-3">

      <span className="px-8 font-semibold text-sm md:text-base">
        🎉 Har Dost Ko Invite Karein Aur PKR 300 Kamayein • 📦 Products Sell Karein Aur Munafa Kamayein • 💰 Apna Business Grow Karein
      </span>

      <span className="px-8 font-semibold text-sm md:text-base">
        🎉 Har Dost Ko Invite Karein Aur PKR 300 Kamayein • 📦 Products Sell Karein Aur Munafa Kamayein • 💰 Apna Business Grow Karein
      </span>

    </div>

  </div>

</div>

{/* Hero Section */}

<section className="max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-24">

<div className="max-w-5xl mx-auto text-center">

<div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-700 px-5 py-2 border border-blue-200 shadow-sm">

<span className="text-lg">

🚀

</span>

<p className="font-semibold text-sm md:text-base">

Pakistan's Smart Business Partner Platform

</p>

</div>

<h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900">

Kamyab Hub

</h1>

<p className="mt-4 text-xl md:text-2xl font-bold text-blue-600">

Har Qadam Kamyabi Ki Taraf

</p>

<h2 className="mt-8 text-3xl md:text-5xl font-black text-gray-900 leading-tight">

Build Your Business

<br />

<span className="text-blue-600">

Grow Your Income

</span>

</h2>

<p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl leading-8 text-gray-700">

Join Pakistan's growing

<span className="font-bold text-gray-900">

 Business Partner Network

</span>

and build sustainable income through

quality products,

referral rewards,

and a trusted business platform.

</p>

<div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

<a

href="/signup"

className="floating-btn rounded-2xl bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-bold shadow-lg transition-all duration-300"

>

Become a Business Partner

</a>

<a
  href="/invite"
  className="floating-btn group rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 font-bold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
>

  🎉 Build Your Team & Earn

  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">

    →

  </span>

</a>

<a
  href="/products"
  className="floating-btn group rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 font-bold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
>

  🛍 Sell Products & Earn

  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">

    →

  </span>

</a>
</div>

<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">

<div className="rounded-2xl bg-white shadow-md border border-gray-100 p-5">

<div className="text-3xl">

🤝

</div>

<p className="mt-3 font-semibold text-gray-900">

Trusted Platform

</p>

</div>

<div className="rounded-2xl bg-white shadow-md border border-gray-100 p-5">

<div className="text-3xl">

📦

</div>

<p className="mt-3 font-semibold text-gray-900">

No Inventory

</p>

</div>

<div className="rounded-2xl bg-white shadow-md border border-gray-100 p-5">

<div className="text-3xl">

🚚

</div>

<p className="mt-3 font-semibold text-gray-900">

Delivery Managed

</p>

</div>

<div className="rounded-2xl bg-white shadow-md border border-gray-100 p-5">

<div className="text-3xl">

💰

</div>

<p className="mt-3 font-semibold text-gray-900">

Referral Rewards

</p>

</div>

</div>

</div>

</section>

{/* Features */}

<section className="max-w-7xl mx-auto px-6 py-20">

<h2 className="text-5xl md:text-5xl font-bold text-center text-gray-900">

Why Choose Kamyab Hub?

</h2>

<p className="text-center text-xl text-gray-700 mt-6 max-w-3xl mx-auto">

Everything you need to start, manage and grow your business from one trusted platform.

</p>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

<div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">

<div className="text-5xl">

🤝

</div>

<h3 className="text-2xl font-bold text-gray-900 mt-5">

Become a Business Partner

</h3>

<p className="text-gray-600 mt-4 leading-7">

Join Pakistan's growing Business Partner network and create long-term earning opportunities through product sales and referrals.

</p>
</div>

<div className="bg-white rounded-3xl border border-gray-100 p-7 md:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">

<div className="text-5xl">

📦

</div>

<h3 className="text-2xl font-bold text-gray-900 mt-5">

Premium Products

</h3>

<p className="text-gray-600 mt-4">

Promote quality products while we manage inventory and nationwide delivery.

</p>

</div>

<div className="bg-white rounded-3xl border border-gray-100 p-7 md:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">

<div className="text-5xl">

👥

</div>

<h3 className="text-2xl font-bold text-gray-900 mt-5">

Referral Rewards

</h3>

<p className="text-gray-600 mt-4">

Grow your network by inviting Business Partners and earn referral rewards as your community expands.

</p>

</div>

<div className="bg-white rounded-3xl border border-gray-100 p-7 md:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">

<div className="text-5xl">

💰

</div>

<h3 className="text-2xl font-bold text-gray-900 mt-5">

Secure Withdrawals

</h3>

<p className="text-gray-600 mt-4">

Track your earnings and withdraw your income whenever you're ready.

</p>

</div>

</div>

</section>

{/* How It Works */}

<section className="bg-white border-y py-20">

<div className="max-w-6xl mx-auto px-6">

<h2 className="text-5xl md:text-5xl font-bold text-center text-gray-900">

How Kamyab Hub Works

</h2>

<p className="text-center text-xl text-gray-600 mt-6 max-w-3xl mx-auto">

Start your business journey in five simple steps and begin earning with confidence.

</p>

<div className="grid md:grid-cols-5 gap-8 mt-16 text-center">

<div>

<div className="w-16 h-16 mx-auto rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">

01

</div>

<h3 className="text-2xl font-bold text-gray-900 mt-6">

Create Your Account

</h3>

<p className="text-gray-600 mt-3">

Register in just a few minutes and join Kamyab Hub as a Business Partner.

</p>

</div>

<div>

<div className="w-16 h-16 mx-auto rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">

02

</div>

<h3 className="text-2xl font-bold text-gray-900 mt-6">

Activate Membership

</h3>

<p className="text-gray-600 mt-3">

Complete your membership activation to unlock products, referrals and earning opportunities.

</p>

</div>

<div>

<div className="w-16 h-16 mx-auto rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">

03

</div>

<h3 className="text-2xl font-bold text-gray-900 mt-6">

Promote Products

</h3>

<p className="text-gray-600 mt-3">

Share quality products with your customers while Kamyab Hub manages fulfillment and delivery.

</p>

</div>

<div>

<div className="w-16 h-16 mx-auto rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">

04

</div>

<h3 className="text-2xl font-bold text-gray-900 mt-6">

Invite Business Partners

</h3>

<p className="text-gray-600 mt-3">

Expand your network by inviting new Business Partners and earn referral rewards.

</p>

</div>

<div>

<div className="w-16 h-16 mx-auto rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">

05

</div>

<h3 className="text-2xl font-bold text-gray-900 mt-6">

Earn & Withdraw

</h3>

<p className="text-gray-600 mt-3">

Track your earnings and request secure withdrawals directly from your Business Partner dashboard.

</p>

</div>

</div>

</div>

</section>

{/* Community Member Experiences */}

<section className="max-w-7xl mx-auto px-6 py-16 overflow-hidden">

<div className="text-center mb-10">

<h2 className="text-4xl md:text-5xl font-bold">

💬 Community Member Experiences

</h2>

<p className="mt-4 text-gray-600">

Real thoughts from our growing community.

</p>

</div>

<div className="overflow-hidden">

<div className="flex gap-5 animate-marquee">

{

[...reviews,...reviews].map((item,index)=>(

<div
key={index}
className="min-w-[300px] max-w-[300px] rounded-3xl border border-gray-200 bg-white p-6 shadow-md hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
>

<div className="flex items-center gap-3">

<div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

{
item.name
?.split(" ")
.map(word=>word[0])
.join("")
.substring(0,2)
.toUpperCase()
}

</div>

<div>

<h3 className="font-bold text-gray-900">

{item.name}

</h3>

<p className="text-sm text-gray-500">

{item.city}

</p>

</div>

</div>

<div className="mt-4 text-yellow-500">

{"⭐".repeat(item.rating)}

</div>

<p className="mt-4 text-gray-700 leading-7 break-words">

"{item.review}"

</p>

</div>

))

}

</div>

</div>

</section>
<section className="py-8">

<div className="max-w-6xl mx-auto px-6">

<div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 flex flex-col md:flex-row items-center justify-between gap-5">

<div>

<h3 className="text-2xl font-bold">

✍️ Share Your Experience

</h3>

<p className="mt-2 text-gray-600">

Help other Business Partners by sharing your experience with Kamyab Hub.

</p>

</div>

<a
href="/add-review"
className="floating-btn rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 transition"
>

⭐ Write a Review

</a>

</div>

</div>

</section>

{/* Why Business Partners Trust Kamyab Hub */}

<section className="max-w-7xl mx-auto px-6 py-24">

<div className="text-center">

<h2 className="text-5xl md:text-5xl font-bold text-gray-900">

Why Business Partners Trust Kamyab Hub

</h2>

<p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">

We're committed to helping every Business Partner grow with confidence through a transparent, reliable and professional platform.

</p>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

<div className="bg-white border rounded-3xl p-7 md:p-8 shadow-sm">

<h3 className="text-2xl font-bold text-gray-900">

💼 Professional Business Platform

</h3>

<p className="mt-4 text-gray-600">

Everything you need to manage your business from one secure dashboard.

</p>

</div>

<div className="bg-white border rounded-3xl p-7 md:p-8 shadow-sm">

<h3 className="text-2xl font-bold text-gray-900">

🚚 Nationwide Delivery

</h3>

<p className="mt-4 text-gray-600">

We manage product delivery so you can focus on selling and growing your customer network.

</p>

</div>

<div className="bg-white border rounded-3xl p-7 md:p-8 shadow-sm">

<h3 className="text-2xl font-bold text-gray-900">

🤝 Transparent Referral Rewards

</h3>

<p className="mt-4 text-gray-600">

Earn referral commissions through a clear and transparent reward system.

</p>

</div>

<div className="bg-white border rounded-3xl p-7 md:p-8 shadow-sm">

<h3 className="text-2xl font-bold text-gray-900">

📦 Quality Products

</h3>

<p className="mt-4 text-gray-600">

Promote carefully selected products that help build long-term customer trust.

</p>

</div>

<div className="bg-white border rounded-3xl p-7 md:p-8 shadow-sm">

<h3 className="text-2xl font-bold text-gray-900">

💳 Secure Earnings

</h3>

<p className="mt-4 text-gray-600">

Monitor your earnings and request withdrawals directly through your dashboard.

</p>

</div>

<div className="bg-white border rounded-3xl p-7 md:p-8 shadow-sm">

<h3 className="text-2xl font-bold text-gray-900">

📈 Long-Term Growth

</h3>

<p className="mt-4 text-gray-600">

Build a sustainable business with products, referrals and continuous growth opportunities.

</p>

</div>

</div>

</section>

{/* CTA */}

<section className="max-w-6xl mx-auto px-6 py-24">

  <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl text-white p-12 md:p-16 text-center shadow-2xl">

    <h2 className="text-5xl md:text-6xl font-bold leading-tight">

      Your Journey Towards Success
      <br />
      Starts Today

    </h2>

    <p className="text-xl mt-8 text-gray-200 max-w-3xl mx-auto leading-8">

      Become a Business Partner and build your future with quality products,
      referral rewards and a trusted business platform.

    </p>

    <a
      href="/signup"
      className="inline-block mt-10 px-10 py-4 rounded-xl bg-white text-black font-bold hover:scale-105 transition-all duration-500"
    >

      Become a Business Partner

    </a>

  </div>

</section>

{/* Footer */}

<footer className="bg-gray-900 text-gray-300 mt-10">

<div className="max-w-7xl mx-auto px-6 py-14">

<div className="grid md:grid-cols-3 gap-10">

{/* Brand */}

<div>

<h2 className="text-3xl font-bold text-white">

Kamyab Hub

</h2>

<p className="mt-3 text-blue-400 font-semibold">

Har Qadam Kamyabi Ki Taraf

</p>

<p className="mt-6 leading-7">

Pakistan's Smart Business Partner Platform helping people grow through quality products, referral rewards and trusted business opportunities.

</p>

</div>

{/* Quick Links */}

<div>

<h3 className="text-2xl font-bold text-gray-900 text-white">

Quick Links

</h3>

<div className="flex flex-col gap-3 mt-6">

<a href="/" className="hover:text-white">

Home

</a>

<a href="/signup" className="hover:text-white">

Become a Business Partner

</a>

<a href="/login" className="hover:text-white">

Login

</a>

<a href="/products" className="hover:text-white">

Products

</a>

</div>

</div>

{/* Support */}

<div>

<h3 className="text-2xl font-bold text-gray-900 text-white">

Support

</h3>

<div className="flex flex-col gap-3 mt-6">

<a href="#" className="hover:text-white">

Privacy Policy

</a>

<a href="#" className="hover:text-white">

Terms & Conditions

</a>

<a href="#" className="hover:text-white">

Contact Us

</a>

</div>

</div>

</div>

<hr className="border-gray-700 my-10" />

<div className="flex flex-col md:flex-row justify-between items-center text-sm">

<p>

© 2026 Kamyab Hub. All Rights Reserved.

</p>

<p className="mt-4 md:mt-0">

Built for Pakistan's Future Business Partners 🇵🇰

</p>

</div>

</div>

</footer>

</main>

);

}