"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { checkOwner } from "../../services/owner";

export default function Support(){

const [conversations,setConversations]=useState([]);

useEffect(()=>{

if(!checkOwner()){

alert("Access Denied");

window.location.href="/dashboard";

return;

}

loadConversations();

},[]);

async function loadConversations(){

const { data,error } = await supabase

.from("support_conversations")

.select("*")

.order("created_at",{

ascending:false

});

if(error){

console.log(error);

return;

}

setConversations(data||[]);

}

return(

<main className="max-w-6xl mx-auto p-8">

<h1 className="text-4xl font-black mb-8">

💬 Support Inbox

</h1>

<div className="space-y-5">

{

conversations.map((item)=>(

<div

key={item.id}

className="border rounded-2xl bg-white p-6 shadow-sm"

>

<h2 className="text-xl font-bold">

{item.user_email}

</h2>

<p className="text-gray-500 mt-2">

Status: {item.status}

</p>

<button

className="mt-5 bg-black text-white px-6 py-3 rounded-xl"

>

Open Conversation

</button>

</div>

))

}

</div>

</main>

);

}