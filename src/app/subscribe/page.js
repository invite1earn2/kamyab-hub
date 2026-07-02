"use client";

import {
useEffect,
useState
}
from "react";

import supabase from "../../lib/supabase";

export default function Subscribe(){

const [transaction,setTransaction]=useState("");
const [loading,setLoading]=useState(true);
const [copied,setCopied]=useState(false);
useEffect(()=>{

checkSubscription();

},[]);

async function checkSubscription(){

const email=

localStorage.getItem(
"user_email"
);

if(
!email
){

window.location.href=
"/login";

return;

}

const {
data
}

=

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
data?.subscribed
){

alert(
"Your subscription is already active."
);

window.location.href=
"/dashboard";

return;

}

const {
data: pending
}

=

await supabase

.from(
"subscriptions"
)

.select(
"id"
)

.eq(
"user_email",
email
)

.eq(
"status",
"pending"
)

.limit(1);

if(
pending?.length
){

alert(
"Your payment request is already under review."
);

window.location.href=
"/";

return;

}

setLoading(false);

}

async function submit(){

if(
!transaction.trim()
){

alert(
"Please enter transaction ID."
);

return;

}

const email=

localStorage.getItem(
"user_email"
);

if(
!email
){

window.location.href=
"/login";

return;

}

const {
data: existing
}

=

await supabase

.from(
"subscriptions"
)

.select(
"id"
)

.eq(
"transaction_id",
transaction
)

.limit(1);

if(
existing?.length
){

alert(
"Transaction ID already submitted."
);

return;

}

await supabase

.from(
"subscriptions"
)

.insert([{

user_email:
email,

method:
"EasyPaisa",

account_title:
"Ali Khan",

account_number:
"03024567898",

transaction_id:
transaction

}]);

alert(
"Payment request submitted. Waiting for approval."
);

window.location.href=
"/";

}

if(
loading
){

return(

<main className="p-10">

Checking subscription...

</main>

);

}

return(

<main className="p-10">

<div className="max-w-5xl mx-auto text-center">

<div className="inline-block rounded-full bg-red-100 px-5 py-2 text-sm font-bold text-red-600">

🔥 30-Day Launch Offer

</div>

<h1 className="mt-6 text-4xl md:text-5xl font-black text-gray-900">

🚀 Become a Business Partner

</h1>

<p className="mt-5 text-lg text-gray-600">

Start your own online business with Kamyab Hub and unlock multiple earning opportunities.

</p>

<div className="mt-10 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white shadow-xl">

<p className="text-lg opacity-90">

Regular Membership

</p>

<p className="mt-2 text-3xl line-through opacity-70">

PKR 3,000

</p>

<p className="mt-3 text-6xl font-black">

PKR 999

</p>

<p className="mt-3 text-lg">

✅ One-Time Payment • No Monthly Charges

</p>

</div>

</div>

<div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-8">

<div className="rounded-3xl border bg-white p-8 shadow-sm">

<h2 className="text-3xl font-black mb-2">

🎁 What You'll Get

</h2>

<p className="text-gray-500 mb-8">

Everything you need to start and grow your business.

</p>

<div className="grid grid-cols-2 lg:grid-cols-3 gap-5">

<div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl">

<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">

🆔

</div>

<p className="mt-4 font-bold text-gray-900">

Partner ID

</p>

<p className="mt-1 text-sm text-gray-500">

Lifetime Business ID

</p>

</div>

<div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-xl">

<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-2xl">

💰

</div>

<p className="mt-4 font-bold text-gray-900">

Earn PKR 300

</p>

<p className="mt-1 text-sm text-gray-500">

Per Successful Business Partner

</p>

</div>

<div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500 hover:shadow-xl">

<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-2xl">

🛍

</div>

<p className="mt-4 font-bold text-gray-900">

Online Store

</p>

<p className="mt-1 text-sm text-gray-500">

Ready-to-Sell Products

</p>

</div>

<div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-xl">

<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">

📊

</div>

<p className="mt-4 font-bold text-gray-900">

Dashboard

</p>

<p className="mt-1 text-sm text-gray-500">

Track Your Business

</p>

</div>

<div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500 hover:shadow-xl">

<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-2xl">

💸

</div>

<p className="mt-4 font-bold text-gray-900">

Withdraw

</p>

<p className="mt-1 text-sm text-gray-500">

Request Anytime

</p>

</div>

<div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500 hover:shadow-xl">

<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-2xl">

📈

</div>

<p className="mt-4 font-bold text-gray-900">

Analytics

</p>

<p className="mt-1 text-sm text-gray-500">

Real-Time Reports

</p>

</div>

<div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500 hover:shadow-xl">

<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-2xl">

🔔

</div>

<p className="mt-4 font-bold text-gray-900">

Notifications

</p>

<p className="mt-1 text-sm text-gray-500">

Instant Updates

</p>

</div>

<div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-xl">

<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-2xl">

🎧

</div>

<p className="mt-4 font-bold text-gray-900">

Help Center

</p>

<p className="mt-1 text-sm text-gray-500">

Priority Support

</p>

</div>

<div className="rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500 hover:shadow-xl">

<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl">

⭐

</div>

<p className="mt-4 font-bold text-gray-900">

Lifetime Access

</p>

<p className="mt-1 text-sm text-gray-500">

One-Time Membership

</p>

</div>

</div>

</div>

<div className="rounded-3xl border bg-blue-50 p-8 shadow-sm">

<h2 className="text-3xl font-black mb-2">

💳 Payment Details

</h2>

<p className="text-gray-500 mb-8">

Complete your membership by sending the payment below.

</p>

<div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

<div className="flex items-center justify-between">

<div>

<p className="text-sm text-gray-500">

Membership Fee

</p>

<p className="text-3xl font-black text-blue-700">

PKR 999

</p>

</div>

<div className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">

One-Time

</div>

</div>

</div>

<div className="mt-6 space-y-5">

<div className="rounded-xl border p-4">

<p className="text-sm text-gray-500">

Payment Method

</p>

<p className="font-bold text-lg">

EasyPaisa

</p>

</div>

<div className="rounded-xl border p-4">

<p className="text-sm text-gray-500">

Account Title

</p>

<p className="font-bold text-lg">

Ali Khan

</p>

</div>

<div className="rounded-xl border-2 border-blue-600 bg-blue-50 p-5">

<p className="text-sm text-gray-500">

EasyPaisa Number

</p>

<div className="mt-3 flex items-center justify-between gap-4">

<p className="text-3xl font-black tracking-wider text-blue-700">

03024567898

</p>

<button
onClick={()=>{
navigator.clipboard.writeText("03024567898");

setCopied(true);

setTimeout(()=>{

setCopied(false);

},2000);

}}
className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
>

📋 Copy

</button>

</div>

</div>

</div>

</div>

</div>


<div className="max-w-5xl mx-auto mt-12">

<div className="rounded-3xl border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg">

<div className="mb-8">

<span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">

Final Step

</span>

<h2 className="mt-4 text-3xl font-black text-gray-900">

Complete Your Membership

</h2>

<p className="mt-3 max-w-2xl text-gray-600 leading-7">

Complete the final step below to activate your <span className="font-semibold text-blue-700">Business Partner Account</span>.

</p>

</div>
<div className="mt-8 rounded-2xl border bg-white p-6">

<div className="flex items-start gap-4">

<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

1

</div>

<div>

<h3 className="font-bold">

Send Payment

</h3>

<p className="text-gray-600">

Transfer your membership fee to the EasyPaisa account shown above.

</p>

</div>

</div>

<div className="my-5 border-t"></div>

<div className="flex items-start gap-4">

<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

2

</div>

<div>

<h3 className="font-bold">

Enter Your Transaction ID

</h3>

<p className="text-gray-600">

Paste your EasyPaisa Transaction ID below to complete your membership.

</p>

</div>

</div>

</div>
<input
value={transaction}
onChange={(e)=>setTransaction(e.target.value)}
placeholder="EasyPaisa Transaction ID"
className="mt-6 w-full rounded-xl border border-gray-300 bg-white px-5 py-3 text-base shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
/>

<button
onClick={submit}
className="mt-8 w-full rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700"
>

🚀 Verify Payment & Become a Business Partner

</button>

<div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">

<p className="font-semibold text-yellow-800">

📌 Important Before You Submit

</p>

<p className="mt-3 text-gray-700 leading-7">

• Make sure you have already sent <span className="font-bold">PKR 999</span> to the EasyPaisa account above.<br /><br />

• Enter the exact EasyPaisa Transaction ID you received after payment.<br /><br />

• Our verification team usually reviews payments within <span className="font-bold">5–30 minutes</span> during business hours.<br /><br />

• Once approved, your Business Partner account will be activated automatically and you can start inviting partners and selling products.

</p>

</div>

<p className="mt-4 text-center text-sm text-gray-500">

🔒 Your payment will be verified by our team before your membership is activated.

</p>

</div>

</div>

{

copied && (

<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-green-600 px-6 py-3 text-white shadow-2xl">

✅ EasyPaisa number copied successfully!

</div>

)

}

</main>

);

}