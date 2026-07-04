"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "../../../lib/supabase";
import { addToCart } from "../../../services/cart";

export default function PartnerStore() {

  const { partnerId } = useParams();

  const [partner, setPartner] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (partnerId) {
      loadStore();
    }

  }, [partnerId]);

  async function loadStore() {

    const { data: user, error: userError } =
      await supabase
        .from("users")
        .select("*")
        .eq("partner_id", partnerId)
        .single();

    if (userError || !user) {
      setLoading(false);
      return;
    }

    setPartner(user);

    const { data: items } =
      await supabase
        .from("products")
        .select("*")
        .eq("owner_email", user.email)
        .eq("status", "active")
        .order("created_at", { ascending: false });

    setProducts(items || []);

    setLoading(false);

  }

  function addProduct(item) {
    addToCart(item, 1);
    window.location.href = "/cart";
  }

  function discount(item) {

    if (
      !item.original_price ||
      Number(item.original_price) <= Number(item.price)
    ) {
      return null;
    }

    return Math.round(
      ((item.original_price - item.price) /
        item.original_price) *
        100
    );

  }

  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <p className="mt-5">

            Loading Store...

          </p>

        </div>

      </div>

    );

  }

  if (!partner) {

    return (

      <main className="p-10 text-center">

        <h1 className="text-4xl font-black">

          Store Not Found

        </h1>

      </main>

    );

  }

  return (

    <main className="mx-auto max-w-7xl p-6 md:p-10">

      <div className="mb-10 rounded-3xl bg-gradient-to-r from-blue-600 to-black p-8 text-white">

        <p className="uppercase tracking-widest text-blue-100">

          Business Partner Store

        </p>

        <h1 className="mt-2 text-5xl font-black">

          🏪 {partner.name}

        </h1>

        <div className="mt-6 grid gap-4 md:grid-cols-4">

          <div>

            <p className="text-blue-100 text-sm">

              Partner ID

            </p>

            <h3 className="font-bold">

              {partner.partner_id}

            </h3>

          </div>

          <div>

            <p className="text-blue-100 text-sm">

              Products

            </p>

            <h3 className="font-bold">

              {products.length}

            </h3>

          </div>

          <div>

            <p className="text-blue-100 text-sm">

              Total Referrals

            </p>

            <h3 className="font-bold">

              {partner.total_referrals || 0}

            </h3>

          </div>

          <div>

            <p className="text-blue-100 text-sm">

              Lifetime Earnings

            </p>

            <h3 className="font-bold">

              PKR {partner.lifetime_earnings || 0}

            </h3>

          </div>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3">

        {products.map((item) => {

          const off = discount(item);

          return (

            <div
              key={item.id}
              className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="h-56 overflow-hidden bg-gray-100 sm:h-64 md:h-72">

                {item.image_url ? (

                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />

                ) : (

                  <div className="flex h-full items-center justify-center text-6xl">

                    📦

                  </div>

                )}

              </div>

              <div className="p-3">

                <h2 className="min-h-[40px] font-bold">

                  {item.name}

                </h2>

                <p className="mt-2 text-xl font-black text-blue-700">

                  PKR {item.price}

                </p>

                {off && (

                  <div className="mt-1 flex items-center gap-2">

                    <span className="text-sm line-through text-gray-400">

                      PKR {item.original_price}

                    </span>

                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-600">

                      {off}% OFF

                    </span>

                  </div>

                )}

                <div className="mt-2">

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                    {item.stock_status}

                  </span>

                </div>

                <button
                  onClick={() => addProduct(item)}
                  disabled={item.stock_status === "Out of Stock"}
                  className={`mt-4 w-full rounded-2xl py-3 font-bold text-white ${
                    item.stock_status === "Out of Stock"
                      ? "bg-gray-400"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >

                  {item.stock_status === "Out of Stock"
                    ? "Out of Stock"
                    : "🛒 Add to Cart"}

                </button>

              </div>

            </div>

          );

        })}

      </div>

    </main>

  );

}