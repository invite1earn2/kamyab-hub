"use client";

export default function FloatingHelpButton(){

return(

<a

href="/help"

className="fixed bottom-5 right-10 md:bottom-10 z-50"

>

<div className="bg-blue-600/95 backdrop-blur hover:bg-blue-700 text-white rounded-full shadow-2xl px-6 py-4 flex items-center gap-3 transition-all duration-300 hover:scale-105">

<span className="text-2xl">

💬

</span>

<div>

<p className="font-bold leading-none">

Help Center

</p>

<p className="text-xs opacity-90">

Need Help?

</p>

</div>

</div>

</a>

);

}