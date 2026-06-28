"use client";

import {
useEffect,
useState
}
from "react";

import supabase
from "../../lib/supabase";

import {
checkOwner
}
from "../../services/owner";

export default function Analytics(){

const [
stats,
setStats
]=
useState(null);

const [
ownerMode,
setOwnerMode
]=
useState(false);

useEffect(()=>{

load();

},[]);

async function load(){

const email=
localStorage.getItem(
"user_email"
);

const owner=

checkOwner();

setOwnerMode(owner);

if(owner){

const {count:totalPartners}=

await supabase

.from("users")

.select("*",{
count:"exact",
head:true
});

const {count:activeSubscribers}=

await supabase

.from("users")

.select("*",{
count:"exact",
head:true
})

.eq("subscribed",true);

const {count:totalOrders}=

await supabase

.from("orders")

.select("*",{
count:"exact",
head:true
});

const {data:withdrawals}=

await supabase

.from("withdrawals")

.select("amount,status");

const pendingWithdrawals=

(withdrawals||[])
.filter(item=>item.status==="pending")
.length;

const approvedWithdrawals=

(withdrawals||[])
.filter(item=>item.status==="approved")
.length;

const totalPaid=

(withdrawals||[])
.filter(item=>item.status==="approved")
.reduce(
(total,item)=>
total+
Number(item.amount||0),
0
);

const outstandingLiability=

(withdrawals||[])
.filter(item=>item.status==="pending")
.reduce(
(total,item)=>
total+
Number(item.amount||0),
0
);

const {count:totalProducts}=

await supabase

.from("products")

.select("*",{
count:"exact",
head:true
});

setStats({

totalPartners,

activeSubscribers,

totalOrders,

pendingWithdrawals,

approvedWithdrawals,

totalPaid,

outstandingLiability,

totalProducts

});

return;

}

if(
!owner
){

const {
data:user
}=
await supabase
.from(
"users"
)
.select(
"subscribed"
)
.eq(
"email",
email
)
.single();

if(
!user?.subscribed
){

window.location.href=
"/subscribe";

return;

}

}

const {
data:currentUser
}=
await supabase
.from("users")
.select(
"referral_code,earnings_balance"
)
.eq(
"email",
email
)
.single();

const {
count:invitedPartners
}=
await supabase
.from("users")
.select("*",{
count:"exact",
head:true
})
.eq(
"referred_by",
currentUser.referral_code
);

const {
data:orders
}=
await supabase
.from("orders")
.select(
"profit,status"
)
.eq(
"user_email",
email
);

const totalOrders=

(orders||[]).length;

const productProfit=

(orders||[])
.filter(
item=>item.status==="delivered"
)
.reduce(
(total,item)=>
total+
Number(item.profit||0),
0
);

const referralProfit=

Number(
currentUser.earnings_balance||0
);

const totalEarnings=

productProfit+
referralProfit;

setStats({

invitedPartners,

totalOrders,

productProfit,

referralProfit,

totalEarnings

});

}

if(
!stats
){

return(

<div className="min-h-[70vh] flex items-center justify-center">

<div className="text-center">

<div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>

<p className="mt-4 text-gray-600">

Loading Analytics...

</p>

</div>

</div>

);

}

return(

<main className="max-w-7xl mx-auto px-6 py-12">

{
ownerMode
?

<>

<div className="mb-10">

<p className="text-blue-600 font-semibold uppercase tracking-wider">

Executive Analytics

</p>

<h1 className="text-5xl font-black mt-2">

Company Performance

</h1>

<p className="text-gray-600 mt-4 max-w-3xl leading-7">

Monitor the overall health of Kamyab Hub including partners, subscriptions, orders, products and withdrawal activity.

</p>

</div>

<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

<div className="rounded-3xl bg-white border p-7 shadow-sm hover:shadow-xl transition">

<div className="text-4xl">👥</div>

<p className="mt-4 text-gray-500">

Business Partners

</p>

<h2 className="mt-2 text-4xl font-black">

{stats.totalPartners}

</h2>

</div>

<div className="rounded-3xl bg-white border p-7 shadow-sm hover:shadow-xl transition">

<div className="text-4xl">💳</div>

<p className="mt-4 text-gray-500">

Active Subscribers

</p>

<h2 className="mt-2 text-4xl font-black text-green-600">

{stats.activeSubscribers}

</h2>

</div>

<div className="rounded-3xl bg-white border p-7 shadow-sm hover:shadow-xl transition">

<div className="text-4xl">📦</div>

<p className="mt-4 text-gray-500">

Total Orders

</p>

<h2 className="mt-2 text-4xl font-black">

{stats.totalOrders}

</h2>

</div>

<div className="rounded-3xl bg-black text-white p-7 shadow-xl">

<div className="text-4xl">🛍️</div>

<p className="mt-4 text-gray-300">

Products

</p>

<h2 className="mt-2 text-4xl font-black">

{stats.totalProducts}

</h2>

</div>

</div>

<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-8">

<div className="rounded-3xl border bg-white p-7 shadow-sm">

<div className="text-4xl">

⏳

</div>

<p className="mt-4 text-gray-500">

Pending Withdrawals

</p>

<h2 className="mt-2 text-4xl font-black text-yellow-600">

{stats.pendingWithdrawals}

</h2>

</div>

<div className="rounded-3xl border bg-white p-7 shadow-sm">

<div className="text-4xl">

✅

</div>

<p className="mt-4 text-gray-500">

Approved Withdrawals

</p>

<h2 className="mt-2 text-4xl font-black text-green-600">

{stats.approvedWithdrawals}

</h2>

</div>

<div className="rounded-3xl border bg-white p-7 shadow-sm">

<div className="text-4xl">

💸

</div>

<p className="mt-4 text-gray-500">

Outstanding Liability

</p>

<h2 className="mt-2 text-4xl font-black text-red-600">

PKR {stats.outstandingLiability}

</h2>

</div>

<div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-7 shadow-xl">

<div className="text-4xl">

💰

</div>

<p className="mt-4 text-blue-100">

Total Paid

</p>

<h2 className="mt-2 text-4xl font-black">

PKR {stats.totalPaid}

</h2>

</div>

</div>

</>

:

<>

<div className="mb-10">

<p className="text-blue-600 font-semibold uppercase tracking-wider">

Business Analytics

</p>

<h1 className="text-5xl font-black mt-2">

Performance Overview

</h1>

<p className="text-gray-600 mt-4 max-w-2xl leading-7">

Monitor your business growth, orders and earnings from one professional dashboard.

</p>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

<div className="bg-white rounded-3xl border shadow-sm p-6 hover:shadow-2xl transition-all duration-300">

<div className="text-4xl">

👥

</div>

<p className="text-gray-500 text-sm mt-4">

My Invited Partners

</p>

<h2 className="text-4xl font-black mt-3">

{stats.invitedPartners}

</h2>

</div>

<div className="bg-white rounded-3xl border shadow-sm p-6 hover:shadow-2xl transition-all duration-300">

<div className="text-4xl">

📦

</div>

<p className="text-gray-500 text-sm mt-4">

My Total Orders

</p>

<h2 className="text-4xl font-black mt-3">

{stats.totalOrders}

</h2>

</div>

<div className="bg-white rounded-3xl border shadow-sm p-6 hover:shadow-2xl transition-all duration-300">

<div className="text-4xl">

💰

</div>

<p className="text-gray-500 text-sm mt-4">

Referral Earnings

</p>

<h2 className="text-4xl font-black mt-3 text-green-600">

PKR {stats.referralProfit}

</h2>

</div>

<div className="bg-white rounded-3xl border shadow-sm p-6 hover:shadow-2xl transition-all duration-300">

<div className="text-4xl">

🛍️

</div>

<p className="text-gray-500 text-sm mt-4">

Product Profit

</p>

<h2 className="text-4xl font-black mt-3 text-green-600">

PKR {stats.productProfit}

</h2>

</div>

<div className="bg-black text-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">

<div className="text-4xl">

🏆

</div>

<p className="text-gray-300 text-sm mt-4">

Total Earnings

</p>

<h2 className="text-4xl font-black mt-3">

PKR {stats.totalEarnings}

</h2>

</div>

</div>

<section className="mt-16">

<div className="mb-8">

<p className="text-blue-600 font-semibold uppercase tracking-wider">

Business Insights

</p>

<h2 className="text-3xl font-black mt-2">

Keep Growing

</h2>

<p className="text-gray-600 mt-3">

Small improvements every day lead to long-term business success.

</p>

</div>

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

<div className="text-5xl">

🚀

</div>

<h3 className="text-2xl font-bold mt-5">

Growth Tip

</h3>

<p className="text-gray-600 mt-4 leading-7">

Share your referral link consistently and introduce quality products to grow your monthly income.

</p>

</div>

<div className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

<div className="text-5xl">

🎯

</div>

<h3 className="text-2xl font-bold mt-5">

Next Milestone

</h3>

<p className="text-gray-600 mt-4 leading-7">

Increase your completed orders and referral network to unlock higher earnings.

</p>

</div>

<div className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

<div className="text-5xl">

🏆

</div>

<h3 className="text-2xl font-bold mt-5">

Performance

</h3>

<p className="text-gray-600 mt-4 leading-7">

Stay active, keep sharing, and build a sustainable business through Kamyab Hub.

</p>

</div>

</div>

</section>

</>

</main>

);

}