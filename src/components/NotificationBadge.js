"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { checkOwner } from "../services/owner";

export default function NotificationBadge() {

  const [count, setCount] = useState(0);

  useEffect(() => {

    loadNotifications();

    const interval = setInterval(() => {

      loadNotifications();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  async function loadNotifications() {

    const email = localStorage.getItem("user_email");

    if (!email) return;

    let query = supabase

      .from("notifications")

      .select("*", {

        count: "exact",

        head: true

      })

      .eq("is_read", false);

    if (checkOwner()) {

      query = query.eq("role", "owner");

    } else {

      query = query.eq("user_email", email);

    }

    const { count } = await query;

    setCount(count || 0);

  }

  return (

    <a
      href="/notifications"
      className="relative inline-flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-blue-50"
    >

      <span className="text-xl">

        🔔

      </span>

      <span>

        Notifications

      </span>

      {

        count > 0 && (

          <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">

            {count > 99 ? "99+" : count}

          </span>

        )

      }

    </a>

  );

}