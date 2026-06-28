"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { updateStatus } from "../../services/delivery";
import { checkOwner } from "../../services/owner";

export default function CompanyOrders(){

const [orders,setOrders]=useState([]);
const [loading,setLoading]=useState(true);

useEffect(()=>{

checkAccess();

},[]);

function checkAccess(){

if(!checkOwner()){

alert("Access Denied");

window.location.href="/dashboard";

return;

}

loadOrders();

}

async function loadOrders(){

const { data,error }=
await supabase
.from("orders")
.select("*")
.order("created_at",{ascending:false});

if(error){

console.log(error);

return;

}

setOrders(data||[]);

setLoading(false);

}

async function changeStatus(id,status){

await updateStatus(id,status);

loadOrders();

}

if(loading){

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

Operations Center

</p>

<h1 className="text-4xl font-black mt-2">

Company Order Management

</h1>

<p className="text-gray-600 mt-3">

Track, process and complete customer orders from one dashboard.

</p>

</div>

<div className="overflow-x-auto rounded-2xl border shadow-sm">

<table className="min-w-full bg-white">

<thead className="bg-gray-100">

<tr>

<th>Customer</th>

<th>Product</th>

<th>Price</th>

<th>Profit</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{orders.map((item)=>(

<tr
key={item.id}
className="border-t hover:bg-gray-50"
>

<td>{item.user_email || "-"}</td>

<td>{item.product_name}</td>

<td>PKR {item.price}</td>

<td>PKR {item.profit}</td>

<td className="p-4">

{item.status==="pending" && (

<span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">

Pending

</span>

)}

{item.status==="processing" && (

<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

Processing

</span>

)}

{item.status==="shipped" && (

<span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">

Shipped

</span>

)}

{item.status==="delivered" && (

<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

Delivered

</span>

)}

</td>

<td>

{item.status==="pending" && (

<button
onClick={()=>
changeStatus(
item.id,
"processing"
)}
>

Processing

</button>

)}

{item.status==="processing" && (

<button
onClick={()=>
changeStatus(
item.id,
"shipped"
)}
>

Shipped

</button>

)}

{item.status==="shipped" && (

<button
onClick={()=>
changeStatus(
item.id,
"delivered"
)}
>

Delivered

</button>

)}

{item.status==="delivered" && (

<span>

Completed

</span>

)}

</td>

</tr>

))}

</tbody>

</table>

</div>

</main>

);

}