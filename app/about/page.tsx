import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = { title: "About us | Taaza TV" };

export default function Page() {
  return <AboutPage />;
}
