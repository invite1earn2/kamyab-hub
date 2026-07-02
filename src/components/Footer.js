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

      <div className="mx-auto max-w-6xl px-6 py-16">

        <div className="grid max-w-3xl mx-auto gap-12 md:grid-cols-2">

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-black text-gray-900">

              Quick Links

            </h3>

            <div className="mt-6 flex flex-col gap-4">

              {quickLinks.map((link) => (

                <Link
                  key={link.name}
                  href={link.href}
                  className="font-medium text-gray-600 transition-all duration-300 hover:text-blue-600 hover:translate-x-1"
                >

                  {link.name}

                </Link>

              ))}

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-xl font-black text-gray-900">

              Company

            </h3>

            <div className="mt-6 flex flex-col gap-4">

              {companyLinks.map((link) => (

                <Link
                  key={link.name}
                  href={link.href}
                  className="font-medium text-gray-600 transition-all duration-300 hover:text-blue-600 hover:translate-x-1"
                >

                  {link.name}

                </Link>

              ))}

            </div>

          </div>

        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="font-semibold text-gray-900">

                © 2026 Kamyab Hub. All Rights Reserved.

              </p>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-500">

                Kamyab Hub is committed to providing a secure,
                transparent and professional platform for
                Business Partners across Pakistan.

              </p>

            </div>

            <div className="flex flex-wrap items-center gap-3">

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