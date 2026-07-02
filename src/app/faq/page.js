import Link from "next/link";

export const metadata = {
  title: "FAQ",
  description:
    "Find answers to common questions about Kamyab Hub, Business Partner membership, referrals, product selling, withdrawals and more.",
};

export default function FAQ() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">

        <div className="mx-auto max-w-6xl px-6 py-20 text-center">

          <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold">
            Help Center
          </span>

          <h1 className="mt-6 text-4xl font-black md:text-6xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Find answers to the most common questions about Kamyab Hub,
            Business Partner membership, referrals and earnings.
          </p>

        </div>

      </section>

      {/* FAQ */}

      <section className="mx-auto max-w-5xl px-6 py-20 space-y-6">

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">
            What is Kamyab Hub?
          </h2>
          <p className="mt-4 leading-8 text-gray-600">
            Kamyab Hub is a platform that enables Business Partners across
            Pakistan to earn through referrals and product selling.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">
            How do I become a Business Partner?
          </h2>
          <p className="mt-4 leading-8 text-gray-600">
            Register an account, complete the one-time membership process,
            and once your payment is approved, your Business Partner account
            will be activated.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">
            How do referral rewards work?
          </h2>
          <p className="mt-4 leading-8 text-gray-600">
            Share your unique referral link. When someone joins through your
            referral and their membership is approved, you become eligible for
            the referral reward according to the current company policy.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">
            Can I sell products?
          </h2>
          <p className="mt-4 leading-8 text-gray-600">
            Yes. Business Partners can promote products available on Kamyab
            Hub and earn according to the platform's product commission
            structure.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">
            How do I request a withdrawal?
          </h2>
          <p className="mt-4 leading-8 text-gray-600">
            Submit a withdrawal request from your dashboard. Requests are
            reviewed and processed after verification.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">
            Is my information secure?
          </h2>
          <p className="mt-4 leading-8 text-gray-600">
            Yes. Kamyab Hub is committed to protecting user information and
            maintaining a secure platform for Business Partners.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">
            Can I refer unlimited people?
          </h2>
          <p className="mt-4 leading-8 text-gray-600">
            Yes. There is no fixed limit on referrals, provided all referrals
            are genuine and comply with our platform policies.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">
            How can I contact support?
          </h2>
          <p className="mt-4 leading-8 text-gray-600">
            Visit the Contact Us page to reach our support team for assistance
            with your account, membership or platform-related questions.
          </p>
        </div>

      </section>

      {/* CTA */}

      <section className="pb-20">

        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 px-8 py-16 text-center text-white">

          <h2 className="text-4xl font-black">

            Still Have Questions?

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">

            Our support team is ready to help you with membership,
            referrals, products and anything related to Kamyab Hub.

          </p>

          <Link
            href="/contact"
            className="mt-10 inline-flex rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-700 transition hover:scale-105"
          >
            Contact Us
          </Link>

        </div>

      </section>

    </main>
  );
}