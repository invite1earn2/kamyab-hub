import supabase from "../lib/supabase";
import { OWNER } from "../config/owner";

export async function register(
email,
password
){

const {
data: existing
} =
await supabase
.from("auth_users")
.select("id")
.eq("email",email)
.limit(1);

if(existing?.length){

alert("Email already registered.");

return false;

}

const {
error
} =
await supabase
.from("auth_users")
.insert([{

email,
password

}]);

if(error){

console.log(error);

return false;

}

return true;

}

export async function login(
email,
password
){

// Check login credentials
const {
data: authUser,
error: authError
} =
await supabase
.from("auth_users")
.select("*")
.eq("email",email)
.eq("password",password)
.single();
if(email===OWNER.email){

const { data: owner }=
await supabase
.from("users")
.select("id")
.eq("email",OWNER.email)
.single();

if(!owner){

const { error }=
await supabase
.from("users")
.insert([{

email:OWNER.email,

name:OWNER.name,

role:OWNER.role,

subscribed:OWNER.subscribed,

earnings_balance:OWNER.earnings_balance,

referral_code:OWNER.referral_code

}]);

if(error){

console.log(error);

return false;

}

}

}

if(authError){

console.log(authError);

return false;

}

// Get user profile
const {
data: user,
error: userError
} =
await supabase
.from("users")
.select("id,email,role")
.eq("email",email)
.single();

if(userError){

console.log(userError);

return false;

}

return{

id:user.id,
email:user.email,
role:user.role

};

}