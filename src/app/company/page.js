"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { checkOwner } from "../../services/owner";

export default function OwnerDashboard(){

const [stats,setStats]=useState(null);
const [platform,setPlatform]=useState(null);
const [activities,setActivities]=useState([]);

useEffect(()=>{

load();

},[]);

async function load(){

if(!checkOwner()){

alert("Access Denied");

window.location.href="/dashboard";

return;

}

const { count:userCount }=
await supabase
.from("users")
.select("*",{
count:"exact",
head:true
});

const { count:pendingSubscriptions }=
await supabase
.from("subscriptions")
.select("*",{
count:"exact",
head:true
})
.eq("status","pending");

const { count:pendingWithdrawals }=
await supabase
.from("withdrawals")
.select("*",{
count:"exact",
head:true
})
.eq("status","pending");

const { count:totalOrders }=
await supabase
.from("orders")
.select("*",{
count:"exact",
head:true
});

const { data: platformStats }=
await supabase
.from("platform_stats")
.select("*")
.eq("id",1)
.single();

console.log("Platform Stats:", platformStats);
setPlatform(platformStats);

setStats({

userCount,

pendingSubscriptions,

pendingWithdrawals,

totalOrders,

totalRevenue:
platformStats?.total_revenue||0,

totalMembers:
platformStats?.total_members||0

});
const activity=[];

/* Latest Subscriptions */

const {data:subs}=

await supabase

.from("subscriptions")

.select("user_email,status,created_at")

.order("created_at",{ascending:false})

.limit(5);

(subs||[]).forEach(item=>{

activity.push({

icon:"💳",

title:"New Subscription",

description:item.user_email,

time:item.created_at,

action:"/subscriptions"

});

});

/* Latest Orders */

const {data:orders}=

await supabase

.from("orders")

.select("user_email,created_at")

.order("created_at",{ascending:false})

.limit(5);

(orders||[]).forEach(item=>{

activity.push({

icon:"📦",

title:"New Order",

description:item.user_email,

time:item.created_at,

action:"/company-orders"

});

});

/* Latest Withdrawals */

const {data:withdrawals}=

await supabase

.from("withdrawals")

.select("user_email,amount,created_at")

.order("created_at",{ascending:false})

.limit(5);

(withdrawals||[]).forEach(item=>{

activity.push({

icon:"💸",

title:"Withdrawal Request",

description:`${item.user_email} • PKR ${item.amount}`,

time:item.created_at,

action:"/withdrawals"

});

});

/* Sort newest first */

activity.sort(

(a,b)=>

new Date(b.time)-new Date(a.time)

);

setActivities(

activity.slice(0,10)

);

}

if(!stats){

return(

<div className="p-10">

Loading...

</div>

);

}

return(

<main className="p-10">

<div className="mb-12 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-10 text-white shadow-2xl">

<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

<div>

<p className="uppercase tracking-[0.3em] text-blue-200 font-semibold">

Executive Dashboard

</p>

<h1 className="mt-3 text-5xl font-black">

👑 Company Control Center

</h1>

<p className="mt-5 max-w-2xl text-blue-100 leading-8">

Welcome back! Monitor your platform, manage business partners, approve subscriptions, process withdrawals and grow Kamyab Hub from one centralized dashboard.

</p>

</div>

<div className="rounded-3xl bg-white/10 backdrop-blur-md p-6 border border-white/20">

<p className="text-sm uppercase tracking-wider text-blue-200">

Platform Status

</p>

<h2 className="mt-3 text-3xl font-black text-green-300">

🟢 Online

</h2>

<p className="mt-3 text-blue-100">

All core services are operational.

</p>

</div>

</div>

</div>

<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

<div className="rounded-3xl bg-white border border-gray-200 p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

<div className="text-5xl">👥</div>

<p className="mt-5 text-gray-500 font-medium">

Business Partners

</p>

<h2 className="mt-3 text-5xl font-black">

{stats.userCount}

</h2>

<p className="mt-4 text-sm text-green-600 font-semibold">

Platform Members

</p>

</div>

<div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-7 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

<div className="text-5xl">💳</div>

<p className="mt-5 text-blue-100">

Pending Subscriptions

</p>

<h2 className="mt-3 text-5xl font-black">

{stats.pendingSubscriptions}

</h2>

<a
href="/subscriptions"
className="inline-block mt-5 rounded-xl bg-white px-4 py-2 font-semibold text-blue-700 hover:bg-blue-50 transition"
>

Manage →

</a>

</div>

<div className="rounded-3xl bg-white border border-gray-200 p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

<div className="text-5xl">💸</div>

<p className="mt-5 text-gray-500">

Pending Withdrawals

</p>

<h2 className="mt-3 text-5xl font-black text-red-600">

{stats.pendingWithdrawals}

</h2>

<a
href="/withdrawals"
className="inline-block mt-5 font-semibold text-blue-600 hover:text-blue-800"
>

Review →

</a>

</div>

<div className="rounded-3xl bg-black text-white p-7 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

<div className="text-5xl">📦</div>

<p className="mt-5 text-gray-300">

Total Orders

</p>

<h2 className="mt-3 text-5xl font-black">

PKR {stats.totalRevenue}

</h2>

<p className="mt-4 text-sm text-green-400">

Total Subscription Revenue

</p>

</div>

</div>

{/* Management Shortcuts */}

<div className="mt-12">

<h2 className="text-3xl font-bold mb-6">

Management Center

</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

<a
href="/company-products"
className="border rounded-2xl p-6 hover:shadow-lg transition"
>

<div className="text-4xl">

🛍

</div>

<h3 className="text-xl font-bold mt-4">

Product Management

</h3>

<p className="text-gray-600 mt-2">

Add, edit and delete products.

</p>

</a>

<a
href="/subscriptions"
className="border rounded-2xl p-6 hover:shadow-lg transition"
>

<div className="text-4xl">

💳

</div>

<h3 className="text-xl font-bold mt-4">

Subscription Management

</h3>

<p className="text-gray-600 mt-2">

Approve or reject memberships.

</p>

</a>

<a
href="/company-orders"
className="border rounded-2xl p-6 hover:shadow-lg transition"
>

<div className="text-4xl">

📦

</div>

<h3 className="text-xl font-bold mt-4">

Order Management

</h3>

<p className="text-gray-600 mt-2">

Process customer orders.

</p>

</a>

<a
href="/withdrawals"
className="border rounded-2xl p-6 hover:shadow-lg transition"
>

<div className="text-4xl">

💰

</div>

<h3 className="text-xl font-bold mt-4">

Withdrawal Requests

</h3>

<p className="text-gray-600 mt-2">

Approve partner withdrawals.

</p>

</a>

<a
href="/company-reviews"
className="border rounded-2xl p-6 hover:shadow-lg transition"
>

<div className="text-4xl">

💬

</div>

<h3 className="text-xl font-bold mt-4">

Community Reviews

</h3>

<p className="text-gray-600 mt-2">

Manage homepage community member experiences.

</p>

</a>

</div>

</div>

<section className="mt-16">

<div className="mb-8">

<p className="text-blue-600 font-semibold uppercase tracking-wider">

Platform Activity

</p>

<h2 className="text-4xl font-black mt-2">

📢 Live Activity

</h2>

<p className="text-gray-600 mt-3">

Monitor the latest subscriptions, orders and withdrawal requests from across Kamyab Hub.

</p>

</div>

<div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

{

activities.length===0

?

<div className="p-12 text-center text-gray-500">

No recent activity found.

</div>

:

activities.map((item,index)=>(

<div

key={index}

className="flex items-start justify-between gap-6 p-6 border-b last:border-b-0 hover:bg-gray-50 transition"

>

<div className="flex gap-5">

<div className="text-4xl">

{item.icon}

</div>

<div>

<h3 className="text-xl font-bold">

{item.title}

</h3>

<p className="text-gray-600 mt-2">

{item.description}

</p>

<p className="text-sm text-gray-400 mt-3">

{new Date(item.time).toLocaleString()}

</p>

</div>

</div>

<a

href={item.action}

className="self-center rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 transition"

>

Open →

</a>

</div>

))

}

</div>

</section>

</main>

);

}