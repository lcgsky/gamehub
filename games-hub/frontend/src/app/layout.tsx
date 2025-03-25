import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { UserProvider } from "@/context/UserContext";
import { LanguageProvider } from '@/context/LanguageContext';
import { defaultLocale } from '@/i18n/config';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GameHub - Game Aggregation Platform",
  description: "Discover and play various online games on GameHub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={defaultLocale}>
      <body className={inter.className}>
        <LanguageProvider>
          <UserProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </UserProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
