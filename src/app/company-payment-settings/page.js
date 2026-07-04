"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

export default function CompanyPaymentSettings() {

const [loading,setLoading]=useState(true);

const [form,setForm]=useState({

easypaisa_name:"",
easypaisa_number:"",
jazzcash_name:"",
jazzcash_number:"",
bank_name:"",
account_title:"",
account_number:"",
iban:""

});

useEffect(()=>{

load();

},[]);

async function load(){

const { data,error }=
await supabase
.from("company_payment_settings")
.select("*")
.eq("id",1)
.single();

if(data){

setForm(data);

}

setLoading(false);

}

async function save(){

const { error }=
await supabase
.from("company_payment_settings")
.update({

easypaisa_name:form.easypaisa_name,

easypaisa_number:form.easypaisa_number,

jazzcash_name:form.jazzcash_name,

jazzcash_number:form.jazzcash_number,

bank_name:form.bank_name,

account_title:form.account_title,

account_number:form.account_number,

iban:form.iban

})
.eq("id",1);

if(error){

alert("Failed to update settings.");

console.log(error);

return;

}

alert("Company payment settings updated successfully.");

}

if(loading){

return(

<div className="flex min-h-[60vh] items-center justify-center">

Loading...

</div>

);

}

return(

<main className="mx-auto max-w-5xl p-8">

<h1 className="text-4xl font-black">

💳 Company Payment Settings

</h1>

<p className="mt-3 text-gray-600">

These payment details are shown to customers on the subscription page.

</p>

<div className="mt-10 grid gap-6 md:grid-cols-2">

<div>

<label className="mb-2 block font-semibold">

EasyPaisa Account Name

</label>

<input
value={form.easypaisa_name}
onChange={(e)=>
setForm({
...form,
easypaisa_name:e.target.value
})
}
className="w-full rounded-xl border p-3"
/>

</div>

<div>

<label className="mb-2 block font-semibold">

EasyPaisa Number

</label>

<input
value={form.easypaisa_number}
onChange={(e)=>
setForm({
...form,
easypaisa_number:e.target.value
})
}
className="w-full rounded-xl border p-3"
/>

</div>

<div>

<label className="mb-2 block font-semibold">

JazzCash Account Name

</label>

<input
value={form.jazzcash_name}
onChange={(e)=>
setForm({
...form,
jazzcash_name:e.target.value
})
}
className="w-full rounded-xl border p-3"
/>

</div>

<div>

<label className="mb-2 block font-semibold">

JazzCash Number

</label>

<input
value={form.jazzcash_number}
onChange={(e)=>
setForm({
...form,
jazzcash_number:e.target.value
})
}
className="w-full rounded-xl border p-3"
/>

</div>

<div>

<label className="mb-2 block font-semibold">

Bank Name

</label>

<input
value={form.bank_name}
onChange={(e)=>
setForm({
...form,
bank_name:e.target.value
})
}
className="w-full rounded-xl border p-3"
/>

</div>

<div>

<label className="mb-2 block font-semibold">

Account Title

</label>

<input
value={form.account_title}
onChange={(e)=>
setForm({
...form,
account_title:e.target.value
})
}
className="w-full rounded-xl border p-3"
/>

</div>

<div>

<label className="mb-2 block font-semibold">

Account Number

</label>

<input
value={form.account_number}
onChange={(e)=>
setForm({
...form,
account_number:e.target.value
})
}
className="w-full rounded-xl border p-3"
/>

</div>

<div>

<label className="mb-2 block font-semibold">

IBAN

</label>

<input
value={form.iban}
onChange={(e)=>
setForm({
...form,
iban:e.target.value
})
}
className="w-full rounded-xl border p-3"
/>

</div>

</div>

<button
onClick={save}
className="mt-10 rounded-2xl bg-black px-8 py-4 font-bold text-white hover:bg-gray-800"
>

Save Changes

</button>

</main>

);

}