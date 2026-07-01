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
  console.log("=== APPROVE STARTED ===");
console.log("Subscription ID:", id);
console.log("User Email:", email);

   const { data: subscription, error: loadError } = await supabase
  .from("subscriptions")
  .select("status")
  .eq("id", id)
  .single();

if (loadError) {

  console.log(loadError);

  return;

}

if (subscription.status === "approved") {

  alert("This subscription has already been approved.");

  return;

}

const { data: updatedSubscription, error: subscriptionError } = await supabase
  .from("subscriptions")
  .update({
    status: "approved"
  })
  .eq("id", id)
  .eq("status", "pending")
  .select();

if (subscriptionError) {

  console.log(subscriptionError);

  return;

}

if (!updatedSubscription || updatedSubscription.length === 0) {

  alert("This subscription has already been processed.");

  return;

}
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
      console.log("User subscription updated successfully.");

    if (userError) {

      console.log(userError);

      return;

    }
    console.log("User subscription updated successfully.");

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
      console.log("Approved User:", approvedUser);

    if (approvedUser?.referred_by) {

      let inviter = null;

if (approvedUser.referred_by.startsWith("KH")) {

  const { data } = await supabase
    .from("users")
    .select("id, earnings_balance, lifetime_earnings, total_referrals")
    .eq("partner_id", approvedUser.referred_by)
    .single();

  inviter = data;

} else {

  const { data } = await supabase
    .from("users")
    .select("id, earnings_balance, lifetime_earnings, total_referrals")
    .eq("referral_code", approvedUser.referred_by)
    .single();

  inviter = data;

}

console.log("Inviter:", inviter);
      if (inviter) {

  const { data: updatedInviter, error: inviterError } = await supabase
    .from("users")
    .update({

      earnings_balance:
        Number(inviter.earnings_balance || 0) + 300,

      lifetime_earnings:
        Number(inviter.lifetime_earnings || 0) + 300,

      total_referrals:
        Number(inviter.total_referrals || 0) + 1

    })
    .eq("id", inviter.id)
    .select();

  console.log("Updated Inviter:", updatedInviter);
console.log("Inviter Update Error:", inviterError);

}   // closes if (inviter)

}   // closes if (approvedUser?.referred_by)

console.log("Updating platform_stats...");
    const { data: stats } = await supabase
  .from("platform_stats")
  .select("*")
  .eq("id", 1)
  .single();

await supabase
  .from("platform_stats")
  .update({

    total_revenue:
      Number(stats.total_revenue || 0) + 699,

    total_members:
      Number(stats.total_members || 0) + 1

  })
  .eq("id", 1);

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