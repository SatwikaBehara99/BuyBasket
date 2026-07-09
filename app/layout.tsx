import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

import { Providers } from "./providers";
import { CartProvider } from "@/context/CartContext";

const geist = Geist({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://buybasket.vercel.app"), // change after your domain

  title: {
    default: "BuyBasket",
    template: "%s | BuyBasket",
  },

  description:
    "BuyBasket is a modern e-commerce platform offering groceries, fashion, electronics, home essentials and more.",

  keywords: [
    "BuyBasket",
    "Online Shopping",
    "Groceries",
    "Electronics",
    "Fashion",
    "Ecommerce",
    "India",
  ],

  authors: [{ name: "BuyBasket Team" }],

  creator: "BuyBasket",

  openGraph: {
    title: "BuyBasket",
    description:
      "Everything You Need in One Basket.",
    type: "website",
    locale: "en_IN",
    siteName: "BuyBasket",
  },

  twitter: {
    card: "summary_large_image",
    title: "BuyBasket",
    description:
      "Everything You Need in One Basket.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width:"device-width",
  initialScale:1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head> 
        <meta 
      name="theme-color"
      content="#dc2626" />
      </head>
      <body className={`${geist.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-white`}>
        <Providers>
          <CartProvider>

            <Navbar />

            <main className="min-h-screen">
              {children}
            </main>

            <Footer />

          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}

