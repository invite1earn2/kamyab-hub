import supabase from "../lib/supabase";
import { OWNER } from "../config/owner";

export async function bootstrapOwner(password = "owner123") {

  // -------------------------
  // Check auth_users
  // -------------------------

  const { data: authUser } = await supabase
    .from("auth_users")
    .select("id")
    .eq("email", OWNER.email)
    .maybeSingle();

  if (!authUser) {

    const { error } = await supabase
      .from("auth_users")
      .insert([{
        email: OWNER.email,
        password
      }]);

    if (error) {

      console.log("Bootstrap auth_users:", error);

      return;

    }

  }

  // -------------------------
  // Check users
  // -------------------------

  const { data: ownerUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", OWNER.email)
    .maybeSingle();

  if (!ownerUser) {

    const { error } = await supabase
      .from("users")
      .insert([{
        email: OWNER.email,
        name: OWNER.name,
        role: OWNER.role,
        subscribed: OWNER.subscribed,
        earnings_balance: OWNER.earnings_balance,
        referral_code: OWNER.referral_code
      }]);

    if (error) {

      console.log("Bootstrap users:", error);

      return;

    }

  }

  console.log("✅ Owner Bootstrap Complete");

}