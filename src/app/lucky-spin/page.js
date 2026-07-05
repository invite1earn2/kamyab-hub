"use client";

import AuthGuard from "../../components/authguard";

export default function LuckySpin() {

  return (

    <AuthGuard>

      <main className="mx-auto max-w-5xl px-6 py-10">

        <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-10 text-white">

          <h1 className="text-4xl font-black">

            🎡 Kamyab Lucky Spin

          </h1>

          <p className="mt-4 text-lg text-purple-100">

            Welcome to Kamyab Lucky Spin.

          </p>

          <p className="mt-2 text-purple-100">

            Soon you'll be able to spin every day and win exciting rewards.

          </p>

        </div>

      </main>

    </AuthGuard>

  );

}