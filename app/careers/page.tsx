import type { Metadata } from "next";
import CareersPage from "@/components/CareersPage";

export const metadata: Metadata = {
  title: "Careers | Taaza TV",
  description: "Join Taaza TV: reporting, anchoring, video, digital, design, sales and technology roles.",
};

export default function Page() {
  return <CareersPage />;
}
