"use client";

import { useState } from "react";
import supabase from "../../lib/supabase";

export default function AddReview() {

const [review,setReview]=useState({

name:"",
city:"",
rating:5,
language:"urdu",
review:""

});

async function submitReview(){

const { error } =
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

alert("Failed to submit review.");

console.log(error);

return;

}

alert("Thank you! Your review has been submitted for approval.");

setReview({

name:"",
city:"",
rating:5,
language:"urdu",
review:""

});

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
onChange={(e)=>
setReview({
...review,
name:e.target.value
})
}
className="w-full border rounded-xl p-3"
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

<option value="urdu">

Urdu

</option>

<option value="english">

English

</option>

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
className="w-full rounded-2xl bg-black py-4 text-lg font-bold text-white hover:bg-gray-800 transition"
>

⭐ Submit Review

</button>

</div>

</div>

</div>

</main>

);

}