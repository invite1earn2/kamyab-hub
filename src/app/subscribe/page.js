"use client";

import {
useEffect,
useState
}
from "react";

import supabase from "../../lib/supabase";

export default function Subscribe(){

const [transaction,setTransaction]=useState("");
const [loading,setLoading]=useState(true);

useEffect(()=>{

checkSubscription();

},[]);

async function checkSubscription(){

const email=

localStorage.getItem(
"user_email"
);

if(
!email
){

window.location.href=
"/login";

return;

}

const {
data
}

=

await supabase

.from(
"users"
)

.select(
"subscribed"
)

.eq(
"email",
email
)

.single();

if(
data?.subscribed
){

alert(
"Your subscription is already active."
);

window.location.href=
"/dashboard";

return;

}

const {
data: pending
}

=

await supabase

.from(
"subscriptions"
)

.select(
"id"
)

.eq(
"user_email",
email
)

.eq(
"status",
"pending"
)

.limit(1);

if(
pending?.length
){

alert(
"Your payment request is already under review."
);

window.location.href=
"/";

return;

}

setLoading(false);

}

async function submit(){

if(
!transaction.trim()
){

alert(
"Please enter transaction ID."
);

return;

}

const email=

localStorage.getItem(
"user_email"
);

if(
!email
){

window.location.href=
"/login";

return;

}

const {
data: existing
}

=

await supabase

.from(
"subscriptions"
)

.select(
"id"
)

.eq(
"transaction_id",
transaction
)

.limit(1);

if(
existing?.length
){

alert(
"Transaction ID already submitted."
);

return;

}

await supabase

.from(
"subscriptions"
)

.insert([{

user_email:
email,

method:
"EasyPaisa",

account_title:
"Ali Khan",

account_number:
"03024567898",

transaction_id:
transaction

}]);

alert(
"Payment request submitted. Waiting for approval."
);

window.location.href=
"/";

}

if(
loading
){

return(

<main className="p-10">

Checking subscription...

</main>

);

}

return(

<main className="p-10">

<h1 className="text-4xl font-bold">

Activate Your Account

</h1>

<p className="mt-6">

Subscription Fee: 1000 PKR

</p>

<div className="border rounded p-5 mt-6 max-w-xl">

<p>
Method: EasyPaisa
</p>

<p>
Account Title: Ali Khan
</p>

<p>
Number: 03024567898
</p>

</div>

<input
value={transaction}
onChange={
(e)=>
setTransaction(
e.target.value
)
}
placeholder="Transaction ID"
className="border p-3 rounded mt-6 w-full max-w-xl"
/>

<button
onClick={submit}
className="mt-6 bg-black text-white p-4 rounded"
>

Submit Payment

</button>

</main>

);

}