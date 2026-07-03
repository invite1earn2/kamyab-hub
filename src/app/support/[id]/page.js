"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "../../../lib/supabase";
import { checkOwner } from "../../../services/owner";

export default function Conversation() {

  const params = useParams();

  const conversationId = params.id;

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    if (!checkOwner()) {

      alert("Access Denied");

      window.location.href = "/dashboard";

      return;

    }

    loadMessages();

  }, []);

  async function loadMessages() {

    const { data, error } = await supabase

      .from("support_messages")

      .select("*")

      .eq("conversation_id", conversationId)

      .order("created_at", {

        ascending: true

      });

    if (error) {

      console.log(error);

      return;

    }

    setMessages(data || []);

  }

  return (

    <main className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-black mb-8">

        💬 Support Conversation

      </h1>

      <div className="space-y-4">

        {

          messages.map((item) => (

            <div

              key={item.id}

              className={`rounded-2xl p-5 shadow-sm max-w-3xl ${
                item.sender === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : item.sender === "owner"
                  ? "bg-green-600 text-white"
                  : "bg-white border"
              }`}

            >

              <p className="font-bold mb-2">

                {item.sender.toUpperCase()}

              </p>

              <p className="whitespace-pre-line">

                {item.message}

              </p>

            </div>

          ))

        }

      </div>

    </main>

  );

}