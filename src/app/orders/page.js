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

export default function Orders(){

const [
orders,
setOrders
]=
useState([]);

const [
loading,
setLoading
]=
useState(true);

useEffect(()=>{

load();

},[]);

async function load(){

const userEmail=

localStorage.getItem(
"user_email"
);

if(
checkOwner()
){

window.location.href="/company-orders";

return;

}

const {
data:user
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
userEmail
)
.single();

if(
!user
||
!user.subscribed
){

window.location.href="/subscribe";

return;

}

const {
data
}=
await supabase
.from(
"orders"
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

setOrders(
data||[]
);

setLoading(false);

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

<main className="max-w-7xl mx-auto px-6 py-12">

<div className="mb-10">

<p className="text-blue-600 font-semibold uppercase tracking-wider">

Order Center

</p>

<h1 className="text-5xl font-black mt-2">

My Orders

</h1>

<p className="text-gray-600 mt-4 max-w-2xl leading-7">

Track every order, monitor delivery progress and view your earnings from completed sales.

</p>

</div>

<div className="grid md:grid-cols-3 gap-6 mb-10">

<div className="bg-white border rounded-3xl p-6 shadow-sm">

<p className="text-gray-500 text-sm">

Total Orders

</p>

<h2 className="text-4xl font-black mt-3">

{orders.length}

</h2>

</div>

<div className="bg-white border rounded-3xl p-6 shadow-sm">

<p className="text-gray-500 text-sm">

Completed Orders

</p>

<h2 className="text-4xl font-black mt-3 text-green-600">

{

orders.filter(

item=>item.status==="delivered"

).length

}

</h2>

</div>

<div className="bg-white border rounded-3xl p-6 shadow-sm">

<p className="text-gray-500 text-sm">

Pending Orders

</p>

<h2 className="text-4xl font-black mt-3 text-orange-500">

{

orders.filter(

item=>item.status!=="delivered"

).length

}

</h2>

</div>

</div>

<div className="grid gap-5">

{

orders.map(
(item)=>(

<div
key={item.id}
className="bg-white rounded-3xl border shadow-sm p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
>

<h2 className="text-2xl font-bold">

📦 {item.product_name}

</h2>

<div className="grid md:grid-cols-3 gap-6 mt-6">

<div>

<p className="text-gray-500 text-sm">

Selling Price

</p>

<p className="text-xl font-bold mt-2">

PKR {item.price}

</p>

</div>

<div>

<p className="text-gray-500 text-sm">

Your Profit

</p>

<p className="text-xl font-bold text-green-600 mt-2">

PKR {item.profit}

</p>

</div>

<div>

<p className="text-gray-500 text-sm">

Order Status

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

item.status==="processing" && (

<span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">

🔵 Processing

</span>

)

}

{

item.status==="shipped" && (

<span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">

🟣 Shipped

</span>

)

}

{

item.status==="delivered" && (

<span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

🟢 Delivered

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