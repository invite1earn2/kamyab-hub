"use client";

import { useEffect } from "react";

export default function Join({ params }) {

  useEffect(() => {

    if (params?.partnerId) {

      localStorage.setItem(
        "partner_id",
        params.partnerId
      );

    }

    window.location.href = "/signup";

  }, [params]);

  return (

    <main className="p-10 text-center">

      Redirecting...

    </main>

  );

}