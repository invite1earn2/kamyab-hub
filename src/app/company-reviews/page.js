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

</main>

);

}