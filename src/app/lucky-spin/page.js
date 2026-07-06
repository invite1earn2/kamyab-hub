"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../../components/authguard";
import supabase from "../../lib/supabase";
import LuckyWheel from "../../components/lucky-spin/LuckyWheel";
import WinnerModal from "../../components/lucky-spin/WinnerModal";
import LuckySpinHistory from "../../components/lucky-spin/LuckySpinHistory";

export default function LuckySpin() {

  const [loading, setLoading] = useState(true);

  const [availableSpins, setAvailableSpins] = useState(0);

  const [alreadySpun, setAlreadySpun] = useState(false);

  const [rotation, setRotation] = useState(0);

  const [spinning, setSpinning] = useState(false);

  const [showWinner, setShowWinner] = useState(false);

  const [winner, setWinner] = useState(null);

  const [showHistory, setShowHistory] = useState(false);

  // Dynamic Rewards

  const [rewards, setRewards] = useState([]);

  // Dynamic Settings

  const [spinSettings, setSpinSettings] = useState(null);

  useEffect(() => {

    load();

  }, []);

  async function load() {

    const email = localStorage.getItem("user_email");

    const today =
      new Date().toISOString().split("T")[0];

    // User Spin Status

    const { data: spin } =
      await supabase

        .from("user_spin_status")

        .select("*")

        .eq("user_email", email)

        .single();

    if (spin) {

      setAvailableSpins(

        Number(spin.available_spins || 0)

      );

      if (spin.last_spin_date === today) {

        setAlreadySpun(true);

      } else {

        setAlreadySpun(false);

      }

    }

    // Dynamic Rewards

    const { data: rewardsData } =
      await supabase

        .from("spin_rewards")

        .select("*")

        .eq("is_active", true)

        .order("display_order", {

          ascending: true

        });

    setRewards(rewardsData || []);

    // Dynamic Spin Settings

    const { data: settings } =
      await supabase

        .from("spin_settings")

        .select("*")

        .single();

    setSpinSettings(settings);

    setLoading(false);
 }

  async function spinNow() {

  if (spinning) return;

  setSpinning(true);

  const email = localStorage.getItem("user_email");

  if (alreadySpun) {

  alert("You have already used today's Lucky Spin.");

  setSpinning(false);

  return;

}

  if (availableSpins <= 0) {

  alert(

`🔒 Lucky Spin Locked

You have used all your Lucky Spins.

Invite 1 successful Business Partner

to unlock ${spinSettings?.referral_bonus_spins || 4} more Lucky Spins.`

  );

  setSpinning(false);

  return;

}

  if (rewards.length === 0) {

    alert("Lucky Spin rewards are not configured.");

    setSpinning(false);

    return;

  }

  const totalProbability = rewards.reduce(

    (total, item) => total + Number(item.probability || 0),

    0

  );

  const randomNumber =

    Math.floor(Math.random() * totalProbability) + 1;

  let runningTotal = 0;

  
let reward = null;
let rewardIndex = 0;

for (let i = 0; i < rewards.length; i++) {

  runningTotal += Number(rewards[i].probability || 0);

  if (randomNumber <= runningTotal) {

    reward = rewards[i];

    rewardIndex = i;

    break;

  }

}
  
  if (!reward) {

    setSpinning(false);

    return;

  }

  console.log("Winner:", reward);

  await supabase

    .from("spin_history")

    .insert([{

      user_email: email,

      reward_name: reward.reward_name,

      reward_code: reward.reward_code,

      reward_type: reward.reward_type,

      reward_value: reward.reward_value

    }]);

  const today =

  new Date().toISOString().split("T")[0];

const updateData = {

  available_spins: availableSpins - 1,

  last_spin_date: today,

  total_spins: 1

};

await supabase

  .from("user_spin_status")

  .update(updateData)

  .eq("user_email", email);

  await supabase

    .from("spin_rewards")

    .update({

      win_count:

        Number(reward.win_count || 0) + 1

    })

    .eq("id", reward.id);

  // Reward Logic

  if (reward.reward_code === "POINTS") {

    const { data: user } =

      await supabase

        .from("users")

        .select("reward_points")

        .eq("email", email)

        .single();

    await supabase

      .from("users")

      .update({

        reward_points:

          Number(user.reward_points || 0) +

          Number(reward.reward_value || 0)

      })

      .eq("email", email);

  }

  if (reward.reward_code === "EXTRA_SPIN") {

    await supabase

      .from("user_spin_status")

      .update({

        available_spins:

          availableSpins +

          Number(reward.reward_value || 1)

      })

      .eq("user_email", email);

  }

  // Future Reward Types

  if (reward.reward_code === "VOUCHER") {

    console.log("Voucher Won");

  }

  if (reward.reward_code === "REFERRAL_BOOSTER") {

    console.log("Referral Booster Won");

  }

  if (reward.reward_code === "NONE") {

    console.log("Better Luck Next Time");

  }

  const sliceAngle = 360 / rewards.length;

// Pointer is at the top (12 o'clock)
const pointerOffset = 270;

// Center of the winning slice
const targetAngle =
pointerOffset -
(rewardIndex * sliceAngle) -
(sliceAngle / 2);

// Add multiple full rotations for animation
const finalRotation =
3600 + targetAngle;

setRotation(finalRotation);

  await new Promise(

    resolve =>

      setTimeout(resolve, 5000)

  );

  setSpinning(false);

  setWinner(reward);

  setShowWinner(true);

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

          {spinSettings?.wheel_title || "🎡 Kamyab Lucky Spin"}

        </h1>

        <p className="mt-2 text-sm md:text-base text-purple-100">

          {spinSettings?.wheel_subtitle || "Spin every day and win exciting rewards."}

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

            {spinSettings?.spins_per_day || 1}/Day

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

        rewards={rewards}

      />

      <div

        onClick={() => setShowHistory(!showHistory)}

        className="

          mt-6

          cursor-pointer

          rounded-2xl

          border

          border-purple-200

          bg-gradient-to-r

          from-purple-600

          via-pink-600

          to-indigo-600

          p-4

          text-white

          shadow-lg

          transition

          hover:scale-[1.01]

          active:scale-95

        "

      >

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-lg font-bold">

              {spinSettings?.history_title || "🎁 Lucky Spin History"}

            </h3>

            <p className="text-xs text-purple-100">

              {spinSettings?.history_subtitle || "View all your previous rewards"}

            </p>

          </div>

          <div className="text-2xl">

            {showHistory ? "▲" : "▼"}

          </div>

        </div>

      </div>

      {

      showHistory &&

      <LuckySpinHistory />

      }

    </main>

    }

    <WinnerModal

      open={showWinner}

      reward={winner}

      onClose={()=>

        setShowWinner(false)

      }

    />

  </AuthGuard>

);

}