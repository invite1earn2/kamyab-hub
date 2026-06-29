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
async function deleteReview(id){

const confirmDelete=
window.confirm(
"Are you sure you want to delete this review?"
);

if(!confirmDelete){

return;

}

const { error }=
await supabase
.from("community_reviews")
.delete()
.eq("id",id);

if(error){

alert("Failed to delete review.");

console.log(error);

return;

}

alert("Review deleted successfully.");

loadReviews();

}

async function saveReview(){

let error;

if(editingReview.id){

const result=
await supabase
.from("community_reviews")
.update({

name:editingReview.name,
city:editingReview.city,
review:editingReview.review,
rating:editingReview.rating,
language:editingReview.language,
featured:editingReview.featured,
status:editingReview.status,
display_order:editingReview.display_order,
image_url:editingReview.image_url

})
.eq("id",editingReview.id);

error=result.error;

}else{

const result=
await supabase
.from("community_reviews")
.insert({

name:editingReview.name,
city:editingReview.city,
review:editingReview.review,
rating:editingReview.rating,
language:editingReview.language,
featured:editingReview.featured,
status:editingReview.status,
display_order:editingReview.display_order,
image_url:editingReview.image_url

});

error=result.error;

}

if(error){

alert("Failed to save review.");

console.log(error);

return;

}

alert("Review saved successfully.");

setEditingReview(null);

loadReviews();

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
status:"active",
display_order:reviews.length+1,
image_url:""

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

<button
onClick={()=>
deleteReview(item.id)
}
className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
>

🗑 Delete

</button>

</td>

</tr>

))

}

</tbody>

</table>

</div>

{
editingReview && (

<div className="mt-10 rounded-2xl border bg-white p-8 shadow">

<h2 className="mb-6 text-2xl font-bold">

Community Review

</h2>

<p className="text-gray-600">

Review form coming in next step...

</p>

</div>

)
}
</main>

);

}