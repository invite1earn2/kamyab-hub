import supabase from "../lib/supabase";
import { getCart, clearCart } from "./cart";

export async function placeCustomerOrder(customer) {
  const cart = getCart();

  if (cart.length === 0) {
    throw new Error("Your cart is empty.");
  }

  for (const item of cart) {
    const { error } = await supabase.from("orders").insert({
      product_name: item.name,
      price: item.price,
      quantity: item.quantity,
      customer_name: customer.name,
      customer_phone: customer.phone,
      customer_city: customer.city,
      customer_address: customer.address,
      notes: customer.notes,
      order_source: "customer",
      profit: 0,
      status: "Pending",
      user_email: null,
    });

    if (error) {
      throw error;
    }
  }

  clearCart();

  return true;
}