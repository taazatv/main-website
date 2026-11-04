import type { Metadata } from "next";
import AdvertisePage from "@/components/AdvertisePage";

export const metadata: Metadata = {
  title: "Advertise with us | Taaza TV",
  description: "Advertise on the Taaza TV channel, website, mobile app and social media.",
};

export default function Page() {
  return <AdvertisePage />;
}
