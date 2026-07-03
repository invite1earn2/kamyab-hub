"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "../../../lib/supabase";
import { checkOwner } from "../../../services/owner";
import { createNotification } from "../../../services/notification";

export default function Conversation() {

  const params = useParams();

  const conversationId = params.id;

  const [messages, setMessages] = useState([]);

  const [reply, setReply] = useState("");

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {

    if (!checkOwner()) {

      alert("Access Denied");

      window.location.href = "/dashboard";

      return;

    }

    loadConversation();

  }, []);

  async function loadConversation() {

    const { data: conversation } = await supabase

      .from("support_conversations")

      .select("user_email")

      .eq("id", conversationId)

      .single();

    if (conversation) {

      setUserEmail(conversation.user_email);

    }

    await loadMessages();

  }

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

  async function sendReply() {

    if (!reply.trim()) {

      return;

    }

    const { error } = await supabase

      .from("support_messages")

      .insert([{

        conversation_id: conversationId,

        user_email: userEmail,

        sender: "owner",

        message: reply

      }]);

    if (error) {

      console.log(error);

      return;

    }

    await createNotification({

user_email:userEmail,

role:"partner",

title:"💬 Support Reply",

message:"Kamyab Hub Support replied to your message.",

type:"support",

link:"/help"

});

setReply("");

await loadMessages();

  }

  return (

    <main className="max-w-5xl mx-auto p-8">

      <h1 className="mb-8 text-4xl font-black">

        💬 Support Conversation

      </h1>

      <div className="space-y-4">

        {messages.map((item) => (

          <div

            key={item.id}

            className={`max-w-3xl rounded-2xl p-5 shadow-sm ${
              item.sender === "user"
                ? "ml-auto bg-blue-600 text-white"
                : item.sender === "owner"
                ? "bg-green-600 text-white"
                : "border bg-white"
            }`}

          >

            <p className="mb-2 font-bold">

              {item.sender.toUpperCase()}

            </p>

            <p className="whitespace-pre-line">

              {item.message}

            </p>

          </div>

        ))}

      </div>

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

        <h2 className="mb-4 text-xl font-bold">

          Reply to User

        </h2>

        <textarea

          value={reply}

          onChange={(e) => setReply(e.target.value)}

          placeholder="Type your reply..."

          rows={5}

          className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"

        />

        <button

          onClick={sendReply}

          className="mt-5 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"

        >

          Send Reply

        </button>

      </div>

    </main>

  );

}