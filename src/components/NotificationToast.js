"use client";

import { useEffect } from "react";

export default function NotificationToast({

show,
title,
message,
onClose,
onView,
duration = 5000

}){

useEffect(()=>{

if(!show){

return;

}

const timer = setTimeout(()=>{

onClose();

},duration);

return ()=>clearTimeout(timer);

},[show,duration,onClose]);

if(!show){

return null;

}

return(

<div className="fixed top-5 right-5 z-[9999] w-[380px] max-w-[95vw] animate-[slideIn_.3s_ease]">

<div className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-2xl">

<div className="flex items-start gap-4 p-5">

<div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">

🔔

</div>

<div className="flex-1">

<h3 className="text-lg font-bold text-gray-900">

{title}

</h3>

<p className="mt-2 text-sm leading-6 text-gray-600">

{message}

</p>

<div className="mt-5 flex gap-3">

<button

onClick={onView}

className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"

>

View

</button>

<button

onClick={onClose}

className="rounded-xl border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-100"

>

Dismiss

</button>

</div>

</div>

</div>

<div className="h-1 w-full bg-blue-600 animate-[toastProgress_5s_linear]"></div>

</div>

</div>

);

}