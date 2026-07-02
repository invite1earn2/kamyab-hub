"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

export default function Help() {

const [message,setMessage]=useState("");
const [messages,setMessages]=useState([]);
const [conversationId,setConversationId]=useState(null);

useEffect(()=>{

loadConversation();

},[]);

async function sendMessage(){

if(

!conversationId ||

!message.trim()

){

return;

}

const { error } = await supabase

.from(
"support_messages"
)

.insert([{

conversation_id:
conversationId,

sender:
"user",

message:
message

}]);

if(error){

console.log(error);

return;

}

setMessage("");

await loadConversation();

}


async function loadConversation(){

const email =
localStorage.getItem("user_email");

if(!email){

window.location.href="/login";

return;

}

let { data: conversation } = await supabase

.from("support_conversations")

.select("*")

.eq("user_email", email)

.single();

if(!conversation){

const { data: newConversation } = await supabase

.from("support_conversations")

.insert([{

user_email: email

}])

.select()

.single();

conversation = newConversation;

await supabase

.from("support_messages")

.insert([{

conversation_id: conversation.id,

sender: "system",

message: `👋 Welcome to Kamyab Hub Help Center!

Thank you for reaching out to us.

To help us resolve your request as quickly as possible, please describe your question in complete detail. If your inquiry is related to a payment, membership, withdrawal, or product order, kindly include any relevant Transaction ID or Order ID.

🕒 Our support team usually responds within 5–30 minutes during business hours.

We can assist you with:

• Membership Activation
• Referral Commissions
• Product Orders
• Withdrawals
• Payment Verification
• Technical Issues
• General Questions

We appreciate your trust in Kamyab Hub and look forward to assisting you.`

}]);

}

setConversationId(
conversation.id
);

const { data: chat } = await supabase

.from("support_messages")

.select("*")

.eq(
"conversation_id",
conversation.id
)

.order(
"created_at",
{
ascending:true
}
);

setMessages(
chat || []
);

}

return(

<main className="max-w-7xl mx-auto px-6 py-10">

<div className="mb-6">

<h1 className="text-3xl font-black">

💬 Help Center

</h1>

</div>

<div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">

{/* FAQ */}

<div className="order-2 lg:order-1 lg:col-span-1">

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

<div className="order-1 lg:order-2 lg:col-span-2">

<div className="rounded-3xl border bg-white shadow-sm overflow-hidden">

<div className="border-b bg-white px-6 py-5">

<div className="flex items-center gap-3">

<div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl">

👨‍💼

</div>

<div>

<h2 className="font-bold text-lg">

Kamyab Hub Support

</h2>

<p className="text-sm text-green-600 font-medium">

🟢 Usually replies within 5–30 minutes

</p>

</div>

</div>

</div>

<div className="p-5 h-[500px] overflow-y-auto bg-gray-100 space-y-4">

{

messages.map((item)=>(

<div
key={item.id}
className={`max-w-[85%] rounded-3xl px-5 py-4 shadow ${
item.sender==="system"
? "bg-white mr-auto"
: "bg-blue-600 text-white ml-auto"
}`}
>

<div className="flex justify-between items-center mb-3">

<p className="font-semibold text-sm">

{

item.sender==="system"

?

"👨‍💼 Kamyab Hub Support"

:

"You"

}

</p>

<p className="text-xs opacity-70">

{

new Date(item.created_at)

.toLocaleTimeString([],
{
hour:"2-digit",
minute:"2-digit"
})

}

</p>

</div>

<p className="whitespace-pre-line leading-7 text-sm">

{item.message}

</p>

</div>

))

}

</div>

<div className="border-t bg-white p-4">

<div className="flex items-center gap-3">

<input

value={message}

onChange={(e)=>setMessage(e.target.value)}

placeholder="Type your message..."

className="flex-1 rounded-full border border-gray-300 px-5 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"

/>

<button

onClick={sendMessage}

className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"

>

Send

</button>

</div>

</div>

</div>

</div>

</div>

</main>

);

}