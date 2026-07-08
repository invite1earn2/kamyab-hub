"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

export default function Subscribe() {

const [transaction,setTransaction]=useState("");

const [loading,setLoading]=useState(true);

const [copied,setCopied]=useState(false);

const [payment,setPayment]=useState(null);

useEffect(()=>{

checkSubscription();

},[]);

async function checkSubscription(){

const email=

localStorage.getItem("user_email");

if(!email){

window.location.href="/login";

return;

}

const {

data

}=

await supabase

.from("users")

.select("subscribed")

.eq("email",email)

.single();

if(data?.subscribed){

alert(

"Your subscription is already active."

);

window.location.href="/dashboard";

return;

}

const {

data:pending

}=

await supabase

.from("subscriptions")

.select("id")

.eq("user_email",email)

.eq("status","pending")

.limit(1);

if(pending?.length){

alert(

"Your payment request is already under review."

);

window.location.href="/";

return;

}

const {

data:paymentData

}=

await supabase

.from("company_payment_settings")

.select("*")

.eq("id",1)

.single();

setPayment(paymentData);

setLoading(false);

}

async function submit(){

if(!transaction.trim()){

alert(

"Please enter your EasyPaisa Transaction ID."

);

return;

}

const email=

localStorage.getItem("user_email");

if(!email){

window.location.href="/login";

return;

}

const {

data:existing

}=

await supabase

.from("subscriptions")

.select("id")

.eq("transaction_id",transaction)

.limit(1);

if(existing?.length){

alert(

"This Transaction ID has already been submitted."

);

return;

}

await supabase

.from("subscriptions")

.insert([{

user_email:email,

method:

payment?.payment_method||

"EasyPaisa",

account_title:

payment?.account_title||

"",

account_number:

payment?.account_number||

"",

transaction_id:

transaction

}]);

alert(

"Payment submitted successfully.\n\nYour membership will be activated after verification."

);

window.location.href="/";

}

if(loading){

return(

<main className="flex min-h-screen items-center justify-center bg-slate-50">

<div className="text-center">

<div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

<p className="mt-5 font-semibold text-gray-600">

Checking Membership...

</p>

 </div>

 </main>

);

}

return(

<main className="min-h-screen bg-slate-50 px-4 py-6">

<div className="mx-auto max-w-5xl">

<div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-6 text-center text-white shadow-2xl">

<div className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black">

⏳ Membership Verification

</div>

<h1 className="mt-5 text-3xl font-black md:text-5xl">

Complete Your Membership

</h1>

<p className="mt-3 text-blue-100">

Your account has been created successfully. Complete your one-time membership payment to activate your Business Partner account.

</p>

<div className="mt-6 inline-block rounded-3xl bg-white p-6 text-center shadow-xl">

<p className="text-gray-500 line-through">

PKR 3,000

</p>

<p className="mt-2 text-5xl font-black text-blue-700">

PKR 999

</p>

<p className="mt-2 text-sm font-semibold text-green-600">

✅ One-Time Membership

</p>

</div>

</div>

<div className="mt-6 rounded-3xl border border-blue-200 bg-white p-6 shadow-xl">

<div className="flex items-center justify-between">

<div>

<h2 className="text-2xl font-black">

💳 Send Payment

</h2>

<p className="text-gray-500">

Transfer PKR 999 to the account below

</p>

</div>

<div className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">

Secure

</div>

</div>

<div className="mt-6 rounded-2xl border-2 border-blue-600 bg-blue-50 p-6">

<div className="text-sm text-gray-500">

Payment Method

</div>

<div className="mt-1 text-xl font-black">

 {payment?.payment_method}

 </div>

<div className="mt-5 text-sm text-gray-500">

Account Title

</div>

<div className="mt-1 text-lg font-bold">

 {payment?.account_title}

 </div>

<div className="mt-6 text-sm text-gray-500">

EasyPaisa Number

</div>

<div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

<div className="rounded-2xl bg-white px-5 py-4 text-3xl font-black tracking-wider text-blue-700 shadow">

{payment?.account_number}

</div>

<button

onClick={()=>{

navigator.clipboard.writeText(

payment?.account_number||""

);

setCopied(true);

setTimeout(()=>{

setCopied(false);

},2000);

}}

className="rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700"

>

📋 Copy Number

</button>

</div>

</div>

</div>

<div className="mt-6 rounded-3xl bg-white p-6 shadow-xl">

<h2 className="text-2xl font-black">

🎁 Membership Benefits

</h2>

<div className="mt-6 grid grid-cols-2 gap-3">

<div className="rounded-2xl bg-blue-50 p-4 text-center">

🆔

<div className="mt-2 font-bold">

Partner ID

</div>

</div>

<div className="rounded-2xl bg-green-50 p-4 text-center">

💰

<div className="mt-2 font-bold">

Earn PKR 300

  </div>

</div>

<div className="rounded-2xl bg-purple-50 p-4 text-center">

🎡

<div className="mt-2 font-bold">

Lucky Spin

</div>

</div>

<div className="rounded-2xl bg-orange-50 p-4 text-center">

🛍

<div className="mt-2 font-bold">

Online Store

</div>

</div>

<div className="rounded-2xl bg-pink-50 p-4 text-center">

💸

<div className="mt-2 font-bold">

Withdraw

</div>

</div>

<div className="rounded-2xl bg-cyan-50 p-4 text-center">

📈

<div className="mt-2 font-bold">

Dashboard

</div>

 </div>
</div>

 </div>

 <div className="mt-6 rounded-3xl border-2 border-blue-200 bg-white p-6 shadow-xl">

<div className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700">

Step 2

</div>

<h2 className="mt-4 text-3xl font-black">

🧾 Submit Your Transaction ID

</h2>

<p className="mt-2 text-gray-600">

After sending <span className="font-bold text-blue-700">PKR 999</span>, paste your EasyPaisa Transaction ID below.

</p>

<div className="mt-6 rounded-2xl border-2 border-blue-500 bg-blue-50 p-5">

<label className="text-sm font-semibold text-blue-700">

EasyPaisa Transaction ID

</label>

<input

value={transaction}

onChange={(e)=>

setTransaction(e.target.value)

}

placeholder="Paste EasyPaisa Transaction ID Here"

className="mt-3 w-full rounded-2xl border-2 border-blue-300 bg-white px-5 py-4 text-lg font-semibold tracking-wide outline-none transition focus:border-blue-600"

/>

<p className="mt-3 text-sm text-gray-500">

Example:

<span className="ml-2 rounded-lg bg-white px-3 py-1 font-mono font-bold">

TID9834729834

</span>

</p>

</div>

<button

onClick={submit}

className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-black text-white shadow-xl transition hover:scale-[1.01] hover:from-blue-700 hover:to-indigo-700 active:scale-95"

>

✅ Submit Payment

</button>

<div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">

<h3 className="font-bold text-yellow-800">

📌 Before You Submit

</h3>

<ul className="mt-3 space-y-2 text-sm text-gray-700">

<li>

✅ Send exactly <strong>PKR 999</strong>.

</li>

<li>

✅ Paste the correct EasyPaisa Transaction ID.

</li>

<li>

✅ Verification usually takes <strong>5–30 minutes</strong>.

</li>

<li>

✅ Your membership will be activated after payment verification.

</li>

</ul>

</div>

<p className="mt-5 text-center text-sm text-gray-500">

🔒 Every payment is manually verified to keep Kamyab Hub secure.

</p>

</div>

</div>

{

copied && (

<div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white shadow-2xl">

✅ EasyPaisa number copied successfully!

</div>

)

}

</main>

);

}