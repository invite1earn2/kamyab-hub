"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

export default function LuckySpinHistory() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {

    const email = localStorage.getItem("user_email");

    const { data } = await supabase
      .from("spin_history")
      .select("*")
      .eq("user_email", email)
      .order("created_at", { ascending: false })
      .limit(20);

    setHistory(data || []);
    setLoading(false);
  }

  function badgeColor(type) {

    switch (type) {

      case "POINTS":
        return "bg-green-100 text-green-700";

      case "EXTRA_SPIN":
        return "bg-purple-100 text-purple-700";

      case "BONUS":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }

  }

  return (

    <section className="mt-8">

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-xl font-bold">

          🎁 Lucky Spin History

        </h2>

        <span className="text-xs text-gray-500">

          {history.length} Records

        </span>

      </div>

      {loading ? (

        <div className="text-center py-10">

          Loading...

        </div>

      ) : history.length === 0 ? (

        <div className="rounded-2xl bg-white shadow p-8 text-center">

          <div className="text-5xl">

            🎡

          </div>

          <p className="mt-3 font-semibold">

            No Spin History Yet

          </p>

        </div>

      ) : (

        <div className="grid grid-cols-2 gap-3">

          {history.map((item) => (

            <div
              key={item.id}
              className="rounded-3xl bg-white border border-gray-100 shadow-md p-3 transition hover:shadow-xl"
            >

              <div className="flex justify-between items-start">

                <div className="text-3xl">

                  🎁

                </div>

                <span
                  className={`text-[10px] px-2 py-1 rounded-full font-bold ${badgeColor(item.reward_code)}`}
                >

                  {item.reward_code}

                </span>

              </div>

              <h3 className="mt-3 font-bold text-purple-700">

                {item.reward_name}

              </h3>

              <p className="text-lg font-black mt-1">

                {item.reward_value}
              </p>

              <div className="mt-3 text-[11px] text-gray-500">

                {new Date(item.created_at).toLocaleDateString()}

              </div>

              <div className="text-[11px] text-gray-500">

                {new Date(item.created_at).toLocaleTimeString([], {

                  hour: "2-digit",

                  minute: "2-digit"

                })}

              </div>

            </div>

          ))}

        </div>

      )}

    </section>

  );

}