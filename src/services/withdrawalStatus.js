import supabase from "../lib/supabase";

export async function updateWithdrawal(
id,
status
){

const { error } =
await supabase
.from(
"withdrawals"
)
.update({

status

})
.eq(
"id",
id
);

if(error){

console.log(
error
);

}

}