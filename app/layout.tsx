import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import Navbar from "@/components/dashboard/Navbar";
import FloatingChatbot from "@/components/dashboard/FloatingChatbot";
import Footer from "@/components/dashboard/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Garda Sensus Ekonomi 2026 - BPS Provinsi Papua",
  description: "Dashboard Monitoring dan Administrasi SE2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen relative flex flex-col`} suppressHydrationWarning>
        <SiteConfigProvider>
          <Navbar />
          <main className="bg-se-krem text-se-hitam pt-24 flex-grow relative">
            {children}
          </main>
          <Footer />
          <div className="z-[100] relative">
            <FloatingChatbot />
          </div>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
