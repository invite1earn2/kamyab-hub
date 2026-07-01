"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

export default function Help() {

const [message,setMessage]=useState("");

useEffect(()=>{

loadConversation();

},[]);

async function loadConversation(){

const email=
localStorage.getItem(
"user_email"
);

if(!email){

window.location.href="/login";

return;

}

const {
data:conversation
}=

await supabase

.from(
"support_conversations"
)

.select("*")

.eq(
"user_email",
email
)

.single();

console.log(
"Conversation:",
conversation
);
if(!conversation){

const {
data:newConversation,
error
}=

await supabase

.from(
"support_conversations"
)

.insert([{

user_email:
email

}])

.select()

.single();

console.log(
"Created:",
newConversation
);

}

}

return(

<main className="max-w-7xl mx-auto px-6 py-10">

<div className="mb-10">

<p className="text-blue-600 font-semibold uppercase tracking-wider">

Help Center

</p>

<h1 className="text-5xl font-black mt-3">

💬 We're Here To Help

</h1>

<p className="text-gray-600 mt-4 max-w-3xl leading-7">

Find quick answers to common questions or send a message directly to the Kamyab Hub Support Team.

</p>

</div>

<div className="grid lg:grid-cols-3 gap-8">

{/* FAQ */}

<div className="lg:col-span-1">

<div className="rounded-3xl border bg-white shadow-sm p-6">

<h2 className="text-2xl font-bold mb-6">

❓ Frequently Asked Questions

</h2>

<div className="space-y-4">

<details className="border rounded-xl p-4">

<summary className="cursor-pointer font-semibold">

How do I activate my membership?

</summary>

<p className="mt-3 text-gray-600">

Submit your payment from the Subscribe page. Our team will review and activate your membership.

</p>

</details>

<details className="border rounded-xl p-4">

<summary className="cursor-pointer font-semibold">

When will I receive my referral commission?

</summary>

<p className="mt-3 text-gray-600">

Referral commission is credited after your invited Business Partner's membership is approved.

</p>

</details>

<details className="border rounded-xl p-4">

<summary className="cursor-pointer font-semibold">

How do I request a withdrawal?

</summary>

<p className="mt-3 text-gray-600">

Open the Withdraw page, submit your request and wait for company approval.

</p>

</details>

<details className="border rounded-xl p-4">

<summary className="cursor-pointer font-semibold">

My subscription is still pending.

</summary>

<p className="mt-3 text-gray-600">

Membership approval usually happens after payment verification by our team.

</p>

</details>

<details className="border rounded-xl p-4">

<summary className="cursor-pointer font-semibold">

How do product commissions work?

</summary>

<p className="mt-3 text-gray-600">

Product profit is added after your order has been delivered successfully.

</p>

</details>

</div>

</div>

</div>

{/* Support Chat */}

<div className="lg:col-span-2">

<div className="rounded-3xl border bg-white shadow-sm overflow-hidden">

<div className="border-b p-6">

<h2 className="text-2xl font-bold">

💬 Chat With Support

</h2>

<p className="text-gray-500 mt-2">

Our support team is ready to help you.

</p>

</div>

<div className="p-6 h-[420px] overflow-y-auto bg-gray-50">

<div className="max-w-xl rounded-2xl bg-white border p-5">

<p className="font-bold">

👨‍💼 Kamyab Hub Support

</p>

<p className="mt-4 text-gray-700 leading-7">

👋 Welcome to Kamyab Hub!

</p>

<p className="mt-3 text-gray-600">

We're here to help you with:

</p>

<ul className="mt-4 space-y-2 text-gray-700">

<li>• Membership Activation</li>

<li>• Referral Earnings</li>

<li>• Product Orders</li>

<li>• Withdrawals</li>

<li>• Technical Issues</li>

</ul>

<p className="mt-5 text-gray-600">

Please type your question below.

</p>

</div>

</div>

<div className="border-t p-5 flex gap-4">

<input

value={message}

onChange={(e)=>setMessage(e.target.value)}

placeholder="Type your message..."

className="flex-1 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"

/>

<button

className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-semibold"

>

Send

</button>

</div>

</div>

</div>

</div>

</main>

);

}