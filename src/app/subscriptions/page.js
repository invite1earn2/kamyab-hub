"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { checkOwner } from "../../services/owner";
import { createNotification } from "../../services/notification";

export default function Subscription() {

const [subscriptions,setSubscriptions]=useState([]);

const [loading,setLoading]=useState(true);

const [pendingCount,setPendingCount]=useState(0);

const [approvedCount,setApprovedCount]=useState(0);

const [totalRevenue,setTotalRevenue]=useState(0);

useEffect(()=>{

if(!checkOwner()){

alert("Access Denied");

window.location.href="/dashboard";

return;

}

loadSubscriptions();

},[]);

async function loadSubscriptions(){

const { data,error }=

await supabase

.from("subscriptions")

.select("*")

.order("created_at",{ascending:false});

if(error){

console.log(error);

return;

}

const list=data||[];

setSubscriptions(list);

setPendingCount(

list.filter(

item=>item.status==="pending"

).length

);

setApprovedCount(

list.filter(

item=>item.status==="approved"

).length

);

setTotalRevenue(

list.filter(

item=>item.status==="approved"

).length*699

);

setLoading(false);

}

async function approveSubscription(id,email){

console.log("=== APPROVE STARTED ===");

console.log("Subscription ID:",id);

console.log("User Email:",email);

const {

data:subscription,

error:loadError

}=

await supabase

.from("subscriptions")

.select("status")

.eq("id",id)

.single();

if(loadError){

console.log(loadError);

return;

}

if(subscription.status==="approved"){

alert(

"This subscription has already been approved."

);

return;

}

const {

data:updatedSubscription,

error:subscriptionError

}=

await supabase

.from("subscriptions")

.update({

status:"approved"

})

.eq("id",id)

.eq("status","pending")

.select();

if(subscriptionError){

console.log(subscriptionError);

return;

}

if(

!updatedSubscription ||

updatedSubscription.length===0

){

alert(

"This subscription has already been processed."

);

return;

}

const {

error:userError

}=

await supabase

.from("users")

.update({

subscribed:true

})

.eq("email",email);

if(userError){

console.log(userError);

return;

}

// ================================
// Initialize Lucky Spin
// ================================

const {

data:spinSettings

}=

await supabase

.from("spin_settings")

.select("*")

.single();

const {

data:existingSpin

}=

await supabase

.from("user_spin_status")

.select("id")

.eq("user_email",email)

.single();

if(!existingSpin){

await supabase

.from("user_spin_status")

.insert([{

user_email:email,

available_spins:

Number(

spinSettings?.signup_bonus_spins || 4

),

total_spins:0,

last_spin_date:null

}]);

}

await createNotification({

user_email:email,

role:"partner",

title:"🎉 Subscription Approved",

message:

"Congratulations! Your Kamyab Hub subscription has been approved. You now have full access to the platform.",

type:"subscription",

link:"/dashboard"

});

const {

data:approvedUser

}=

await supabase

.from("users")

.select("referred_by")

.eq("email",email)

.single();

if(approvedUser?.referred_by){

let inviter=null;

if(

approvedUser.referred_by.startsWith("KH")

){

const { data }=

await supabase

.from("users")

.select(

"id,earnings_balance,lifetime_earnings,total_referrals"

)

.eq(

"partner_id",

approvedUser.referred_by

)

.single();

inviter=data;

}else{

const { data }=

await supabase

.from("users")

.select(

"id,earnings_balance,lifetime_earnings,total_referrals"

)

.eq(

"referral_code",

approvedUser.referred_by

)

.single();

inviter=data;

}

if(inviter){

const {

error:inviterError

}=

await supabase

.from("users")

.update({

earnings_balance:

Number(

inviter.earnings_balance||0

)+300,

lifetime_earnings:

Number(

inviter.lifetime_earnings||0

)+300,

total_referrals:

Number(

inviter.total_referrals||0

)+1

})

.eq(

"id",

inviter.id

);

if(inviterError){

console.log(inviterError);

}

const {

data:inviterUser

}=

await supabase

.from("users")

.select("email")

.eq("id",inviter.id)

.single();

if(inviterUser){

const {

data:spinSettings

}=

await supabase

.from("spin_settings")

.select("*")

.single();

const {

data:inviterSpin

}=

await supabase

.from("user_spin_status")

.select("*")

.eq(

"user_email",

inviterUser.email

)

.single();

if (inviterSpin) {

  await supabase

    .from("user_spin_status")

    .update({

      available_spins:

        Number(inviterSpin.available_spins || 0)

        +

        Number(spinSettings?.referral_bonus_spins || 4)

    })

    .eq("id", inviterSpin.id);

} else {

  await supabase

    .from("user_spin_status")

    .insert([{

      user_email: inviterUser.email,

      available_spins:

        Number(spinSettings?.referral_bonus_spins || 4),

      total_spins: 0,

      last_spin_date: null

    }]);

}

}

}

}

console.log("Updating platform_stats...");

const {

data:stats

}=

await supabase

.from("platform_stats")

.select("*")

.eq("id",1)

.single();

await supabase

.from("platform_stats")

.update({

total_revenue:

Number(

stats.total_revenue||0

)+699,

total_members:

Number(

stats.total_members||0

)+1

})

.eq("id",1);

await loadSubscriptions();

}

return(

<div className="min-h-screen bg-slate-50 p-4 md:p-8">

<div className="mx-auto max-w-6xl">

<div className="mb-6 rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 p-6 text-white shadow-2xl">

<h1 className="text-3xl font-black">

💳 Subscription Management

</h1>

<p className="mt-2 text-purple-100">

Approve Business Partner subscriptions quickly.

</p>

</div>

<div className="mb-6 grid grid-cols-3 gap-3">

<div className="rounded-2xl bg-yellow-50 p-4 text-center shadow">

<div className="text-3xl">

🟡

</div>

<div className="mt-2 text-2xl font-black">

{pendingCount}

</div>

<div className="text-xs text-gray-500">

Pending

</div>

</div>

<div className="rounded-2xl bg-green-50 p-4 text-center shadow">

<div className="text-3xl">

🟢

</div>

<div className="mt-2 text-2xl font-black">

{approvedCount}

</div>

<div className="text-xs text-gray-500">

Approved

</div>

</div>

<div className="rounded-2xl bg-blue-50 p-4 text-center shadow">

<div className="text-3xl">

💰

</div>

<div className="mt-2 text-xl font-black">

PKR {totalRevenue}

</div>

<div className="text-xs text-gray-500">

Revenue

</div>

</div>

</div>

{

loading

?

<div className="py-20 text-center">

Loading...

</div>

:

<div className="space-y-4">

{subscriptions.map(item=>(

<div

key={item.id}

className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"

>

<div className="flex items-start justify-between gap-4">

<div className="flex-1">

<div className="font-bold text-lg break-all">

👤 {item.user_email}

</div>

<div className="mt-4">

<p className="text-xs font-semibold text-gray-500">

Transaction ID

</p>

<div className="mt-1 rounded-xl bg-slate-100 p-3 font-mono text-sm font-bold tracking-wider break-all">

{item.transaction_id}

</div>

</div>

<div className="mt-4 flex flex-wrap gap-2">

<span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">

💳 {item.method}

</span>

<span

className={`rounded-full px-3 py-1 text-xs font-bold

${

item.status==="approved"

?

"bg-green-100 text-green-700"

:

"bg-yellow-100 text-yellow-700"

}

`}

>

{

item.status==="approved"

?

"✅ Approved"

:

"🟡 Pending"

}

</span>

</div>

<div className="mt-4 text-xs text-gray-500">

📅 {

item.created_at

?

new Date(item.created_at).toLocaleString()

:

""

}

</div>

</div>

<div className="w-40">

{

item.status==="pending"

?

<button

onClick={()=>

approveSubscription(

item.id,

item.user_email

)

}

className="w-full rounded-2xl bg-green-600 py-3 font-bold text-white transition hover:bg-green-700"

>

✅ Approve

</button>

:

<div className="rounded-2xl bg-green-100 py-3 text-center font-bold text-green-700">

Approved

</div>

}

</div>

</div>

</div>

))}

</div>

}

</div>

</div>

);

}