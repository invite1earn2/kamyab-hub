import Link from "next/link";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Kamyab Hub team for membership support, referral assistance, product inquiries and general questions.",
};

export default function Contact() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white">

        <div className="mx-auto max-w-6xl px-6 py-20 text-center">

          <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold">
            We're Here to Help
          </span>

          <h1 className="mt-6 text-4xl font-black md:text-6xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Have a question about Kamyab Hub? Whether it's membership,
            referrals, product sales or technical support, we're ready to help.
          </p>

        </div>

      </section>

      {/* Contact Cards */}

      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">

            <div className="text-5xl">📧</div>

            <h2 className="mt-6 text-2xl font-black text-gray-900">
              Email Support
            </h2>

            <p className="mt-4 text-gray-600 leading-8">
              support@kamyabhub.com
              <br />
              <span className="text-sm text-gray-500">
                (Update later with your official email)
              </span>
            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">

            <div className="text-5xl">🕒</div>

            <h2 className="mt-6 text-2xl font-black text-gray-900">
              Business Hours
            </h2>

            <p className="mt-4 text-gray-600 leading-8">
              Monday – Saturday
              <br />
              9:00 AM – 6:00 PM
            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">

            <div className="text-5xl">🇵🇰</div>

            <h2 className="mt-6 text-2xl font-black text-gray-900">
              Service Area
            </h2>

            <p className="mt-4 text-gray-600 leading-8">
              Proudly serving Business Partners across Pakistan.
            </p>

          </div>

        </div>

      </section>

      {/* Contact Form */}

      <section className="mx-auto max-w-4xl px-6 pb-20">

        <div className="rounded-3xl bg-white p-8 shadow-sm">

          <h2 className="text-3xl font-black text-gray-900">

            Send Us a Message

          </h2>

          <p className="mt-4 text-gray-600">
            We'd love to hear from you.
          </p>

          <form className="mt-8 space-y-6">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full rounded-xl border p-4 outline-none focus:border-blue-600"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl border p-4 outline-none focus:border-blue-600"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full rounded-xl border p-4 outline-none focus:border-blue-600"
            />

            <textarea
              rows={6}
              placeholder="Your Message"
              className="w-full rounded-xl border p-4 outline-none focus:border-blue-600"
            />

            <button
              type="button"
              className="rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-700"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>

      {/* Help Section */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-6xl px-6">

          <h2 className="text-center text-4xl font-black text-gray-900">

            We Can Help With

          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border p-6 text-center">
              Membership Support
            </div>

            <div className="rounded-2xl border p-6 text-center">
              Referral Questions
            </div>

            <div className="rounded-2xl border p-6 text-center">
              Product Information
            </div>

            <div className="rounded-2xl border p-6 text-center">
              Technical Assistance
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-20">

        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 px-8 py-16 text-center text-white">

          <h2 className="text-4xl font-black">

            Ready to Grow with Kamyab Hub?

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">

            Become a Business Partner today and start building your online
            business with confidence.

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