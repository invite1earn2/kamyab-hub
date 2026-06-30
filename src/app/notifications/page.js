"use client";

import { useEffect, useState } from "react";

import AuthGuard from "../../components/authguard";

import {
getNotifications,
createNotification
} from "../../services/notification";

import { checkOwner } from "../../services/owner";

export default function Notifications(){

const [notifications,setNotifications]=useState([]);

const [loading,setLoading]=useState(true);

useEffect(()=>{

load();

},[]);

async function testNotification(){

const email=

localStorage.getItem(
"user_email"
);

const role=

checkOwner()
?
"owner"
:
"partner";

const result=

await createNotification({

user_email:email,

role,

title:"🧪 Test Notification",

message:"Notification system is working correctly.",

type:"test",

link:"/notifications"

});

console.log(result);

load();

}

async function load(){

const email=

localStorage.getItem(
"user_email"
);

const role=

checkOwner()
?
"owner"
:
"partner";

console.log("========== Notification Debug ==========");
console.log("Email:", email);
console.log("Role:", role);

const data =
await getNotifications(
email,
role
);

console.log("Notifications Returned:", data);
console.log("======================================");

setNotifications(data);
setNotifications(data);

setLoading(false);

}

return(

<AuthGuard>

{

loading

?

<div className="min-h-[70vh] flex items-center justify-center">

<div className="text-center">

<div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

<p className="mt-4 text-gray-600">

Loading Notifications...

</p>

</div>

</div>

:

<main className="mx-auto max-w-6xl px-5 py-8">

<div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-8 shadow-sm">

<span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

🔔 Notification Center

</span>

<h1 className="mt-5 text-4xl font-black text-gray-900">

Stay Updated

</h1>

<p className="mt-4 max-w-2xl leading-7 text-gray-700">

Track subscriptions, referrals, orders, withdrawals and every important activity across Kamyab Hub.

</p>

</div>

<div className="mt-10 space-y-5">{

notifications.length===0

?

<div className="rounded-3xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">

<div className="text-6xl">

🔔

</div>

<h2 className="mt-6 text-2xl font-bold text-gray-900">

No Notifications Yet

</h2>

<p className="mt-3 text-gray-600 max-w-md mx-auto">

When subscriptions, referrals, orders or withdrawals occur, they will appear here automatically.

</p>

</div>

:

notifications.map((item)=>(

<div

key={item.id}

className={`rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:shadow-xl ${
item.is_read
?
"bg-white border-gray-200"
:
"bg-blue-50 border-blue-200"
}`}

>

<div className="flex items-start justify-between gap-4">

<div className="flex-1">

<div className="flex flex-wrap items-center gap-3">

<h3 className="text-xl font-bold text-gray-900">

{item.title}

</h3>

{

!item.is_read

&&

<span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">

NEW

</span>

}

</div>

<p className="mt-3 leading-7 text-gray-700">

{item.message}

</p>

<div className="mt-5 flex flex-wrap items-center gap-3 text-sm">

<span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">

{item.type}

</span>

<span className="text-gray-500">

{new Date(item.created_at).toLocaleString()}

</span>

</div>

</div>

<div className="text-4xl">

🔔

</div>

</div>

</div>

))

}</div>
<div className="mt-10 flex justify-end">

<button

onClick={load}

className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

>

<button
onClick={testNotification}
className="mr-3 rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition"
>

Create Test Notification

</button>

Refresh Notifications

</button>

</div>

</main>

}

</AuthGuard>

);

}