"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import AuthGuard from "../../components/authguard";
import { checkOwner } from "../../services/owner";

export default function PaymentSettings() {

const [loading,setLoading]=useState(true);

const [saving,setSaving]=useState(false);

const [message,setMessage]=useState("");

const [paymentMethod,setPaymentMethod]=useState("");

const [paymentNumber,setPaymentNumber]=useState("");

const [bankName,setBankName]=useState("");

const [accountTitle,setAccountTitle]=useState("");

const [iban,setIban]=useState("");

useEffect(()=>{

load();

},[]);

async function load(){

const userEmail=

localStorage.getItem("user_email");

if(checkOwner()){

window.location.href="/company";

return;

}

const {data}=

await supabase

.from("users")

.select(`
payment_method,
payment_number,
bank_name,
account_title,
iban
`)

.eq("email",userEmail)

.single();

if(data){

setPaymentMethod(

data.payment_method||""

);

setPaymentNumber(

data.payment_number||""

);

setBankName(

data.bank_name||""

);

setAccountTitle(

data.account_title||""

);

setIban(

data.iban||""

);

}

setLoading(false);

}

async function save(){

setSaving(true);

setMessage("");

const userEmail=

localStorage.getItem("user_email");

const {error}=

await supabase

.from("users")

.update({

payment_method:paymentMethod,

payment_number:paymentNumber,

bank_name:bankName,

account_title:accountTitle,

iban:iban

})

.eq("email",userEmail);

if(error){

setMessage(

"Unable to save payment settings."

);

}else{

setMessage(

"Payment settings updated successfully."

);

}

setSaving(false);

}

return(

<AuthGuard>

{

loading

?

<div className="min-h-[70vh] flex items-center justify-center">

<div className="text-center">

<div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

<p className="mt-4 text-gray-600">

Loading Payment Settings...

</p>

</div>

</div>

:

<main className="mx-auto max-w-5xl px-5 py-8 md:px-8">

<div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-8 shadow-sm">

<span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

💳 Payment Settings

</span>

<h1 className="mt-5 text-4xl font-black text-gray-900">

Receive Your Earnings

</h1>

<p className="mt-4 max-w-2xl leading-7 text-gray-700">

Save your payment information once. Every future withdrawal request will use these details, making payouts faster and easier.

</p>

</div>

<div className="mt-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

<h2 className="text-2xl font-bold text-gray-900">

Select Payment Method

</h2>

<p className="mt-2 text-gray-600">

Choose how you want to receive your withdrawals.

</p>

<div className="mt-8 grid gap-4 md:grid-cols-3">

<button

type="button"

onClick={()=>setPaymentMethod("EasyPaisa")}

className={`rounded-2xl border p-5 text-left transition-all ${
paymentMethod==="EasyPaisa"
?
"border-blue-600 bg-blue-50 shadow-md"
:
"border-gray-200 hover:border-blue-300"
}`}

>

<div className="text-3xl">

📱

</div>

<h3 className="mt-4 font-bold">

EasyPaisa

</h3>

</button>

<button

type="button"

onClick={()=>setPaymentMethod("JazzCash")}

className={`rounded-2xl border p-5 text-left transition-all ${
paymentMethod==="JazzCash"
?
"border-blue-600 bg-blue-50 shadow-md"
:
"border-gray-200 hover:border-blue-300"
}`}

>

<div className="text-3xl">

💸

</div>

<h3 className="mt-4 font-bold">

JazzCash

</h3>

</button>

<button

type="button"

onClick={()=>setPaymentMethod("Bank")}

className={`rounded-2xl border p-5 text-left transition-all ${
paymentMethod==="Bank"
?
"border-blue-600 bg-blue-50 shadow-md"
:
"border-gray-200 hover:border-blue-300"
}`}

>

<div className="text-3xl">

🏦

</div>

<h3 className="mt-4 font-bold">

Bank Account

</h3>

</button>

</div>

{

(paymentMethod==="EasyPaisa"||

paymentMethod==="JazzCash")

&&

<div className="mt-10">

<label className="block text-sm font-semibold text-gray-700 mb-2">

Phone Number

</label>

<input

type="text"

value={paymentNumber}

onChange={(e)=>setPaymentNumber(e.target.value)}

placeholder="03XXXXXXXXX"

className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-600"

/>

</div>

}

{

paymentMethod==="Bank"

&&

<div className="mt-10 space-y-6">

<div>

<label className="block text-sm font-semibold text-gray-700 mb-2">

Bank Name

</label>

<input

type="text"

value={bankName}

onChange={(e)=>setBankName(e.target.value)}

placeholder="Meezan Bank"

className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-600"

/>

</div>

<div>

<label className="block text-sm font-semibold text-gray-700 mb-2">

Account Title

</label>

<input

type="text"

value={accountTitle}

onChange={(e)=>setAccountTitle(e.target.value)}

placeholder="Muhammad Ali"

className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-600"

/>

</div>

<div>

<label className="block text-sm font-semibold text-gray-700 mb-2">

IBAN

</label>

<input

type="text"

value={iban}

onChange={(e)=>setIban(e.target.value)}

placeholder="PK36MEZN000123456789"

className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-600"

/>

</div>

</div>

}

{

message

&&

<div className="mt-8 rounded-2xl bg-green-100 px-5 py-4 text-green-700 font-semibold">

{message}

</div>

}

<div className="mt-10">

<button

onClick={save}

disabled={saving}

className="rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 disabled:opacity-50"

>

{

saving

?

"Saving..."

:

"Save Payment Settings"

}

</button>

</div>

</div>

</main>

}

</AuthGuard>

);

}