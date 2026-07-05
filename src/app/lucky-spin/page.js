"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../../components/authguard";
import supabase from "../../lib/supabase";
import LuckyWheel from "../../components/lucky-spin/LuckyWheel";

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

     <main className="mx-auto max-w-4xl px-4 py-5">

        <div className="rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-5 text-white shadow-lg">

          <h1 className="text-2xl md:text-4xl font-black">

            🎡 Kamyab Lucky Spin

          </h1>

          <p className="mt-2 text-sm md:text-base text-purple-100">

            Spin every day and win exciting rewards.

          </p>

        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">

          <div className="rounded-2xl bg-white p-3 shadow text-center">

<div className="text-2xl">

🟢

</div>

<div className="mt-1 text-sm font-bold">

{

alreadySpun

?

"Used"

:

"Ready"

}

</div>

<div className="text-[11px] text-gray-500">

Status

</div>

</div>

          <div className="rounded-xl bg-white p-3 shadow">

            <p className="text-gray-500 font-semibold">

              Today's Status

            </p>

            <h2 className="mt-1 text-sm font-bold text-center">

              {

              alreadySpun

              ?

              "🔴 Already Used"

              :

              "🟢 Ready"

              }

            </h2>

          </div>

          <div className="rounded-2xl bg-white p-3 shadow text-center">

  <div className="text-2xl">

    📅

  </div>

  <div className="mt-1 text-sm font-bold">

    1/Day

  </div>

  <div className="text-[11px] text-gray-500">

    Limit

  </div>

</div>

        </div>

        <LuckyWheel

  rotation={rotation}

  spinning={spinning}

  onSpin={spinNow}

/>

      </main>

      }

    </AuthGuard>

  );

}