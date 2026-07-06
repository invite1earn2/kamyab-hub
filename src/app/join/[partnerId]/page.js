"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function Join() {

  const params = useParams();

  useEffect(() => {

    const partnerId = params?.partnerId;

    console.log("Partner ID:", partnerId);

    if (partnerId) {

      localStorage.setItem("partner_id", partnerId);

    }

    window.location.replace("/");

  }, [params]);

  return (

    <main className="flex min-h-[60vh] items-center justify-center">

      <div className="text-center">

        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

        <p className="mt-5 text-lg font-semibold text-gray-700">

          Redirecting to Kamyab Hub...

        </p>

      </div>

    </main>

  );

}