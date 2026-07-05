"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../../components/authguard";
import supabase from "../../lib/supabase";

export default function LuckySpin() {

  const [loading,setLoading]=useState(true);

  const [availableSpins,setAvailableSpins]=useState(0);

  const [alreadySpun,setAlreadySpun]=useState(false);

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

        <div className="mt-12 text-center">

          <button

            disabled

            className="rounded-full bg-purple-600 px-12 py-5 text-xl font-bold text-white opacity-60"

          >

            🎡 Spin Now

          </button>

          <p className="mt-5 text-gray-500">

            Wheel animation will be added in the next step.

          </p>

        </div>

      </main>

      }

    </AuthGuard>

  );

}