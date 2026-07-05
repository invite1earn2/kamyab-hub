"use client";

export default function WinnerModal({

open,

reward,

onClose

}){

if(!open){

return null;

}

return(

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5">

<div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center animate-pulse">

<div className="text-6xl">

🎉

</div>

<h2 className="mt-4 text-3xl font-black text-gray-900">

Congratulations!

</h2>

<p className="mt-2 text-gray-500">

You have won

</p>

<div className="mt-5 rounded-2xl bg-yellow-50 border border-yellow-200 p-5">

<div className="text-3xl font-black text-yellow-700">

{reward?.reward_name}

</div>

<p className="mt-2 text-sm text-gray-600">

{reward?.reward_description}

</p>

</div>

<button

onClick={onClose}

className="mt-6 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-bold text-white transition hover:scale-105"

>

Continue

</button>

</div>

</div>

);

}