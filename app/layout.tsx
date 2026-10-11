import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { AppProvider } from "@/components/AppProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StateModal from "@/components/StateModal";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Taaza TV — News in your language, from your state",
  description: "A national Hindi and English news channel from eastern India.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={archivo.variable} suppressHydrationWarning>
      <body>
        <AppProvider>
          <div className="m-frame">
            <Header />
            <div className="m-zoom">
              <main>{children}</main>
              <Footer />
            </div>
          </div>
          <StateModal />
        </AppProvider>
      </body>
    </html>
  );
}
