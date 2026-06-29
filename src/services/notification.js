import supabase from "../lib/supabase";

export async function createNotification({

user_email,

role,

title,

message,

type,

link

}){

const {error}=

await supabase

.from("notifications")

.insert([{

user_email,

role,

title,

message,

type,

link

}]);

if(error){

console.error("Notification Error:", error);

return false;

}

console.log("Notification Created Successfully");
return true;

}

export async function getNotifications(userEmail,role){

let query=

supabase

.from("notifications")

.select("*")

.order("created_at",{ascending:false});

if(role==="owner"){

query=

query.eq("role","owner");

}else{

query=

query.eq("user_email",userEmail);

}

const {data,error}=

await query;

if(error){

console.log(error);

return[];

}

return data||[];

}

export async function markAsRead(id){

await supabase

.from("notifications")

.update({

is_read:true

})

.eq("id",id);

}