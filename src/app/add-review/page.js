"use client";

import { useState } from "react";

export default function AddReview(){

const [review,setReview]=useState({

name:"",
city:"",
rating:5,
language:"urdu",
review:""

});    

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

<div className="mt-10 space-y-6"></div>

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

</div>

</main>

);

}