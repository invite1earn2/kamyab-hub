"use client";

import { useEffect } from "react";

export default function AuthGuard({
children
}){

useEffect(()=>{

const user =
localStorage.getItem(
"user_email"
);

if(!user){

window.location.href =
"/login";

}

},[]);

if(
typeof window !==
"undefined"
){

const user =
localStorage.getItem(
"user_email"
);

if(!user){

return null;

}

}

return children;

}