import supabase from "../lib/supabase";

export async function updateStatus(
id,
status
){

// Read current order first
const {
data: order,
error: orderError
} =
await supabase
.from("orders")
.select("*")
.eq("id",id)
.single();

if(orderError || !order){

console.log(orderError);
return;

}

// Prevent duplicate commission
if(
order.status==="delivered"
){

console.log("Order already delivered.");
return;

}

// Update order status
const {
error:updateError
} =
await supabase
.from("orders")
.update({

status

})
.eq(
"id",
id
);

if(updateError){

console.log(updateError);
return;

}

// Credit commission only when delivered
if(
status==="delivered"
){

const {
data:user,
error:userError
} =
await supabase
.from("users")
.select("id,earnings_balance")
.eq(
"email",
order.user_email
)
.single();

if(userError || !user){

console.log(userError);
return;

}

const newBalance =

Number(
user.earnings_balance||0
)
+
Number(
order.profit||0
);

const {
error:balanceError
} =
await supabase
.from("users")
.update({

earnings_balance:newBalance

})
.eq(
"id",
user.id
);

if(balanceError){

console.log(balanceError);

}

}

}