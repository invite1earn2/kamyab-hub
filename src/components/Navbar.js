"use client";

import {
useEffect,
useState
}
from "react";

export default function Navbar(){

const [
user,
setUser
]=
useState("");

const [
isCompany,
setIsCompany
]=
useState(false);

useEffect(()=>{

const email=
localStorage.getItem(
"user_email"
);

const role=
localStorage.getItem(
"user_role"
);

if(email){

setUser(
email.split("@")[0]
);

}

setIsCompany(
role==="owner"
);

},[]);

function logout(){

localStorage.removeItem(
"user_email"
);

localStorage.removeItem(
"user_id"
);

localStorage.removeItem(
"user_role"
);

window.location.href="/login";

}

return(

<nav className="p-5 border-b flex justify-between items-center">

<div>

<h1 className="font-bold text-xl">

Referral Plus

</h1>

{

user&&

<>

<p className="text-sm">

Hi, {user}

</p>

<p
className="text-xs font-semibold text-gray-600"
>

{

isCompany

?

"👑 Platform Owner"

:

"🤝 Business Partner"

}

</p>

</>

}

</div>

<div className="flex gap-5 flex-wrap items-center">

<a href="/">
Home
</a>

{

!user&&

<>

<a href="/signup">
Signup
</a>

<a href="/login">
Login
</a>

</>

}

{

user&&isCompany&&

<>

<a href="/company">
Company Dashboard
</a>

<a href="/company-products">
Product Management
</a>

<a href="/dashboard">
Dashboard
</a>

<a href="/products">
Products
</a>

<a href="/invite">
Invite
</a>

<a href="/orders">
Orders
</a>

<a href="/analytics">
Analytics
</a>

<a href="/subscriptions">
Subscriptions
</a>

<a href="/company-orders">
Company Orders
</a>

<a href="/withdrawals">
Withdrawal Management
</a>

<button
onClick={logout}
>

Logout

</button>

</>

}

{

user&&!isCompany&&

<>

<a href="/dashboard">
Dashboard
</a>

<a href="/products">
Products
</a>

<a href="/invite">
Invite
</a>

<a href="/orders">
Orders
</a>

<a href="/withdraw">
Withdraw
</a>

<a href="/analytics">
Analytics
</a>

<a href="/my-withdrawals">
My Withdrawals
</a>

<button
onClick={logout}
>

Logout

</button>

</>

}

</div>

</nav>

);

}