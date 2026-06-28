import supabase from "../lib/supabase";

export async function createWithdrawal(data){

const userEmail=

localStorage.getItem(
"user_email"
);

const {data:user,error:userError}=

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

if(userError){

console.log(userError);

return false;

}

const {error}=

await supabase

.from("withdrawals")

.insert([{

...data,

user_email:userEmail,

payment_method:user.payment_method,

payment_number:user.payment_number,

bank_name:user.bank_name,

account_title:user.account_title,

iban:user.iban

}]);

if(error){

console.log(error);

return false;

}

return true;

}