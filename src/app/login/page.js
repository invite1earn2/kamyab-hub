"use client";

import {
useEffect,
useState
}
from "react";

import {
login
}
from "../../services/auth";

export default function Login(){

const [
email,
setEmail
]=
useState("");

const [
password,
setPassword
]=
useState("");

useEffect(()=>{

const existing=
localStorage.getItem(
"user_email"
);

const role=
localStorage.getItem(
"user_role"
);

if(existing){

if(role==="owner"){

window.location.href="/company";

}else{

window.location.href="/dashboard";

}

}

},[]);

async function submit(e){

e.preventDefault();

if(!email.trim()){

alert("Please enter email.");
return;

}

if(!password.trim()){

alert("Please enter password.");
return;

}

const user=
await login(
email,
password
);

if(user){

localStorage.setItem(
"user_email",
user.email
);

localStorage.setItem(
"user_id",
user.id
);

localStorage.setItem(
"user_role",
user.role
);

if(user.role==="owner"){

window.location.replace("/company");

}else{

window.location.replace("/dashboard");

}

return;

}

alert("Invalid Login");

}

return(

<main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

<div className="w-full max-w-md bg-white rounded-3xl shadow-xl border p-10 hover:shadow-2xl transition-all duration-300">

<div className="text-center mb-10">

<div className="w-20 h-20 rounded-3xl bg-black text-white flex items-center justify-center text-3xl font-black mx-auto shadow-lg">

K

</div>

<p className="text-blue-600 font-semibold uppercase tracking-wider">

Welcome Back

</p>

<h1 className="text-5xl font-black mt-6 tracking-tight">

Kamyab Hub

</h1>

<p className="text-blue-600 font-semibold mt-2">

Har Qadam Kamyabi Ki Taraf

</p>

<p className="text-gray-600 mt-5 leading-7">

Sign in to access your Business Partner Dashboard and continue growing your business.

</p>

</div>

<form
onSubmit={submit}
autoComplete="off"
className="flex flex-col gap-5"
>

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
placeholder="Enter your password"
className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

</div>

<button
type="submit"
className="w-full bg-black text-white rounded-xl py-4 font-bold text-lg hover:scale-[1.02] hover:bg-gray-800 transition-all duration-300 shadow-lg"
>

Login to Kamyab Hub

</button>

</form>

<p className="text-center text-gray-500 mt-8 text-sm">

Don't have an account?

<a
href="/signup"
className="text-blue-600 font-semibold ml-2 hover:underline"
>

Become a Business Partner

</a>

</p>

</div>

</main>

);

}