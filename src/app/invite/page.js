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

export default function Invite(){

const [
code,
setCode
]=
useState("");

const [
partnerId,
setPartnerId
]=
useState("");

const [
loading,
setLoading
]=
useState(true);

useEffect(()=>{

load();

},[]);

async function load(){

const email=

localStorage.getItem(
"user_email"
);

const {
data:user
}=
await supabase
.from(
"users"
)
.select(
"subscribed,referral_code,partner_id"
)
.eq(
"email",
email
)
.single();

if(
!user
||
!user.subscribed
){

window.location.href=
"/subscribe";

return;

}

setCode(
user.referral_code
||
"NO CODE"
);

setPartnerId(
user.partner_id
||
"NO PARTNER ID"
);

setLoading(false);

}

const partnerLink =
`https://kamyab-hub.vercel.app/join/${partnerId}`;

const referralLink =
`https://kamyab-hub.vercel.app/signup?ref=${code}`;
async function copyLink(){

await navigator.clipboard.writeText(
partnerLink
);

alert(
"Partner link copied successfully."
);

}
function shareWhatsApp(){

const message =

`Join Kamyab Hub using my referral link and start your business today.

${partnerLink}`;

window.open(

`https://wa.me/?text=${encodeURIComponent(message)}`,

"_blank"

);

}

if(
loading
){

return(

<div className="p-10">

Loading...

</div>

);

}

return(

<main className="max-w-6xl mx-auto px-6 py-12">

<div className="mb-10">

<p className="text-blue-600 font-semibold uppercase tracking-wider">

Referral Center

</p>

<h1 className="text-5xl font-black mt-2">

Grow Your Network

</h1>

<p className="text-gray-600 mt-4 max-w-2xl leading-7">

Invite new Business Partners using your referral link and earn PKR 300 for every successful subscription.

</p>

</div>

<div className="bg-white rounded-3xl border shadow-sm p-8 max-w-3xl hover:shadow-2xl transition-all duration-300">

<div className="grid md:grid-cols-2 gap-8">

<div>

<p className="text-sm font-semibold uppercase tracking-wider text-blue-600">

Partner ID

</p>

<h2 className="text-5xl font-black mt-3 tracking-widest">

{partnerId}

</h2>

<p className="text-gray-600 mt-5 leading-7">

This is your permanent Kamyab Hub Partner ID. Share your professional partner link below to earn PKR 300 whenever someone becomes an active Business Partner.

</p>

<div className="mt-8 pt-6 border-t">

<p className="text-sm font-semibold uppercase tracking-wider text-gray-500">

Legacy Referral Code

</p>

<h3 className="text-2xl font-bold mt-2">

{code}

</h3>

</div>
</div>

<div>

<p className="text-sm font-semibold uppercase tracking-wider text-blue-600">

Referral Link

</p>

<div className="mt-4 bg-gray-100 rounded-2xl p-5 break-all">

{partnerLink}

</div>

<p className="text-sm text-gray-500 mt-4">

Share this professional partner link through WhatsApp, Facebook, Instagram, TikTok, YouTube, QR Codes, posters or any marketing channel.

</p>

<div className="flex flex-wrap gap-4 mt-6">

<button
onClick={copyLink}
className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300"
>

📋 Copy Professional Partner Link

</button>

<button
onClick={shareWhatsApp}
className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300"
>

📱 Share on WhatsApp

</button>

</div>
</div>

</div>

</div>

<section className="mt-14">

<h2 className="text-3xl font-black mb-8">

Why Invite Business Partners?

</h2>

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

<div className="text-5xl">

💰

</div>

<h3 className="text-xl font-bold mt-5">

Earn PKR 300

</h3>

<p className="text-gray-600 mt-4 leading-7">

Receive a referral reward every time someone joins and activates their membership using your referral link.

</p>

</div>

<div className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

<div className="text-5xl">

👥

</div>

<h3 className="text-xl font-bold mt-5">

Unlimited Referrals

</h3>

<p className="text-gray-600 mt-4 leading-7">

There is no limit. Keep inviting new Business Partners and continue expanding your earning potential.

</p>

</div>

<div className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

<div className="text-5xl">

🚀

</div>

<h3 className="text-xl font-bold mt-5">

Build Long-Term Income

</h3>

<p className="text-gray-600 mt-4 leading-7">

Grow your business through referrals and product sales while building a consistent source of income.

</p>

</div>

</div>

</section>

</main>

);

}