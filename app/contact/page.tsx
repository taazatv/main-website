import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = { title: "Contact us | Taaza TV" };

export default function Page() {
  return <ContactPage />;
}
