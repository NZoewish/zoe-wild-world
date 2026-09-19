import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zoe's Wild World 🐾",
  description: "Zoe's interactive wildlife discovery portal, fossil explorer & AI safari guide.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Zoe's Wild World"
  },
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/apple-touch-icon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#080d1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.svg" />
      </head>
      <body className="min-h-screen bg-[#080d1a] text-slate-100 antialiased selection:bg-amber-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
