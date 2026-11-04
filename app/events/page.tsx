import type { Metadata } from "next";
import { EventsIndex } from "@/components/EventPage";

export const metadata: Metadata = {
  title: "Events | Taaza TV",
  description: "Taaza Dandiya, Youngotsav, Kwizdom, Medha Samman and other events run by Taaza TV.",
};

export default function Page() {
  return <EventsIndex />;
}
