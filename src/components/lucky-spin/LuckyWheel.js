"use client";

export default function LuckyWheel({

rotation,

spinning,

onSpin

}){

const rewards=[

{
label:"🪙 10",
color:"#3B82F6"
},

{
label:"🪙 20",
color:"#10B981"
},

{
label:"🪙 50",
color:"#F59E0B"
},

{
label:"🏆 100",
color:"#EF4444"
},

{
label:"🎡 Extra",
color:"#8B5CF6"
},

{
label:"🎁 Voucher",
color:"#EC4899"
},

{
label:"🚀 Promote",
color:"#06B6D4"
},

{
label:"🙂 Try Again",
color:"#6B7280"
}

];

return(

<div className="mt-14 flex flex-col items-center">

<div className="relative">

<div className="absolute left-1/2 -top-8 -translate-x-1/2 text-5xl z-20">

📍

</div>

<svg

width="420"

height="420"

viewBox="0 0 420 420"

style={{

transform:`rotate(${rotation}deg)`,

transition:spinning

?

"transform 5s cubic-bezier(.17,.67,.19,1)"

:

"none"

}}

>

<defs>

<filter id="shadow">

<feDropShadow

dx="0"

dy="6"

stdDeviation="8"

floodOpacity="0.25"

/>

</filter>

</defs>

<circle

cx="210"

cy="210"

r="200"

fill="#FFF8E1"

stroke="#F59E0B"

strokeWidth="12"

filter="url(#shadow)"

/>

{

rewards.map((reward,index)=>{

const start=index*45;

return(

<g

key={index}

transform={`rotate(${start} 210 210)`}

>

<path

d="M210 210 L210 15 A195 195 0 0 1 347 73 Z"

fill={reward.color}

stroke="#ffffff"

strokeWidth="2"

/>

<text

x="210"

y="82"

textAnchor="middle"

fontSize="13"

fontWeight="700"

fill="white"

>

{reward.label}

</text>

</g>

);

})

}

<circle

cx="210"

cy="210"

r="42"

fill="#FACC15"

stroke="#ffffff"

strokeWidth="8"

/>

<text

x="210"

y="217"

textAnchor="middle"

fontSize="18"

fontWeight="800"

fill="#111827"

>

SPIN

</text>

</svg>

</div>

<button

disabled={spinning}

onClick={onSpin}

className="mt-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-5 text-xl font-bold text-white shadow-xl transition hover:scale-105 disabled:opacity-50"

>

{

spinning

?

"🎡 SPINNING..."

:

"🎡 SPIN NOW"

}

</button>

<p className="mt-5 text-gray-500">

Win exciting rewards every day.

</p>

</div>

);

}