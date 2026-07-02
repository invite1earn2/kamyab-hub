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

<h1 className="mt-6 text-5xl font-black text-gray-900">

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

<h2 className="text-2xl font-bold mb-6">

🎁 What You'll Get

</h2>

<div className="space-y-4 text-gray-700">

<p>✅ Permanent Partner ID</p>

<p>✅ Earn PKR 300 Per Successful Referral</p>

<p>✅ Sell Company Products</p>

<p>✅ Lifetime Membership</p>

<p>✅ Personal Dashboard</p>

<p>✅ Withdrawal Facility</p>

<p>✅ Analytics & Reports</p>

<p>✅ Notifications</p>

<p>✅ Premium Help Center Support</p>

</div>

</div>

<div className="rounded-3xl border bg-blue-50 p-8 shadow-sm">

<h2 className="text-2xl font-bold mb-6">

💳 Payment Details

</h2>

<div className="space-y-5">

<div>

<p className="text-gray-500 text-sm">

Payment Method

</p>

<p className="font-bold text-lg">

EasyPaisa

</p>

</div>

<div>

<p className="text-gray-500 text-sm">

Account Title

</p>

<p className="font-bold text-lg">

Ali Khan

</p>

</div>

<div>

<p className="text-gray-500 text-sm">

EasyPaisa Number

</p>

<p className="font-bold text-2xl text-blue-700">

03024567898

</p>

</div>

</div>

</div>

</div>

<div className="max-w-5xl mx-auto mt-12">

<h2 className="text-3xl font-black text-center mb-8">

⚡ How It Works

</h2>

<div className="grid md:grid-cols-4 gap-6">

<div className="rounded-3xl border bg-white p-6 text-center shadow-sm">

<div className="text-4xl mb-4">

1️⃣

</div>

<h3 className="font-bold">

Become a Business Partner

</h3>

<p className="text-sm text-gray-600 mt-3">

Activate your membership with a one-time payment.

</p>

</div>

<div className="rounded-3xl border bg-white p-6 text-center shadow-sm">

<div className="text-4xl mb-4">

2️⃣

</div>

<h3 className="font-bold">

Invite & Sell

</h3>

<p className="text-sm text-gray-600 mt-3">

Invite new partners and promote company products.

</p>

</div>

<div className="rounded-3xl border bg-white p-6 text-center shadow-sm">

<div className="text-4xl mb-4">

3️⃣

</div>

<h3 className="font-bold">

Earn Money

</h3>

<p className="text-sm text-gray-600 mt-3">

Earn PKR 300 for every successful Business Partner plus product profits.

</p>

</div>

<div className="rounded-3xl border bg-white p-6 text-center shadow-sm">

<div className="text-4xl mb-4">

4️⃣

</div>

<h3 className="font-bold">

Withdraw Anytime

</h3>

<p className="text-sm text-gray-600 mt-3">

Request withdrawals directly from your dashboard.

</p>

</div>

</div>

</div>

<div className="max-w-5xl mx-auto mt-12">

<div className="rounded-3xl border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg">

<div className="inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white">

STEP 2 • VERIFY YOUR PAYMENT

</div>

<h2 className="mt-6 text-4xl font-black text-gray-900">

🎉 You're Almost There!

</h2>

<p className="mt-4 text-lg leading-8 text-gray-600">

You have successfully completed the first step.

Now enter your <span className="font-bold text-blue-700">EasyPaisa Transaction ID</span> below so our team can verify your payment and activate your <span className="font-bold">Business Partner Account</span>.

</p>
<input
value={transaction}
onChange={(e)=>setTransaction(e.target.value)}
placeholder="Enter your EasyPaisa Transaction ID"
className="mt-8 w-full rounded-2xl border-2 border-gray-200 bg-white px-6 py-5 text-lg shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
/>

<input
value={transaction}
onChange={(e)=>setTransaction(e.target.value)}
placeholder="Enter EasyPaisa Transaction ID"
className="mt-8 w-full rounded-2xl border border-gray-300 p-4 text-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

</main>

);

}