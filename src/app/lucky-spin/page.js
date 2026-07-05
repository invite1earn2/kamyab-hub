"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../../components/authguard";
import supabase from "../../lib/supabase";

export default function LuckySpin() {

  const [loading,setLoading]=useState(true);

  const [availableSpins,setAvailableSpins]=useState(0);

  const [alreadySpun,setAlreadySpun]=useState(false);

  const [rotation,setRotation]=useState(0);

const [spinning,setSpinning]=useState(false);

  useEffect(()=>{

    load();

  },[]);

  async function load(){

    const email=
    localStorage.getItem("user_email");

    const today=
    new Date().toISOString().split("T")[0];

    const { data:spin }=
    await supabase

    .from("user_spin_status")

    .select("*")

    .eq("user_email",email)

    .single();

    if(spin){

      setAvailableSpins(
        Number(spin.available_spins||0)
      );

      if(spin.last_spin_date===today){

        setAlreadySpun(true);

      }

    }

    setLoading(false);

  }
  async function spinNow(){

  if(spinning){

    return;

  }

  setSpinning(true);

  if(alreadySpun){

    alert(
      "You have already used today's Lucky Spin."
    );

    return;

  }

  if(availableSpins<=0){

    alert(
      "You don't have any available spins.\n\nInvite a successful Business Partner to unlock more Lucky Spins."
    );

    return;

  }

  const { data: rewards } =
await supabase

.from("spin_rewards")

.select("*")

.eq(
"is_active",
true
)

.order(
"display_order",
{
ascending:true
}
);

if(!rewards || rewards.length===0){

  alert(
    "No Lucky Spin rewards have been configured."
  );

  return;

}

const totalProbability=

rewards.reduce(

(total,item)=>

total+

Number(item.probability||0),

0

);

const randomNumber=

Math.floor(

Math.random()*

totalProbability

)+1;

let runningTotal=0;

let reward=null;

for(const item of rewards){

runningTotal+=
Number(item.probability||0);

if(randomNumber<=runningTotal){

reward=item;

break;

}

}
console.log(
"Random Number:",
randomNumber
);

const email=
localStorage.getItem(
"user_email"
);

await supabase

.from("spin_history")

.insert([{

user_email:
email,

reward_name:
reward.reward_name,

reward_code:
reward.reward_code,

reward_type:
reward.reward_type,

reward_value:
reward.reward_value

}]);
const today=
new Date()

.toISOString()

.split("T")[0];

await supabase

.from("user_spin_status")

.update({

available_spins:
availableSpins-1,

last_spin_date:
today,

total_spins:1

})

.eq(
"user_email",
email
);
await supabase

.from("spin_rewards")

.update({

win_count:

Number(
reward.win_count||0
)+1

})

.eq(
"id",
reward.id
);
if(
reward.reward_code==="POINTS"
){

const {

data:user

}=

await supabase

.from("users")

.select("reward_points")

.eq(
"email",
email
)

.single();

await supabase

.from("users")

.update({

reward_points:

Number(
user.reward_points||0
)+

Number(
reward.reward_value||0
)

})

.eq(
"email",
email
);

}

if(
reward.reward_code==="EXTRA_SPIN"
){

await supabase

.from("user_spin_status")

.update({

available_spins:

availableSpins

+

Number(
reward.reward_value||1
)

})

.eq(
"user_email",
email
);

}
console.log(
"Selected Reward:",
reward
);

const extraRotation=

3600+

Math.floor(
Math.random()*360
);

setRotation(extraRotation);

await new Promise(

(resolve)=>

setTimeout(
resolve,
5000
)

);

setSpinning(false);

alert(

`🎉 Congratulations!

${reward.reward_name}

${reward.reward_description}`

);

load();
}

  return(

    <AuthGuard>

      {

      loading

      ?

      <div className="min-h-[70vh] flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600">

            Loading Lucky Spin...

          </p>

        </div>

      </div>

      :

      <main className="mx-auto max-w-5xl px-6 py-10">

        <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-10 text-white shadow-xl">

          <h1 className="text-5xl font-black">

            🎡 Kamyab Lucky Spin

          </h1>

          <p className="mt-4 text-lg text-purple-100">

            Spin every day and win exciting rewards.

          </p>

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-8 shadow">

            <p className="text-gray-500 font-semibold">

              Available Spins

            </p>

            <h2 className="mt-4 text-5xl font-black">

              {availableSpins}

            </h2>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow">

            <p className="text-gray-500 font-semibold">

              Today's Status

            </p>

            <h2 className="mt-4 text-2xl font-bold">

              {

              alreadySpun

              ?

              "🔴 Already Used"

              :

              "🟢 Ready"

              }

            </h2>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow">

            <p className="text-gray-500 font-semibold">

              Daily Limit

            </p>

            <h2 className="mt-4 text-2xl font-bold">

              1 Spin

            </h2>

          </div>

        </div>

        <div className="mt-14 flex flex-col items-center">

<div className="relative">

<div className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl">

📍

</div>

<div

style={{

transform:`rotate(${rotation}deg)`,

transition:spinning

?

"transform 5s cubic-bezier(.17,.67,.19,1)"

:

"none"

}}

className="relative h-[420px] w-[420px] rounded-full border-[10px] border-yellow-400 bg-white shadow-2xl overflow-hidden"

>

<div className="absolute inset-0 rounded-full">

<div className="absolute left-1/2 top-0 h-1/2 w-[2px] bg-gray-300 origin-bottom -translate-x-1/2 rotate-0"></div>

<div className="absolute left-1/2 top-0 h-1/2 w-[2px] bg-gray-300 origin-bottom -translate-x-1/2 rotate-45"></div>

<div className="absolute left-1/2 top-0 h-1/2 w-[2px] bg-gray-300 origin-bottom -translate-x-1/2 rotate-90"></div>

<div className="absolute left-1/2 top-0 h-1/2 w-[2px] bg-gray-300 origin-bottom -translate-x-1/2 rotate-[135deg]"></div>

<div className="absolute left-1/2 top-0 h-1/2 w-[2px] bg-gray-300 origin-bottom -translate-x-1/2 rotate-180"></div>

<div className="absolute left-1/2 top-0 h-1/2 w-[2px] bg-gray-300 origin-bottom -translate-x-1/2 rotate-[225deg]"></div>

<div className="absolute left-1/2 top-0 h-1/2 w-[2px] bg-gray-300 origin-bottom -translate-x-1/2 rotate-[270deg]"></div>

<div className="absolute left-1/2 top-0 h-1/2 w-[2px] bg-gray-300 origin-bottom -translate-x-1/2 rotate-[315deg]"></div>

</div>

<div className="absolute inset-0 flex items-center justify-center">

<div className="grid grid-cols-3 gap-6 text-center text-sm font-bold">

<div>🪙 10</div>

<div>🪙 20</div>

<div>🪙 50</div>

<div>🏆 100</div>

<div>🎡 Extra</div>

<div>🎁 Voucher</div>

<div>🚀 Promote</div>

<div>🙂 Try Again</div>

<div>⭐ Bonus</div>

</div>

</div>

<div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500 border-4 border-white shadow-lg"></div>

</div>

</div>

<button
  disabled={spinning}
  onClick={spinNow}
  className="mt-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-5 text-xl font-bold text-white shadow-xl transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {
    spinning
      ? "🎡 SPINNING..."
      : "🎡 SPIN NOW"
  }
</button>

<p className="mt-5 text-gray-500">

Win exciting rewards every day.

</p>

</div>

      </main>

      }

    </AuthGuard>

  );

}