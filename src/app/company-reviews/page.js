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

<div className="flex gap-2">

<button
onClick={()=>
setEditingReview(item)
}
className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
>

✏️ Edit

</button>

<button
onClick={()=>
deleteReview(item.id)
}
className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
>

🗑 Delete

</button>

</div>

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

<h2 className="text-2xl font-bold mb-8">

{editingReview.id ? "Edit Review" : "Add Community Review"}

</h2>

<div className="grid md:grid-cols-2 gap-6">

{/* Name */}

<div>

<label className="block mb-2 font-medium">

Reviewer Name

</label>

<input
value={editingReview.name || ""}
onChange={(e)=>
setEditingReview({
...editingReview,
name:e.target.value
})
}
className="w-full border rounded-lg p-3"
/>

</div>

{/* City */}

<div>

<label className="block mb-2 font-medium">

City

</label>

<input
value={editingReview.city || ""}
onChange={(e)=>
setEditingReview({
...editingReview,
city:e.target.value
})
}
className="w-full border rounded-lg p-3"
/>

</div>

{/* Rating */}

<div>

<label className="block mb-2 font-medium">

Rating

</label>

<select
value={editingReview.rating || 5}
onChange={(e)=>
setEditingReview({
...editingReview,
rating:Number(e.target.value)
})
}
className="w-full border rounded-lg p-3"
>

<option value={5}>⭐⭐⭐⭐⭐</option>

<option value={4}>⭐⭐⭐⭐</option>

<option value={3}>⭐⭐⭐</option>

<option value={2}>⭐⭐</option>

<option value={1}>⭐</option>

</select>

</div>

{/* Language */}

<div>

<label className="block mb-2 font-medium">

Language

</label>

<select
value={editingReview.language || "urdu"}
onChange={(e)=>
setEditingReview({
...editingReview,
language:e.target.value
})
}
className="w-full border rounded-lg p-3"
>

<option value="urdu">

Urdu

</option>

<option value="english">

English

</option>

</select>

</div>

{/* Review */}

<div className="md:col-span-2">

<label className="block mb-2 font-medium">

Review

</label>

<textarea
rows={5}
value={editingReview.review || ""}
onChange={(e)=>
setEditingReview({
...editingReview,
review:e.target.value
})
}
className="w-full border rounded-lg p-3"
/>

</div>

{/* Status */}

<div>

<label className="block mb-2 font-medium">

Status

</label>

<select
value={editingReview.status || "active"}
onChange={(e)=>
setEditingReview({
...editingReview,
status:e.target.value
})
}
className="w-full border rounded-lg p-3"
>

<option value="active">

Active

</option>

<option value="hidden">

Hidden

</option>

</select>

</div>

{/* Display Order */}

<div>

<label className="block mb-2 font-medium">

Display Order

</label>

<input
type="number"
value={editingReview.display_order || 1}
onChange={(e)=>
setEditingReview({
...editingReview,
display_order:Number(e.target.value)
})
}
className="w-full border rounded-lg p-3"
/>

</div>

{/* Featured */}

<div className="md:col-span-2">

<label className="flex items-center gap-3">

<input
type="checkbox"
checked={editingReview.featured || false}
onChange={(e)=>
setEditingReview({
...editingReview,
featured:e.target.checked
})
}
/>

<span>

Featured Review

</span>

</label>

</div>

</div>

<div className="mt-8 flex gap-4">

<button
onClick={saveReview}
className="rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-800 transition"
>

{editingReview.id ? "Update Review" : "Save Review"}

</button>

<button
onClick={()=>
setEditingReview(null)
}
className="rounded-xl border px-6 py-3 hover:bg-gray-100 transition"
>

Cancel

</button>

</div>

</div>

)
}
</main>

);

}