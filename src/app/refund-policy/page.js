import Link from "next/link";

export const metadata = {
  title: "Refund Policy",
  description:
    "Read the Kamyab Hub Refund Policy to understand when refunds may be available and how refund requests are reviewed.",
};

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">

        <div className="mx-auto max-w-6xl px-6 py-20 text-center">

          <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold">
            Customer Support
          </span>

          <h1 className="mt-6 text-4xl font-black md:text-6xl">
            Refund Policy
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            This Refund Policy explains when refund requests may be considered
            and how Kamyab Hub reviews each request.
          </p>

          <p className="mt-6 text-sm text-blue-200">
            Last Updated: July 2026
          </p>

        </div>

      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6 py-20">

        <div className="rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-black text-gray-900">
            Membership Fee
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Your membership fee is used to activate your Business Partner
            account and provide access to Kamyab Hub services and earning
            opportunities.
          </p>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-black text-gray-900">
            When Refunds May Be Available
          </h2>

          <ul className="mt-5 list-disc space-y-3 pl-6 leading-8 text-gray-600">

            <li>Duplicate payment made by mistake.</li>

            <li>Verified technical payment error.</li>

            <li>
              Payment received successfully but the Business Partner account
              cannot be activated due to a platform issue.
            </li>

          </ul>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-black text-gray-900">
            Non-Refundable Situations
          </h2>

          <ul className="mt-5 list-disc space-y-3 pl-6 leading-8 text-gray-600">

            <li>Membership has already been approved and activated.</li>

            <li>You change your mind after activation.</li>

            <li>Violation of Kamyab Hub policies.</li>

            <li>Fraudulent or misleading activity.</li>

          </ul>

        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-black text-gray-900">
            Refund Review Process
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Every refund request is reviewed individually. Our team may request
            additional information before making a final decision to ensure a
            fair and transparent process.
          </p>

        </div>

        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8">

          <h2 className="text-2xl font-black text-blue-700">
            Need Assistance?
          </h2>

          <p className="mt-5 leading-8 text-gray-700">
            If you believe your payment qualifies for a refund or you have any
            questions regarding this policy, please contact our support team.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-2xl bg-blue-600 px-7 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Contact Us
          </Link>

        </div>

      </section>

    </main>
  );
}