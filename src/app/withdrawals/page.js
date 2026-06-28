"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { updateWithdrawal } from "../../services/withdrawalStatus";
import { checkOwner } from "../../services/owner";

export default function Withdrawals(){

const [rows,setRows]=useState([]);
const [loading,setLoading]=useState(true);

useEffect(()=>{

checkAccess();

},[]);

function checkAccess(){

if(!checkOwner()){

alert("Access Denied");

window.location.href="/dashboard";

return;

}

load();

}

async function load(){

const { data,error }=
await supabase
.from("withdrawals")
.select("*")
.order("created_at",{ascending:false});

if(error){

console.log(error);

return;

}

setRows(data||[]);
setLoading(false);

}

async function approve(id){

const { data: withdrawal }=
await supabase
.from("withdrawals")
.select("*")
.eq("id",id)
.single();

if(!withdrawal){

alert("Withdrawal not found.");

return;

}

if(withdrawal.status==="approved"){

alert("Already approved.");

return;

}


const transactionId=
window.prompt(
"Enter Transaction ID"
);

if(!transactionId){

alert("Transaction ID is required.");

return;

}

const { data:user }=

await supabase

.from("users")

.select("earnings_balance")

.eq("email",withdrawal.user_email)

.single();



if(!user){



alert("User not found.");



return;



}



const newBalance=



Number(user.earnings_balance||0)

-

Number(withdrawal.amount);



await supabase

.from("users")

.update({



earnings_balance:newBalance



})

.eq(

"email",

withdrawal.user_email

);

const ownerEmail=
localStorage.getItem(
"user_email"
);

const { error }=
await supabase
.from("withdrawals")
.update({

status:"approved",

transaction_id:transactionId,

approved_at:new Date().toISOString(),

approved_by:ownerEmail

})
.eq("id",id);

if(error){

alert("Failed to approve withdrawal.");

console.log(error);

return;

}

alert(
"Withdrawal approved successfully."
);

load();

}

if(loading){

return(

<div className="p-10">

Loading...

</div>

);

}

return(

<main className="p-10">

<div className="mb-10">

<p className="text-blue-600 font-semibold uppercase tracking-wider">

Finance Center

</p>

<h1 className="text-4xl font-black mt-2">

Withdrawal Management

</h1>

<p className="text-gray-600 mt-3">

Review, approve and manage Business Partner withdrawal requests.

</p>

</div>

<div className="overflow-x-auto rounded-2xl border shadow-sm">

<table className="min-w-full bg-white">

<thead className="bg-gray-100">

<tr>

<th>User Email</th>

<th>Amount</th>

<th>Method</th>

<th>Payment Details</th>

<th>Status</th>

<th>Date</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{rows.map((item)=>(

<tr
key={item.id}
className="border-t hover:bg-gray-50"
>

<td>{item.user_email}</td>

<td>

PKR {item.amount}

</td>

<td className="p-4">

<span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

{item.payment_method || "Not Provided"}

</span>

</td>

<td className="p-4">

{

item.payment_method==="EasyPaisa"

&&

<div>

<p className="font-semibold">

📱 EasyPaisa

</p>

<p className="text-sm text-gray-600">

{item.payment_number}

</p>

</div>

}

{

item.payment_method==="JazzCash"

&&

<div>

<p className="font-semibold">

💸 JazzCash

</p>

<p className="text-sm text-gray-600">

{item.payment_number}

</p>

</div>

}

{

item.payment_method==="Bank"

&&

<div className="space-y-1 text-sm">

<p>

🏦 {item.bank_name}

</p>

<p>

👤 {item.account_title}

</p>

<p className="break-all">

{item.iban}

</p>

</div>

}

</td>

<td className="p-4">

{

item.status==="pending"

?

<span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">

Pending

</span>

:

<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

Approved

</span>

}

</td>
<td>

{item.created_at
?new Date(item.created_at).toLocaleString()
:""}

</td>

<td>

{item.status==="pending"

?

<button
onClick={()=>
approve(item.id)
}
className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
>

Approve

</button>

:

"Approved"

}

</td>

</tr>

))}

</tbody>

</table>

</div>

</main>

);

}