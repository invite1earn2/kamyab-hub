"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { checkOwner } from "../../services/owner";

export default function CompanyReviews() {

const [reviews,setReviews]=useState([]);

const [editingReview,setEditingReview]=useState(null);

useEffect(()=>{

loadReviews();

},[]);

async function loadReviews(){

if(!checkOwner()){

window.location.href="/dashboard";

return;

}

const { data }=

await supabase

.from("community_reviews")

.select("*")

.order("display_order",{ascending:true});

setReviews(data||[]);

}

return(

<main className="p-10">

<h1 className="text-4xl font-bold">

Community Review Management

</h1>

<p className="mt-3 text-gray-600">

Manage homepage community member experiences.

</p>

<button
onClick={()=>setEditingReview({

name:"",
city:"",
review:"",
rating:5,
language:"urdu",
featured:false,
status:"active"

})}
className="mt-8 rounded-xl bg-black px-6 py-3 text-white"
>

+ Add Review

</button>

<div className="mt-10 overflow-x-auto">

<table className="w-full border border-gray-200 rounded-xl overflow-hidden">

<thead className="bg-gray-100">

<tr>

<th className="p-4 text-left">Name</th>

<th className="p-4 text-left">City</th>

<th className="p-4 text-left">Rating</th>

<th className="p-4 text-left">Language</th>

<th className="p-4 text-left">Status</th>

<th className="p-4 text-left">Featured</th>

<th className="p-4 text-left">Actions</th>

</tr>

</thead>

<tbody>

{

reviews.map((item)=>(

<tr
key={item.id}
className="border-t"
>

<td className="p-4">

{item.name}

</td>

<td className="p-4">

{item.city}

</td>

<td className="p-4">

{"⭐".repeat(item.rating)}

</td>

<td className="p-4">

{item.language}

</td>

<td className="p-4">

{item.status}

</td>

<td className="p-4">

{item.featured ? "✅" : "—"}

</td>

<td className="p-4">

Coming Soon...

</td>

</tr>

))

}

</tbody>

</table>

</div>

</main>

);

}