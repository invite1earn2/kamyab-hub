"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export default function WhatsAppFloat() {

  const [community, setCommunity] = useState(null);

  useEffect(() => {

    loadCommunity();

  }, []);

  async function loadCommunity() {

    const { data } = await supabase
      .from("whatsapp_settings")
      .select("*")
      .eq("id", 1)
      .single();

    setCommunity(data);

  }

  if (!community || !community.is_enabled) {

    return null;

  }

  return (

    <a
      href={community.community_link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join WhatsApp Community"
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[9999]"
    >

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.55)] active:scale-95">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-9 w-9 fill-white"
        >

          <path d="M16 .4C7.4.4.4 7.3.4 15.9c0 2.8.7 5.4 2.1 7.8L0 32l8.5-2.2c2.2 1.2 4.8 1.9 7.5 1.9 8.6 0 15.6-6.9 15.6-15.5S24.6.4 16 .4zm0 28.5c-2.4 0-4.7-.6-6.8-1.8l-.5-.3-5 1.3 1.3-4.9-.3-.5c-1.3-2.1-1.9-4.4-1.9-6.8C2.8 8.8 8.8 2.8 16 2.8s13.2 6 13.2 13.1S23.2 28.9 16 28.9zm7.2-9.8c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.2.3-.9 1.2-1.1 1.5-.2.2-.4.3-.7.1-.3-.2-1.4-.5-2.7-1.7-1-1-1.7-2.2-1.9-2.6-.2-.3 0-.5.2-.7.2-.2.3-.4.5-.6.2-.2.2-.4.3-.6.1-.2 0-.5 0-.6 0-.2-.8-2-1.2-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.5-.3.3-1.2 1.2-1.2 3s1.2 3.5 1.4 3.7c.2.2 2.3 3.6 5.7 5 .8.3 1.5.5 2 .7.8.2 1.6.2 2.2.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.2-.7-.4z" />

        </svg>

      </div>

    </a>

  );

}