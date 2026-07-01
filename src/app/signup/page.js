"use client";

import {
useState,
useEffect
}
from "react";

import {
createUser
}
from "../../services/signup";

import {
register
}
from "../../services/auth";

export default function Signup(){

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [referral,setReferral]=useState("");
const [role,setRole]=useState("Business Partner");

useEffect(()=>{

const existing=
localStorage.getItem("user_email");

if(existing){

window.location.replace("/");
return;

}

const params=
new URLSearchParams(
window.location.search
);

const ref=
params.get("ref");

if(ref){

setReferral(ref);

}

},[]);

async function handleSubmit(e){

e.preventDefault();

if(!name.trim()){

alert("Please enter full name.");
return;

}

if(!email.trim()){

alert("Please enter email.");
return;

}

if(!password.trim()){

alert("Please enter password.");
return;

}

const created=
await createUser({

name,

email,

referral_code:referral,

role

});

if(!created){

return;

}

const registered=
await register(

email,

password

);

if(!registered){

return;

}

localStorage.setItem(
"user_email",
email
);

window.location.href="/subscribe";

}

return(

<main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">

<div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border p-10 hover:shadow-2xl transition-all duration-300">

<div className="text-center mb-10">

<div className="w-20 h-20 rounded-3xl bg-black text-white flex items-center justify-center text-3xl font-black mx-auto shadow-lg">

K

</div>

<p className="text-blue-600 font-semibold uppercase tracking-wider">

Join Kamyab Hub

</p>

<h1 className="text-5xl font-black mt-6 tracking-tight">

Become a Business Partner

</h1>

<p className="text-blue-600 font-semibold mt-2">

Har Qadam Kamyabi Ki Taraf

</p>

<p className="text-gray-600 mt-5 leading-7">

Create your account and start building your business through quality products, referral rewards and long-term earning opportunities.

</p>

</div>

<form
onSubmit={handleSubmit}
autoComplete="off"
className="flex flex-col gap-5"
>
<div className="grid md:grid-cols-2 gap-5"></div>
<div>

<label className="block mb-2 font-medium">

Full Name

</label>

<input
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="Enter your full name"
className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

</div>

<div>

<label className="block mb-2 font-medium">

Email Address

</label>

<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
placeholder="Enter your email"
className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

</div>

<div>

<label className="block mb-2 font-medium">

Password

</label>

<input
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
placeholder="Create a password"
className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

</div>

<div>

<label className="block mb-2 font-medium">

Referral Code (Optional)

</label>

<input
value={referral}
onChange={(e)=>setReferral(e.target.value)}
placeholder="Enter referral code"
className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

</div>

<div>

<label className="block mb-2 font-medium">

Business Role

</label>

<select
value={role}
onChange={(e)=>setRole(e.target.value)}
className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
>

<option>

Business Partner

</option>

<option>

Referral Partner

</option>

<option>

Business Partner + Referral Partner

</option>

</select>

</div>

<button
type="submit"
className="w-full bg-black text-white rounded-xl py-4 font-bold text-lg hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300 shadow-lg"
>

Continue to Membership

</button>

</form>

<p className="text-center text-gray-500 mt-8 text-sm">

Already have an account?

<a
href="/login"
className="text-blue-600 font-semibold ml-2 hover:underline"
>

Login

</a>

</p>

</div>

</main>

);

}