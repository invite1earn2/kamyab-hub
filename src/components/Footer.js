"use client";

import Link from "next/link";

export default function Footer() {

  const quickLinks = [

    {
      name: "Home",
      href: "/",
    },

    {
      name: "Products",
      href: "/products",
    },

    {
      name: "Signup",
      href: "/signup",
    },

    {
      name: "Login",
      href: "/login",
    },

    {
      name: "Become a Business Partner",
      href: "/subscribe",
    },

  ];

  const companyLinks = [

    {
      name: "About Us",
      href: "/about",
    },

    {
      name: "Privacy Policy",
      href: "/privacy-policy",
    },

    {
      name: "Terms & Conditions",
      href: "/terms",
    },

    {
      name: "Refund Policy",
      href: "/refund-policy",
    },

    {
      name: "Contact Us",
      href: "/contact",
    },

    {
      name: "FAQ",
      href: "/faq",
    },

  ];

  return (

    <footer className="mt-20 border-t-4 border-blue-600 bg-white">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* ===========================
              BRAND
          =========================== */}

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-2xl font-black text-white shadow-lg">

                KH

              </div>

              <div>

                <h2 className="text-2xl font-black text-gray-900">

                  Kamyab Hub

                </h2>

                <p className="text-sm font-medium text-blue-600">

                  Har Qadam Kamyabi Ki Taraf

                </p>

              </div>

            </div>

            <p className="mt-6 leading-8 text-gray-600">

              Start your online business with Kamyab Hub and
              grow through referrals, product sales and smart
              business opportunities.

            </p>

            <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">

              <p className="font-bold text-blue-700">

                💰 Earn PKR 300

              </p>

              <p className="mt-2 text-sm leading-7 text-gray-600">

                Earn PKR 300 for every successful Business
                Partner you invite and build a sustainable
                online income.

              </p>

            </div>

          </div>

          {/* ===========================
              QUICK LINKS
          =========================== */}

          <div>

            <h3 className="text-lg font-black text-gray-900">

              Quick Links

            </h3>

            <div className="mt-6 flex flex-col gap-4">

              {quickLinks.map((link) => (

                <Link
                  key={link.name}
                  href={link.href}
                  className="font-medium text-gray-600 transition hover:translate-x-1 hover:text-blue-600"
                >

                  {link.name}

                </Link>

              ))}

            </div>


          </div>

        </div>

                <div className="mt-16 border-t border-gray-200 pt-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-lg font-bold text-gray-900">

                Build Your Future with Kamyab Hub 🚀

              </p>

              <p className="mt-2 max-w-2xl text-gray-600">

                Become a Business Partner, earn through successful referrals,
                sell quality products, and grow your online business with
                confidence.

              </p>

            </div>

            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-700"
            >

              Become a Business Partner

            </Link>

          </div>

        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="font-semibold text-gray-900">

                © 2026 Kamyab Hub. All Rights Reserved.

              </p>

              <p className="mt-2 text-sm text-gray-500">

                Kamyab Hub is committed to providing a secure and transparent
                platform for Business Partners across Pakistan.

              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">

                🔒 Secure Platform

              </span>

              <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">

                🇵🇰 Proudly Built in Pakistan

              </span>

            </div>

          </div>

        </div>

      </div>

    </footer>

  );

}