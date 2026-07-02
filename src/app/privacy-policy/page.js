import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Read Kamyab Hub's Privacy Policy to understand how we collect, use and protect your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

        <div className="max-w-5xl mx-auto px-6 py-16">

          <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
            🔒 Legal
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-black">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-blue-100 leading-8">
            Your privacy is important to us. This Privacy Policy explains how
            Kamyab Hub collects, uses, protects and manages your information
            while you use our platform.
          </p>

          <p className="mt-6 text-blue-200 text-sm">
            Last Updated: July 2026
          </p>

        </div>

      </section>

      {/* Content */}

      <section className="max-w-5xl mx-auto px-6 py-12 space-y-8">

        <div className="rounded-3xl bg-white border p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            1. Information We Collect
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li>• Name and email address</li>
            <li>• Membership payment information</li>
            <li>• Referral activity</li>
            <li>• Product orders</li>
            <li>• Withdrawal requests</li>
            <li>• Account usage information</li>
          </ul>
        </div>

        <div className="rounded-3xl bg-white border p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            2. How We Use Your Information
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li>• Create and manage your account</li>
            <li>• Verify membership payments</li>
            <li>• Process referrals and commissions</li>
            <li>• Deliver products and services</li>
            <li>• Process withdrawal requests</li>
            <li>• Improve platform performance</li>
          </ul>
        </div>

        <div className="rounded-3xl bg-white border p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            3. Information Protection
          </h2>

          <p className="text-gray-700 leading-8">
            We use industry-standard security measures to protect your personal
            information. Only authorized personnel can access your data for
            legitimate business purposes.
          </p>
        </div>

        <div className="rounded-3xl bg-white border p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            4. Information Sharing
          </h2>

          <p className="text-gray-700 leading-8">
            Kamyab Hub does not sell your personal information. Information may
            only be shared when required for payment processing, product
            delivery or to comply with applicable laws.
          </p>
        </div>

        <div className="rounded-3xl bg-white border p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            5. Your Rights
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li>• Update your account information</li>
            <li>• Request account closure</li>
            <li>• Contact our support team</li>
          </ul>
        </div>

        <div className="rounded-3xl bg-blue-50 border border-blue-200 p-8">

          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Contact Us
          </h2>

          <p className="text-gray-700 leading-8">
            If you have any questions regarding this Privacy Policy, please
            contact the Kamyab Hub support team.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            Contact Support
          </Link>

        </div>

      </section>

    </main>
  );
}