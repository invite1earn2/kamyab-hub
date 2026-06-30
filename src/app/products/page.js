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

<div className="flex min-h-[60vh] items-center justify-center">

<div className="text-center">

<div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

<p className="mt-4 text-gray-600 font-medium">

Loading Products...

</p>

</div>

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

<div className="h-42 sm:h-48 md:h-52 bg-gray-100 overflow-hidden rounded-t-3xl">

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

<div className="p-3">

<h2 className="mt-2 min-h-[40px] text-[15px] font-bold leading-5 text-gray-900">

{item.name}

</h2>

<div className="mt-2">

<p className="text-xl font-black text-blue-700">

PKR {item.price}

</p>

</div>

<div className="mt-5 flex flex-wrap gap-2">

<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

🚚 Delivery Available

</span>

</div>

{

localStorage.getItem("user_email")

?

<button
onClick={() => sell(item)}
className="mt-3 w-full rounded-2xl bg-black py-4 font-bold text-white transition hover:bg-gray-800"
>

🛒 Sell Product

</button>

:

<a
href="/signup"
className="mt-6 block w-full rounded-2xl bg-blue-600 py-4 text-center font-bold text-white transition hover:bg-blue-700"
>

🤝 Become a Business Partner

</a>

}

</div>

</div>

)

)

}

</div>

</main>

);

}