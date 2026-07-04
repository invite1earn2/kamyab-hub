"use client";

import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

export default function MyProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    original_price: "",
    category: "",
    short_description: "",
    stock_status: "In Stock"
  });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {

    const email = localStorage.getItem("user_email");

    if (!email) {
      window.location.href = "/login";
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("owner_email", email)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setProducts(data || []);
    }

    setLoading(false);

  }

  async function saveProduct() {

    if (!product.name.trim()) {
      alert("Please enter Product Name.");
      return;
    }

    if (!product.price) {
      alert("Please enter Selling Price.");
      return;
    }

    const email = localStorage.getItem("user_email");

    let imageUrl = "";

    if (selectedImage) {

      const extension =
        selectedImage.name.split(".").pop();

      const fileName =
        email.replace(/[^a-zA-Z0-9]/g, "-") +
        "-" +
        Date.now() +
        "." +
        extension;

      const { error: uploadError } =
        await supabase.storage
          .from("product-images")
          .upload(fileName, selectedImage, {
            upsert: true
          });

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } =
        supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

      imageUrl = data.publicUrl;

    }

    const { error } =
      await supabase
        .from("products")
        .insert({

          name: product.name,
          price: Number(product.price),
          original_price: Number(product.original_price || 0),
          category: product.category,
          short_description: product.short_description,
          stock_status: product.stock_status,

          image_url: imageUrl,

          owner_email: email,

          product_type: "partner",

          status: "active",

          display_order: 999

        });

    if (error) {

      console.log(error);

      alert("Failed to add product.");

      return;

    }

    alert("Product Added Successfully");

    setProduct({
      name: "",
      price: "",
      original_price: "",
      category: "",
      short_description: "",
      stock_status: "In Stock"
    });

    setSelectedImage(null);

    setShowModal(false);

    loadProducts();

  }

  if (loading) {

    return (

      <div className="flex min-h-[60vh] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <p className="mt-4 font-medium text-gray-600">

            Loading Your Products...

          </p>

        </div>

      </div>

    );

  }

  return (

    <main className="mx-auto max-w-7xl p-6 md:p-10">

      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <p className="font-semibold uppercase tracking-wider text-blue-600">

            Partner Store

          </p>

          <h1 className="mt-2 text-4xl font-black">

            My Products

          </h1>

          <p className="mt-3 text-gray-600">

            Manage products that belong to your own store.

          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={loadProducts}
            className="rounded-2xl border px-5 py-3 font-semibold hover:bg-gray-100"
          >

            🔄 Refresh

          </button>

          <button
            onClick={() => setShowModal(true)}
            className="rounded-2xl bg-black px-6 py-3 font-bold text-white hover:bg-gray-800"
          >

            ➕ Add Product

          </button>

        </div>

      </div>

      <div className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">

              Total Products

            </p>

            <h2 className="text-3xl font-black">

              {products.length}

            </h2>

          </div>

          <div className="text-5xl">

            📦

          </div>

        </div>

      </div>

      {products.length === 0 ? (

        <div className="rounded-3xl border border-dashed bg-white py-20 text-center">

          <div className="text-7xl">

            📦

          </div>

          <h2 className="mt-6 text-3xl font-black">

            No Products Yet

          </h2>

          <p className="mt-3 text-gray-600">

            Start building your own store by adding your first product.

          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-8 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white hover:bg-blue-700"
          >

            ➕ Add First Product

          </button>

        </div>

      ) : (

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">

          {products.map((item) => (

            <div
              key={item.id}
              className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="h-60 bg-gray-100">

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

              <div className="p-4">

                <h2 className="line-clamp-2 min-h-[44px] font-bold">

                  {item.name}

                </h2>

                <p className="mt-3 text-2xl font-black text-blue-700">

                  PKR {item.price}

                </p>

                <div className="mt-3">

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                    {item.stock_status || "In Stock"}

                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}
            {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

          <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-black">
                ➕ Add New Product
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-3xl font-bold hover:text-red-600"
              >
                ×
              </button>

            </div>

            <div className="grid gap-5">

              <div>

                <label className="mb-2 block font-medium">
                  Product Name
                </label>

                <input
                  value={product.name}
                  onChange={(e)=>
                    setProduct({
                      ...product,
                      name:e.target.value
                    })
                  }
                  className="w-full rounded-xl border p-3"
                  placeholder="Enter Product Name"
                />

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="mb-2 block font-medium">
                    Selling Price
                  </label>

                  <input
                    type="number"
                    value={product.price}
                    onChange={(e)=>
                      setProduct({
                        ...product,
                        price:e.target.value
                      })
                    }
                    className="w-full rounded-xl border p-3"
                  />

                </div>

                <div>

                  <label className="mb-2 block font-medium">
                    Original Price
                  </label>

                  <input
                    type="number"
                    value={product.original_price}
                    onChange={(e)=>
                      setProduct({
                        ...product,
                        original_price:e.target.value
                      })
                    }
                    className="w-full rounded-xl border p-3"
                  />

                </div>

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Category
                </label>

                <input
                  value={product.category}
                  onChange={(e)=>
                    setProduct({
                      ...product,
                      category:e.target.value
                    })
                  }
                  className="w-full rounded-xl border p-3"
                  placeholder="Example: Face Wash"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Short Description
                </label>

                <textarea
                  rows={4}
                  value={product.short_description}
                  onChange={(e)=>
                    setProduct({
                      ...product,
                      short_description:e.target.value
                    })
                  }
                  className="w-full rounded-xl border p-3"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Stock Status
                </label>

                <select
                  value={product.stock_status}
                  onChange={(e)=>
                    setProduct({
                      ...product,
                      stock_status:e.target.value
                    })
                  }
                  className="w-full rounded-xl border p-3"
                >

                  <option>In Stock</option>

                  <option>Limited Stock</option>

                  <option>Out of Stock</option>

                </select>

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Product Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e)=>setSelectedImage(e.target.files[0])}
                  className="w-full rounded-xl border p-3"
                />

              </div>

            </div>

            <div className="mt-8 flex justify-end gap-4">

              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl border px-6 py-3 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={saveProduct}
                className="rounded-xl bg-black px-6 py-3 font-bold text-white hover:bg-gray-800"
              >
                Save Product
              </button>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}