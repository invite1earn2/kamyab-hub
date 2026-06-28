"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { checkOwner } from "../../services/owner";

export default function OwnerDashboard(){

const [stats,setStats]=useState(null);

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

setStats({

userCount,

pendingSubscriptions,

pendingWithdrawals,

totalOrders

});

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

<h1 className="text-4xl font-bold mb-8">

Company Dashboard

</h1>

<div className="grid grid-cols-2 gap-5">

<div className="border p-6 rounded">

<h2>Total Users</h2>

<p>{stats.userCount}</p>

</div>

<div className="border p-6 rounded">

<h2>Pending Subscriptions</h2>

<p>{stats.pendingSubscriptions}</p>

<a
href="/subscriptions"
className="text-blue-600"
>

Manage →

</a>

</div>

<div className="border p-6 rounded">

<h2>Pending Withdrawals</h2>

<p>{stats.pendingWithdrawals}</p>

<a
href="/withdrawals"
className="text-blue-600"
>

Manage →

</a>

</div>

<div className="border p-6 rounded">

<h2>Total Orders</h2>

<p>{stats.totalOrders}</p>

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

</div>

</div>

</main>

);

}