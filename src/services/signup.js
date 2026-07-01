import supabase from "../lib/supabase";

export async function createUser(data){

const {
data: existing
}

=

await supabase

.from(
"users"
)

.select(
"id"
)

.eq(
"email",
data.email
)

.limit(1);

if(
existing?.length
){

alert(
"Email already registered."
);

return false;

}

const generatedCode=

Math.random()

.toString(36)

.substring(
2,
8
)

.toUpperCase();

const {
data: lastPartner
} =
await supabase
.from("users")
.select("partner_id")
.not("partner_id","is",null)
.order("partner_id",{ ascending:false })
.limit(1)
.single();

let nextPartnerId = "KH002000";

if(lastPartner?.partner_id){

const number =
parseInt(
lastPartner.partner_id.replace("KH","")
);

nextPartnerId =
"KH" +
String(number+1).padStart(6,"0");

}

const payload={

name:
data.name,

email:
data.email,

role:
data.role,

partner_id:
nextPartnerId,

referred_by:
data.referral_code,

referral_code:
generatedCode

};

const {
error
}

=

await supabase

.from(
"users"
)

.insert([
payload
]);

if(
error
){

console.log(
error
);

return false;

}

return true;

}