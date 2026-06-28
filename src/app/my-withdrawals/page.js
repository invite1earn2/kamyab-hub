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

export default function MyWithdrawals(){

const [
rows,
setRows
]=
useState([]);

const [
loading,
setLoading
]=
useState(true);

useEffect(()=>{

check();

},[]);

async function check(){

const email=
localStorage.getItem(
"user_email"
);

if(
checkOwner()
){

const {
data
}=
await supabase
.from(
"withdrawals"
)
.select("*")
.order(
"created_at",
{
ascending:false
}
);

setRows(
data||[]
);

setLoading(false);

return;

}

const {
data
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
!data?.subscribed
){

window.location.href=
"/subscribe";

return;

}

load();

}

async function load(){

const userEmail=
localStorage.getItem(
"user_email"
);

const {
data
}=
await supabase
.from(
"withdrawals"
)
.select("*")
.eq(
"user_email",
userEmail
)
.order(
"created_at",
{
ascending:false
}
);

setRows(
data||[]
);

setLoading(false);

}

if(
loading
){

return(

<div className="min-h-[70vh] flex items-center justify-center">

<div className="text-center">

<div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>

<p className="mt-4 text-gray-600">

Loading Withdrawals...

</p>

</div>

</div>

);

}

return(

<main className="max-w-7xl mx-auto px-6 py-12">

<div className="mb-10">

<p className="text-blue-600 font-semibold uppercase tracking-wider">

Withdrawal History

</p>

<h1 className="text-5xl font-black mt-2">

My Withdrawals

</h1>

<p className="text-gray-600 mt-4 max-w-2xl leading-7">

View all your withdrawal requests and track their current approval status.

</p>

</div>

<div className="grid md:grid-cols-3 gap-6 mb-10">

<div className="bg-white border rounded-3xl p-6 shadow-sm">

<p className="text-gray-500 text-sm">

Total Requests

</p>

<h2 className="text-4xl font-black mt-3">

{rows.length}

</h2>

</div>

<div className="bg-white border rounded-3xl p-6 shadow-sm">

<p className="text-gray-500 text-sm">

Approved

</p>

<h2 className="text-4xl font-black mt-3 text-green-600">

{

rows.filter(

item=>item.status==="approved"

).length

}

</h2>

</div>

<div className="bg-white border rounded-3xl p-6 shadow-sm">

<p className="text-gray-500 text-sm">

Pending

</p>

<h2 className="text-4xl font-black mt-3 text-orange-500">

{

rows.filter(

item=>item.status==="pending"

).length

}

</h2>

</div>

</div>

<div className="grid gap-5">

{

rows.map(
(item)=>(

<div
key={item.id}
className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
>

<h2 className="text-2xl font-bold">

💸 Withdrawal Request

</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">

<div>

<p className="text-gray-500 text-sm">

Amount

</p>

<p className="text-2xl font-bold text-green-600 mt-2">

PKR {item.amount}

</p>

</div>

<div>

<p className="text-gray-500 text-sm">

Method

</p>

<p className="font-semibold mt-2">

{item.method || "Not Selected"}

</p>

</div>

<div>

<p className="text-gray-500 text-sm">

Requested By

</p>

<p className="font-semibold mt-2">

{item.user_email}

</p>

</div>

<div>

<p className="text-gray-500 text-sm">

Status

</p>

<div className="mt-3">

{
item.status==="pending" && (

<span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">

🟡 Pending

</span>

)

}

{
item.status==="approved" && (

<span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

🟢 Approved

</span>

)

}

{
item.status==="rejected" && (

<span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">

🔴 Rejected

</span>

)

}

</div>

</div>

</div>

</div>

)

)

}

</div>

</main>

);

}