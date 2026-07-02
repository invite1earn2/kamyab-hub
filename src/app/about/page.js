import Link from "next/link";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Kamyab Hub and our mission to help people across Pakistan build successful online businesses through referrals, product selling and business partnerships.",
};

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">

        <div className="mx-auto max-w-6xl px-6 py-20 text-center">

          <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold">

            About Kamyab Hub

          </span>

          <h1 className="mt-6 text-4xl font-black md:text-6xl">

            Har Qadam Kamyabi Ki Taraf

          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">

            Kamyab Hub is a modern Business Partner Platform that empowers
            people across Pakistan to earn through referrals, product selling,
            and long-term business opportunities.

          </p>

        </div>

      </section>

      {/* Mission & Vision */}

      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="grid gap-8 md:grid-cols-2">

          <div className="rounded-3xl bg-white p-8 shadow-sm">

            <h2 className="text-3xl font-black text-gray-900">

              Our Mission

            </h2>

            <p className="mt-5 leading-8 text-gray-600">

              Our mission is to provide a trusted platform where anyone in
              Pakistan can start an online business with confidence. Through
              referrals, product sales and business partnerships, we help people
              build sustainable income and long-term success.

            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">

            <h2 className="text-3xl font-black text-gray-900">

              Our Vision

            </h2>

            <p className="mt-5 leading-8 text-gray-600">

              We aim to become one of Pakistan's most trusted online business
              platforms by creating opportunities that are simple, transparent
              and accessible for everyone.

            </p>

          </div>

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="mx-auto max-w-6xl px-6 pb-20">

        <div className="text-center">

          <h2 className="text-4xl font-black text-gray-900">

            Why Choose Kamyab Hub?

          </h2>

          <p className="mt-5 text-lg text-gray-600">

            Everything you need to build and grow your business.

          </p>

        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">

            <div className="text-5xl">🤝</div>

            <h3 className="mt-6 text-xl font-bold">

              Business Partnership

            </h3>

            <p className="mt-4 text-gray-600">

              Become a Business Partner with a one-time membership.

            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">

            <div className="text-5xl">💰</div>

            <h3 className="mt-6 text-xl font-bold">

              Referral Rewards

            </h3>

            <p className="mt-4 text-gray-600">

              Earn rewards by referring new Business Partners.

            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">

            <div className="text-5xl">🛍️</div>

            <h3 className="mt-6 text-xl font-bold">

              Product Selling

            </h3>

            <p className="mt-4 text-gray-600">

              Sell quality products without managing inventory.

            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">

            <div className="text-5xl">🔒</div>

            <h3 className="mt-6 text-xl font-bold">

              Trusted Platform

            </h3>

            <p className="mt-4 text-gray-600">

              Secure, transparent and designed for long-term growth.

            </p>

          </div>

        </div>

      </section>

      {/* Values */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-6xl px-6">

          <h2 className="text-center text-4xl font-black text-gray-900">

            Our Core Values

          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-4">

            <div className="rounded-2xl border p-6 text-center">

              <h3 className="font-bold">Trust</h3>

            </div>

            <div className="rounded-2xl border p-6 text-center">

              <h3 className="font-bold">Transparency</h3>

            </div>

            <div className="rounded-2xl border p-6 text-center">

              <h3 className="font-bold">Growth</h3>

            </div>

            <div className="rounded-2xl border p-6 text-center">

              <h3 className="font-bold">Innovation</h3>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-20">

        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 px-8 py-16 text-center text-white">

          <h2 className="text-4xl font-black">

            Start Your Journey Today

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">

            Join Kamyab Hub and become a Business Partner to build your online
            business with referrals, product selling and exciting earning
            opportunities.

          </p>

          <Link
            href="/subscribe"
            className="mt-10 inline-flex rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-700 transition hover:scale-105"
          >
            Become a Business Partner
          </Link>

        </div>

      </section>

    </main>
  );
}