"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

export default function AddReview(){

const [saving,setSaving]=useState(false);

const [submitted,setSubmitted]=useState(false);

const [allowed,setAllowed]=useState(false);

const [checking,setChecking]=useState(true);

const [review,setReview]=useState({

name:"",
city:"",
rating:5,
language:"urdu",
review:""

});

useEffect(()=>{

loadUser();

},[]);

async function loadUser(){

const email=

localStorage.getItem(
"user_email"
);

if(!email){

setChecking(false);

return;

}

const { data,error }=

await supabase

.from("users")

.select("name,status")

.eq("email",email)

.single();

if(error){

console.log(error);

setChecking(false);

return;

}

setReview(prev=>({

...prev,

name:data?.name || ""

}));

if(data?.status==="approved"){

setAllowed(true);

}

setChecking(false);

}


async function submitReview(){

if(

!review.name.trim() ||

!review.city.trim() ||

!review.review.trim()

){

alert("Please complete all required fields.");

return;

}

setSaving(true);

const { error }=

await supabase

.from("community_reviews")

.insert({

name:review.name,
city:review.city,
review:review.review,
rating:review.rating,
language:review.language,
status:"pending",
featured:false,
display_order:999

});

if(error){

setSaving(false);

alert("Failed to submit review.");

console.log(error);

return;

}


setReview({

name:"",
city:"",
rating:5,
language:"urdu",
review:""

});

setSaving(false);

setSubmitted(true);

setTimeout(()=>{

window.location.href="/";

},2000);

}

if(checking){

return(

<main className="max-w-2xl mx-auto px-6 py-24">

<div className="rounded-3xl border bg-white p-10 text-center shadow">

<h2 className="text-3xl font-black">

Checking Membership...

</h2>

<p className="mt-4 text-gray-600">

Please wait...

</p>

</div>

</main>

);

}

if(!allowed){

return(

<main className="max-w-2xl mx-auto px-6 py-24">

<div className="rounded-3xl border bg-red-50 p-10 text-center shadow">

<div className="text-6xl">

🔒

</div>

<h1 className="mt-6 text-4xl font-black text-red-700">

Business Partners Only

</h1>

<p className="mt-4 text-gray-700">

Only approved Business Partners can submit community reviews.

</p>

<a
href="/subscribe"
className="inline-block mt-8 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 transition"
>

Become a Business Partner

</a>

</div>

</main>

);

}

if(submitted){

return(

<main className="max-w-2xl mx-auto px-6 py-24">

<div className="rounded-3xl border bg-green-50 p-10 text-center shadow">

<div className="text-6xl">

✅

</div>

<h1 className="mt-6 text-4xl font-black text-green-700">

Review Submitted!

</h1>

<p className="mt-4 text-gray-700">

Thank you for sharing your experience.

</p>

<p className="mt-2 text-gray-600">

Your review will be reviewed before appearing on the homepage.

</p>

<p className="mt-8 text-sm text-gray-500">

Redirecting to Home...

</p>

</div>

</main>

);

}

return(

<main className="max-w-3xl mx-auto px-6 py-16">

<div className="bg-white rounded-3xl border shadow-lg p-10">

<div className="text-center">

<div className="text-6xl">

⭐

</div>

<h1 className="mt-5 text-4xl font-black">

Share Your Experience

</h1>

<p className="mt-4 text-gray-600">

Share your genuine experience with Kamyab Hub.
Your review will be reviewed before it is published.

</p>

</div>

<div className="mt-10 space-y-6">

<div>

<label className="block mb-2 font-medium">

Your Name

</label>

<input
value={review.name}
readOnly
className="w-full rounded-xl border bg-gray-100 p-3 cursor-not-allowed"
/>

</div>

<div>

<label className="block mb-2 font-medium">

City

</label>

<input
value={review.city}
onChange={(e)=>
setReview({
...review,
city:e.target.value
})
}
className="w-full border rounded-xl p-3"
/>

</div>

<div>

<label className="block mb-2 font-medium">

Rating

</label>

<select
value={review.rating}
onChange={(e)=>
setReview({
...review,
rating:Number(e.target.value)
})
}
className="w-full border rounded-xl p-3"
>

<option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
<option value={4}>⭐⭐⭐⭐ Very Good</option>
<option value={3}>⭐⭐⭐ Good</option>
<option value={2}>⭐⭐ Fair</option>
<option value={1}>⭐ Poor</option>

</select>

</div>

<div>

<label className="block mb-2 font-medium">

Language

</label>

<select
value={review.language}
onChange={(e)=>
setReview({
...review,
language:e.target.value
})
}
className="w-full border rounded-xl p-3"
>

<option value="urdu">Urdu</option>

<option value="english">English</option>

</select>

</div>

<div>

<label className="block mb-2 font-medium">

Your Experience

</label>

<textarea
rows={6}
value={review.review}
onChange={(e)=>
setReview({
...review,
review:e.target.value
})
}
placeholder="Share your experience with Kamyab Hub..."
className="w-full border rounded-xl p-3"
/>

</div>

<div className="pt-4">

<button
onClick={submitReview}
disabled={saving}
className="w-full rounded-2xl bg-black py-4 text-lg font-bold text-white hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
>

{saving ? "Submitting..." : "⭐ Submit Review"}

</button>

</div>

</div>

</div>

</main>

);

}