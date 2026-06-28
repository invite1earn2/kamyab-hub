import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata = {

  title: {
    default: "Kamyab Hub",
    template: "%s | Kamyab Hub",
  },

  description:
    "Kamyab Hub is Pakistan's Smart Business Partner Platform. Build your business through product selling, referral rewards and secure earnings management.",

  keywords: [
    "Kamyab Hub",
    "Business Partner",
    "Referral Platform",
    "Product Selling",
    "Affiliate Marketing",
    "Pakistan Business",
    "Earn Online",
    "Business Opportunity",
    "Referral System",
    "Commission Platform",
  ],

  authors: [
    {
      name: "Kamyab Hub",
    },
  ],

  creator: "Kamyab Hub",

  publisher: "Kamyab Hub",

  applicationName: "Kamyab Hub",

  openGraph: {

    title: "Kamyab Hub",

    description:
      "Har Qadam Kamyabi Ki Taraf",

    type: "website",

    locale: "en_PK",

    siteName: "Kamyab Hub",

  },

};

export default function RootLayout({ children }) {

  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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