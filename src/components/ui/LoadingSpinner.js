"use client";

export default function LoadingSpinner({

title="Loading...",
subtitle="Please wait while we prepare your data."

}){

return(

<div className="min-h-[60vh] flex items-center justify-center">

<div className="bg-white rounded-3xl shadow-xl border p-10 text-center max-w-md w-full">

<div className="w-14 h-14 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>

<h2 className="text-2xl font-bold mt-6">

{title}

</h2>

<p className="text-gray-500 mt-3 leading-7">

{subtitle}

</p>

</div>

</div>

);

}