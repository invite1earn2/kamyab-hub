import supabase from "../lib/supabase";

export async function createWithdrawal(
data
){

const userEmail =

localStorage.getItem(
"user_email"
);

const { error } =

await supabase

.from(
"withdrawals"
)

.insert([{

...data,

user_email:

userEmail

}]);

if(error){

console.log(
error
);

return false;

}

return true;

}