"use client";

import { useEffect,useState } from "react";
import supabase from "../../../lib/supabase";
import { checkOwner } from "../../../services/owner";

export default function WhatsAppCommunity(){

const [loading,setLoading]=useState(true);

const [saving,setSaving]=useState(false);

const [communityName,setCommunityName]=useState("");

const [communityLink,setCommunityLink]=useState("");

const [buttonText,setButtonText]=useState("");

const [welcomeMessage,setWelcomeMessage]=useState("");

const [enabled,setEnabled]=useState(true);

useEffect(()=>{

if(!checkOwner()){

alert("Access Denied");

window.location.href="/dashboard";

return;

}

loadSettings();

},[]);

async function loadSettings(){

const { data,error }=

await supabase

.from("whatsapp_settings")

.select("*")

.eq("id",1)

.single();

if(error){

console.log(error);

return;

}

setCommunityName(data.community_name||"");

setCommunityLink(data.community_link||"");

setButtonText(data.button_text||"");

setWelcomeMessage(data.welcome_message||"");

setEnabled(data.is_enabled);

setLoading(false);

}

async function save(){

setSaving(true);

const { error }=

await supabase

.from("whatsapp_settings")

.update({

community_name:communityName,

community_link:communityLink,

button_text:buttonText,

welcome_message:welcomeMessage,

is_enabled:enabled,

updated_at:new Date()

})

.eq("id",1);

setSaving(false);

if(error){

alert("Unable to save settings.");

console.log(error);

return;

}

alert("WhatsApp Community updated successfully.");

}

return(

loading

?

<div className="min-h-screen flex items-center justify-center">

<div className="text-center">

<div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

<p className="mt-5 font-semibold text-gray-600">

Loading WhatsApp Community...

</p>

</div>

</div>

:

<div className="min-h-screen bg-slate-50 p-4 md:p-8">

<div className="mx-auto max-w-5xl">

<div className="rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 text-white shadow-2xl">

<h1 className="text-3xl font-black">

💬 WhatsApp Community Settings

</h1>

<p className="mt-2 text-green-100">

Manage your official WhatsApp Community from one place.

</p>

</div>

<div className="mt-6 rounded-3xl bg-white p-6 shadow-xl">

<div className="grid gap-6">

<div>

<label className="mb-2 block font-bold">

Community Name

</label>

<input

value={communityName}

onChange={(e)=>setCommunityName(e.target.value)}

className="w-full rounded-2xl border p-4 outline-none focus:ring-2 focus:ring-green-500"

/>

</div>

<div>

<label className="mb-2 block font-bold">

WhatsApp Community Link

</label>

<input

value={communityLink}

onChange={(e)=>setCommunityLink(e.target.value)}

placeholder="https://chat.whatsapp.com/..."

className="w-full rounded-2xl border p-4 outline-none focus:ring-2 focus:ring-green-500"

/>

</div>

<div>

<label className="mb-2 block font-bold">

Button Text

</label>

<input

value={buttonText}

onChange={(e)=>setButtonText(e.target.value)}

className="w-full rounded-2xl border p-4 outline-none focus:ring-2 focus:ring-green-500"

/>

</div>

<div>

<label className="mb-2 block font-bold">

Welcome Message

</label>

<textarea

rows={4}

value={welcomeMessage}

onChange={(e)=>setWelcomeMessage(e.target.value)}

className="w-full rounded-2xl border p-4 outline-none focus:ring-2 focus:ring-green-500"

/>

</div>

<div className="flex items-center justify-between rounded-2xl border bg-slate-50 p-5">

<div>

<p className="font-bold">

Enable Community Card

</p>

<p className="text-sm text-gray-500">

Show or hide the WhatsApp Community for Business Partners.

</p>

</div>

<input

type="checkbox"

checked={enabled}

onChange={(e)=>setEnabled(e.target.checked)}

className="h-6 w-6"

/>

</div>

<button

onClick={save}

disabled={saving}

className="w-full rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 py-4 text-lg font-black text-white shadow-xl transition hover:scale-[1.01] disabled:opacity-60"

>

{

saving

?

"Saving..."

:

"💾 Save Changes"

}

</button>

</div>

</div>

<div className="mt-8 rounded-3xl border border-dashed border-green-300 bg-white p-6 shadow">

<h2 className="text-2xl font-black">

👀 Live Preview

</h2>

<div className="mt-5 rounded-3xl border bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">

<div className="text-4xl">

💬

</div>

<h3 className="mt-4 text-2xl font-black">

{communityName}

</h3>

<p className="mt-3 text-green-100">

{welcomeMessage}

</p>

<a

href={communityLink}

target="_blank"

className="mt-6 inline-block rounded-2xl bg-white px-6 py-3 font-bold text-green-700"

>

{buttonText}

</a>

</div>

</div>

</div>

</div>

);

}