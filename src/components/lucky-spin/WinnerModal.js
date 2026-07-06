"use client";

export default function WinnerModal({

open,

reward,

onClose

}){

if(!open){

return null;

}

function getTitle(){

switch(reward?.reward_code){

case "POINTS":

return "🎉 Congratulations!";

case "EXTRA_SPIN":

return "🎡 Extra Spin Won!";

case "VOUCHER":

return "🎁 Product Voucher Won!";

case "REFERRAL_BOOSTER":

return "🚀 Referral Booster Unlocked!";

default:

return "🎉 Congratulations!";

}

}

function getIcon(){

switch(reward?.reward_code){

case "POINTS":

return "🪙";

case "EXTRA_SPIN":

return "🎡";

case "VOUCHER":

return "🎁";

case "REFERRAL_BOOSTER":

return "🚀";

default:

return "🎉";

}

}

return(

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5">

<div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center">

<div className="text-7xl">

{getIcon()}

</div>

<h2 className="mt-4 text-3xl font-black text-gray-900">

{getTitle()}

</h2>

<p className="mt-2 text-gray-500">

You have won

</p>

<div className="mt-5 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-5">

<div className="text-2xl font-black text-yellow-700">

{reward?.reward_name}

</div>

{

reward?.reward_code==="REFERRAL_BOOSTER"

?

<p className="mt-3 text-sm leading-6 text-gray-700">

Your <span className="font-bold text-purple-700">

next successful Business Partner referral

</span>

will earn

<span className="font-bold text-green-600">

 PKR 450

</span>

instead of the normal referral commission.

</p>

:

reward?.reward_code==="VOUCHER"

?

<p className="mt-3 text-sm leading-6 text-gray-700">

Congratulations!

You have received a

<span className="font-bold text-purple-700">

 PKR {reward?.reward_value} Product Voucher

</span>

which can be redeemed according to Kamyab Hub voucher policy.

</p>

:

<p className="mt-3 text-sm leading-6 text-gray-700">

{reward?.reward_description}

</p>

}

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