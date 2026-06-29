"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { checkOwner } from "../../services/owner";
import { createNotification } from "../../services/notification";

export default function Subscription() {

  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {

    if (!checkOwner()) {

      alert("Access Denied");

      window.location.href = "/dashboard";

      return;

    }

    loadSubscriptions();

  }, []);

  async function loadSubscriptions() {

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {

      setSubscriptions(data || []);

    } else {

      console.log(error);

    }

  }

  async function approveSubscription(id, email) {

    const { error: subscriptionError } = await supabase
      .from("subscriptions")
      .update({
        status: "approved"
      })
      .eq("id", id);

    if (subscriptionError) {

      console.log(subscriptionError);

      return;

    }

    const { error: userError } = await supabase
      .from("users")
      .update({
        subscribed: true
      })
      .eq("email", email);

    if (userError) {

      console.log(userError);

      return;

    }

    const result = await createNotification({


  user_email: email,

  role: "partner",

  title: "🎉 Subscription Approved",

  message:
    "Congratulations! Your Kamyab Hub subscription has been approved. You now have full access to the platform.",

  type: "subscription",

  link: "/dashboard"

});

console.log("Notification Result:", result);

    const { data: approvedUser } = await supabase
      .from("users")
      .select("referred_by")
      .eq("email", email)
      .single();

    if (approvedUser?.referred_by) {

      const { data: inviter } = await supabase
        .from("users")
        .select("id,earnings_balance")
        .eq("referral_code", approvedUser.referred_by)
        .single();

      if (inviter) {

        await supabase
          .from("users")
          .update({
            earnings_balance:
              Number(inviter.earnings_balance || 0) + 300
          })
          .eq("id", inviter.id);

      }

    }

    loadSubscriptions();

  }

  return (

    <div style={{ padding: "30px" }}>

      <h1>Subscription Management</h1>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{
          width: "100%",
          marginTop: "20px"
        }}
      >

        <thead>

          <tr>

            <th>User Email</th>
            <th>Transaction ID</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {subscriptions.map((item) => (

            <tr key={item.id}>

              <td>{item.user_email}</td>

              <td>{item.transaction_id}</td>

              <td>{item.method}</td>

              <td>{item.status}</td>

              <td>

                {item.created_at
                  ? new Date(item.created_at).toLocaleString()
                  : ""}

              </td>

              <td>

                {item.status === "pending" ? (

                  <button
                    onClick={() =>
                      approveSubscription(
                        item.id,
                        item.user_email
                      )
                    }
                  >
                    Approve
                  </button>

                ) : (

                  "Approved"

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}