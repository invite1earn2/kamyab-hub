import {
  Geist,
  Geist_Mono,
  Noto_Naskh_Arabic,
} from "next/font/google";

import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoNaskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {

  title: {
  default: "Kamyab Hub | Online Business & Referral Platform in Pakistan",
  template: "%s | Kamyab Hub",
},
  description:
  "Start your online business with Kamyab Hub. Earn through referrals, sell quality products, and grow your income with Pakistan's trusted Business Partner Platform.",

  keywords: [
  "online business Pakistan",
  "earn money online",
  "referral marketing Pakistan",
  "business partner",
  "online earning",
  "affiliate marketing",
  "product selling",
  "work from home Pakistan",
  "Kamyab Hub",
  "business opportunity",
],

  authors: [
    {
      name: "Kamyab Hub",
    },
  ],

  creator: "Kamyab Hub",

  publisher: "Kamyab Hub",

  applicationName: "Kamyab Hub",

  verification: {
  google: "JWGFdDQS8__NYRyKHmCpvUl6i-z_1Zz-k1TVk2lAIXQ",
},

  openGraph: {
  title: "Kamyab Hub | Online Business & Referral Platform in Pakistan",

  description:
    "Start your online business with Kamyab Hub. Earn through referrals and product sales with a one-time membership.",

  url: "https://kamyabhub.com",

  siteName: "Kamyab Hub",

  locale: "en_PK",

  type: "website",
},

};

export default function RootLayout({ children }) {

  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoNaskh.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col bg-gray-50">

        <Navbar />

        <main className="flex-1">

          {children}

        </main>

      </body>

    </html>

  );

}