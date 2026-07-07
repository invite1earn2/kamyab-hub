"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export default function WhatsAppFloat() {

const [community,setCommunity]=useState(null);

const [expanded,setExpanded]=useState(false);

useEffect(()=>{

loadCommunity();

},[]);

async function loadCommunity(){

const { data } =

await supabase

.from("whatsapp_settings")

.select("*")

.eq("id",1)

.single();

setCommunity(data);

}

if(

!community ||

!community.is_enabled

){

return null;

}

return(

<div

className="fixed bottom-6 right-6 z-[9999]"

onMouseEnter={()=>setExpanded(true)}

onMouseLeave={()=>setExpanded(false)}

>

{

expanded

?

<div className="w-80 overflow-hidden rounded-3xl bg-white shadow-2xl border border-green-200">

<div className="bg-gradient-to-r from-green-600 to-emerald-600 p-5 text-white">

<div className="text-4xl">

💬

</div>

<h3 className="mt-2 text-xl font-black">

{community.community_name}

</h3>

<p className="mt-2 text-sm text-green-100">

{community.welcome_message}

</p>

</div>

<div className="p-5">

<a

href={community.community_link}

target="_blank"

rel="noopener noreferrer"

className="block w-full rounded-2xl bg-green-600 py-4 text-center font-bold text-white transition hover:bg-green-700"

>

🚀 {community.button_text}

</a>

</div>

</div>

:

<a

href={community.community_link}

target="_blank"

rel="noopener noreferrer"

className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-4xl shadow-2xl transition hover:scale-110 animate-bounce"

>

💬

</a>

}

</div>

);

}