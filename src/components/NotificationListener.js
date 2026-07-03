"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { checkOwner } from "../services/owner";
import NotificationToast from "./NotificationToast";

export default function NotificationListener(){

const [toast,setToast]=useState({

show:false,

title:"",

message:"",

link:"/notifications"

});

useEffect(()=>{

const email=

localStorage.getItem(
"user_email"
);

if(!email){

return;

}

const role=

checkOwner()
?
"owner"
:
"partner";

const channel=

supabase

.channel(

`notifications-${role}-${email}`

)

.on(

"postgres_changes",

{

event:"INSERT",

schema:"public",

table:"notifications"

},

(payload)=>{

const notification=

payload.new;

if(

role==="owner"

){

if(

notification.role!=="owner"

){

return;

}

}else{

if(

notification.user_email!==email

){

return;

}

}

setToast({

show:true,

title:notification.title,

message:notification.message,

link:notification.link||"/notifications"

});

}

)

.subscribe();

return()=>{

supabase.removeChannel(channel);

};

},[]);
function closeToast(){

setToast((prev)=>({

...prev,

show:false

}));

}

function viewNotification(){

window.location.href=

toast.link||"/notifications";

}

return(

<NotificationToast

show={toast.show}

title={toast.title}

message={toast.message}

onClose={closeToast}

onView={viewNotification}

/>

);

}