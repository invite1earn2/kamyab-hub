"use client";

import { useEffect, useMemo, useState } from "react";
import supabase from "../../lib/supabase";

export default function LuckySpinHistory() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadHistory();

  }, []);

  async function loadHistory() {

    const email = localStorage.getItem("user_email");

    const { data, error } = await supabase

      .from("spin_history")

      .select("*")

      .eq("user_email", email)

      .order("created_at", { ascending: false });

    if (!error) {

      setHistory(data || []);

    }

    setLoading(false);

  }

  const totalSpins = history.length;

  const totalPoints = useMemo(() => {

    return history.reduce((sum, item) => {

      if (item.reward_code === "POINTS") {

        return sum + Number(item.reward_value || 0);

      }

      return sum;

    }, 0);

  }, [history]);

  const todayRewards = useMemo(() => {

    const today = new Date().toDateString();

    return history.filter(item =>

      new Date(item.created_at).toDateString() === today

    ).length;

  }, [history]);

  function rewardIcon(code) {

    switch (code) {

      case "POINTS":

        return "⭐";

      case "EXTRA_SPIN":

        return "🎡";

      case "BONUS":

        return "🎁";

      case "CASH":

        return "💰";

      default:

        return "🎊";

    }

  }

  function rewardGradient(code) {

    switch (code) {

      case "POINTS":

        return "from-purple-600 to-indigo-700";

      case "EXTRA_SPIN":

        return "from-sky-500 to-cyan-600";

      case "BONUS":

        return "from-yellow-500 to-orange-500";

      case "CASH":

        return "from-green-500 to-emerald-700";

      default:

        return "from-slate-700 to-slate-900";

    }

  }

  function rewardBadge(code) {

    switch (code) {

      case "POINTS":

        return "bg-green-400/20 text-green-300";

      case "EXTRA_SPIN":

        return "bg-blue-400/20 text-blue-300";

      case "BONUS":

        return "bg-yellow-400/20 text-yellow-300";

      case "CASH":

        return "bg-emerald-400/20 text-emerald-300";

      default:

        return "bg-white/10 text-white";

    }

  }

  return (

    <section className="relative mt-10 overflow-hidden rounded-[32px]">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#14042e] via-[#2d1365] to-[#070b25]" />

      <div className="absolute -top-24 -left-16 h-56 w-56 rounded-full bg-fuchsia-600/30 blur-[120px]" />

      <div className="absolute right-0 top-10 h-48 w-48 rounded-full bg-blue-500/30 blur-[110px]" />

      <div className="absolute bottom-0 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-purple-500/20 blur-[100px]" />

      <div className="relative z-10 p-5">

        {/* Heading */}

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-black text-white">

              🎡 Lucky Spin History

            </h2>

            <p className="mt-1 text-xs text-white/60">

              Every spin. Every reward. Every victory.

            </p>

          </div>

          <div className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-xl">

            {totalSpins} Records

          </div>

        </div>

        {/* Summary */}

        <div className="mt-5 grid grid-cols-2 gap-3">

          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">

            <div className="text-3xl">

              🎯

            </div>

            <p className="mt-2 text-xs text-white/60">

              Total Spins

            </p>

            <h3 className="mt-1 text-2xl font-black text-white">

              {totalSpins}

            </h3>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">

            <div className="text-3xl">

              ⭐

            </div>

            <p className="mt-2 text-xs text-white/60">

              Total Points

            </p>

            <h3 className="mt-1 text-2xl font-black text-white">

              {totalPoints}

            </h3>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">

            <div className="text-3xl">

              📅

            </div>

            <p className="mt-2 text-xs text-white/60">

              Today's Rewards

            </p>

            <h3 className="mt-1 text-2xl font-black text-white">

              {todayRewards}

            </h3>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">

            <div className="text-3xl">

              🏆

            </div>

            <p className="mt-2 text-xs text-white/60">

              Latest Reward

            </p>

            <h3 className="mt-1 truncate text-sm font-black text-white">

              {history[0]?.reward_name || "--"}

            </h3>

          </div>

        </div>

        {/* History Grid starts below */}

            {loading ? (

          <div className="py-16 text-center">

            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-purple-400 border-t-transparent"></div>

            <p className="mt-4 text-sm text-white/70">

              Loading your lucky rewards...

            </p>

          </div>

        ) : history.length === 0 ? (

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-10 text-center backdrop-blur-xl">

            <div className="text-6xl">

              🎡

            </div>

            <h3 className="mt-5 text-xl font-black text-white">

              No Lucky Spin History

            </h3>

            <p className="mt-2 text-sm text-white/60">

              Spin the wheel today to start building your reward history.

            </p>

          </div>

        ) : (

          <div className="mt-6 grid grid-cols-2 gap-3">

            {history.map((item) => (

              <div
  key={item.id}
  className="
    rounded-3xl
    border
    border-white/20
    bg-white/10
    backdrop-blur-2xl
    p-3
    shadow-[0_8px_30px_rgba(0,0,0,0.15)]
    transition-all
    duration-300
    hover:bg-white/15
    active:scale-95
    overflow-hidden
    relative
  "
 >          
        <div
  className="absolute inset-0 opacity-20"
  style={{
    background: `linear-gradient(135deg, ${item.color || "#8B5CF6"} 0%, transparent 80%)`
  }}
/>

                <div className="flex items-start justify-between">

                  <div className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-white/20
backdrop-blur-xl
border
border-white/20
shadow-lg
text-3xl
relative
z-10
">

                    {rewardIcon(item.reward_code)}

                  </div>

                  <span
                    className={`
                      rounded-full
                      px-2
                      py-1
                      text-[9px]
                      font-bold
                      ${rewardBadge(item.reward_code)}
                    `}
                  >

                    {item.reward_code}

                  </span>

                </div>

                <div className="mt-4 relative z-10">

  <h3 className="line-clamp-2 text-sm font-bold text-white">

    {item.reward_name}

  </h3>

  <div className="mt-2 text-2xl font-black text-white">

    {item.reward_value}

  </div>

</div>

                <div className="mt-4 border-t border-white/10 pt-3 relative z-10">

                  <div className="text-[10px] text-white/70">

                    📅 {new Date(item.created_at).toLocaleDateString()}

                  </div>

                  <div className="mt-1 text-[10px] text-white/70">

                    🕒 {new Date(item.created_at).toLocaleTimeString([], {

                      hour: "2-digit",

                      minute: "2-digit"

                    })}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

}