"use client";

import { useEffect, useState } from "react";

import supabase from "../../lib/supabase";

import {
createOrder
}
from "../../services/order";

import {
checkOwner
}
from "../../services/owner";

export default function Products(){

const [
products,
setProducts
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

const email =
localStorage.getItem("user_email");

const { data } =
await supabase
.from("products")
.select("*");

setProducts(data || []);

setLoading(false);

}

async function sell(
item
){

await createOrder(
item
);

alert(
"Order Created"
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

<main className="p-10">

<div className="mb-10">

<p className="text-blue-600 font-semibold uppercase tracking-wider">

Marketplace

</p>

<h1 className="text-4xl font-black mt-2">

Products Marketplace

</h1>

<p className="text-gray-600 mt-3">

Choose quality products, share them with customers and earn profit on every successful order.

</p>

</div>

<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">

{

products.map(
(item)=>(

<div
key={item.id}
className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
>

<div className="h-36 sm:h-44 md:h-52 bg-gray-100 overflow-hidden rounded-t-3xl">

  {item.image_url ? (

    <img
      src={item.image_url}
      alt={item.name}
      className="w-full h-full object-cover"
    />

  ) : (

    <div className="w-full h-full flex items-center justify-center text-6xl">

      📦

    </div>

  )}

</div>

<div className="p-6">

<h2>

{item.name}

</h2>

<div className="mt-5 rounded-2xl bg-blue-50 border border-blue-100 p-4">

<p className="text-sm text-gray-500">

💰 Price

</p>

<p className="mt-1 text-2xl font-black text-blue-700">

PKR {item.price}

</p>

</div>

<div className="mt-5 flex flex-wrap gap-2">

<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

🚚 Delivery Available

</span>

<span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

🏢 Company Managed

</span>

<span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">

💯 Quality Assured

</span>

</div>

<button
onClick={()=>
sell(
item
)
}
className="mt-6 w-full bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all"
>

Sell Product

</button>

</div>

</div>

)

)

}

</div>

</main>

);

}