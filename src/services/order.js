import supabase from "../lib/supabase";

export async function createOrder(
product
){

const userEmail =

localStorage.getItem(
"user_email"
);

const { error } =

await supabase

.from("orders")

.insert([{

product_name:
product.name,

price:
product.price,

profit:
product.profit,

user_email:
userEmail,

status:
"pending"

}]);

if(error){

console.log(error);

return false;

}

return true;

}