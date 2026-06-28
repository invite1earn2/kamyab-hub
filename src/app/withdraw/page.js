"use client";

import {
useState,
useEffect
}
from "react";

import supabase
from "../../lib/supabase";

import {
createWithdrawal
}
from "../../services/withdraw";

import {
checkOwner
}
from "../../services/owner";

export default function Withdraw(){

const [name,setName]=useState("");
const [amount,setAmount]=useState("");
const [balance,setBalance]=useState(0);
const [loading,setLoading]=useState(true);

const [user,setUser]=useState(null);

useEffect(()=>{

check();

},[]);

async function check(){

const email=
localStorage.getItem(
"user_email"
);

if(
checkOwner()
){

setBalance(0);

setLoading(false);

return;

}

const {
data:user
}=
await supabase
.from("users")
.select(`
subscribed,
earnings_balance,
payment_method,
payment_number,
bank_name,
account_title,
iban
`)
.eq("email",email)
.single();

if(
!user
||
!user.subscribed
){

window.location.href="/subscribe";
return;

}

setBalance(
Number(
user.earnings_balance||0
)
);

setUser(user);
setLoading(false);

}

async function submit(e){

e.preventDefault();

if(
checkOwner()
){

alert(
"Owner cannot create withdrawal requests."
);

return;

}

if(
!name.trim()
){

alert("Please enter your name.");
return;

}

if(
!amount
||
Number(amount)<=0
){

alert("Please enter a valid amount.");
return;

}

if(
Number(amount)>balance
){

alert(
"Insufficient balance."
);

return;

}

if(
!user?.payment_method
){

alert(
"Please complete your Payment Settings before requesting a withdrawal."
);

window.location.href="/payment-settings";

return;

}

if(
user.payment_method==="EasyPaisa"
&&
!user.payment_number
){

alert(
"Please add your EasyPaisa number."
);

window.location.href="/payment-settings";

return;

}

if(
user.payment_method==="JazzCash"
&&
!user.payment_number
){

alert(
"Please add your JazzCash number."
);

window.location.href="/payment-settings";

return;

}

if(
user.payment_method==="Bank"
&&
(
!user.bank_name
||
!user.account_title
||
!user.iban
)
){

alert(
"Please complete your bank account details."
);

window.location.href="/payment-settings";

return;

}
await createWithdrawal({

user_name:name,

amount

});

alert(
"Withdrawal request submitted successfully."
);

setName("");
setAmount("");

}

if(loading){

return(

<div className="p-10">

Loading...

</div>

);

}

return(

<main className="max-w-6xl mx-auto px-6 py-12">

<div className="mb-10">

<p className="text-blue-600 font-semibold uppercase tracking-wider">

Withdraw Center

</p>

<h1 className="text-5xl font-black mt-2">

Request Withdrawal

</h1>

<p className="text-gray-600 mt-4 max-w-2xl leading-7">

Request a withdrawal of your available earnings. Once approved by the company, your payment will be processed.

</p>

</div>

<div className="bg-black text-white rounded-3xl p-8 shadow-lg mb-10">

<p className="text-gray-300">

Available Balance

</p>

<h2 className="text-5xl font-black mt-3">

PKR {balance}

</h2>

</div>

<form
onSubmit={submit}
className="bg-white border rounded-3xl shadow-sm p-8 max-w-xl flex flex-col gap-6"
>

<input
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="Your Name"
className="border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<input
value={amount}
onChange={(e)=>setAmount(e.target.value)}
placeholder="Amount (PKR)"
className="border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<button
type="submit"
className="bg-black text-white rounded-xl py-4 font-bold text-lg hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300 shadow-lg"
>

Request Withdrawal

</button>

</form>
<section className="mt-12">

<div className="mb-8">

<p className="text-blue-600 font-semibold uppercase tracking-wider">

Withdrawal Information

</p>

<h2 className="text-3xl font-black mt-2">

How It Works

</h2>

<p className="text-gray-600 mt-3">

Follow these simple steps to receive your earnings.

</p>

</div>

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

<div className="text-5xl">

📝

</div>

<h3 className="text-2xl font-bold mt-5">

Submit Request

</h3>

<p className="text-gray-600 mt-4 leading-7">

Enter your withdrawal amount and submit your request through Kamyab Hub.

</p>

</div>

<div className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

<div className="text-5xl">

✅

</div>

<h3 className="text-2xl font-bold mt-5">

Company Review

</h3>

<p className="text-gray-600 mt-4 leading-7">

The company verifies your request and approves eligible withdrawals.

</p>

</div>

<div className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

<div className="text-5xl">

💸

</div>

<h3 className="text-2xl font-bold mt-5">

Receive Payment

</h3>

<p className="text-gray-600 mt-4 leading-7">

Once approved, your payment is sent using your selected withdrawal method.

</p>

</div>

</div>

</section>

</main>

);

}