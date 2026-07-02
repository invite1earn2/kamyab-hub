import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Terms & Conditions for using Kamyab Hub and understand your rights and responsibilities as a Business Partner.",
};

export default function Terms() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">

        <div className="mx-auto max-w-6xl px-6 py-20 text-center">

          <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold">
            Legal Information
          </span>

          <h1 className="mt-6 text-4xl font-black md:text-6xl">
            Terms & Conditions
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            These Terms & Conditions govern your use of Kamyab Hub and your
            participation as a Business Partner on our platform.
          </p>

          <p className="mt-6 text-sm text-blue-200">
            Last Updated: July 2026
          </p>

        </div>

      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 space-y-8">

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">
            1. Membership
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            By joining Kamyab Hub, you agree to provide accurate information
            during registration. Your Business Partner account becomes active
            only after your membership payment has been verified and approved.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">
            2. Referral Program
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Referral rewards are paid only for valid and approved Business
            Partners. Fake accounts, duplicate registrations, self-referrals,
            or fraudulent activities are strictly prohibited.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">
            3. Product Selling
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Business Partners may promote products available on Kamyab Hub.
            Product pricing, availability, delivery methods, and commissions
            are determined by the company and may change when necessary.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">
            4. Withdrawals
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Withdrawal requests are processed after verification. Kamyab Hub
            reserves the right to review requests to prevent fraud or policy
            violations before releasing payments.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">
            5. Account Suspension
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Accounts involved in fraudulent activity, fake referrals, abuse of
            the platform, or violations of these Terms may be suspended or
            permanently removed without prior notice.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900">
            6. Changes to These Terms
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Kamyab Hub may update these Terms & Conditions as our platform
            evolves. Continued use of the platform after updates indicates your
            acceptance of the revised terms.
          </p>
        </div>

        <div className="rounded-3xl bg-blue-50 border border-blue-200 p-8">

          <h2 className="text-2xl font-black text-blue-700">
            Need Help?
          </h2>

          <p className="mt-5 leading-8 text-gray-700">
            If you have any questions about these Terms & Conditions, our team
            is here to help.
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