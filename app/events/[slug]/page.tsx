import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventPage from "@/components/EventPage";
import { EVENTS, eventBySlug } from "@/lib/events";
import { getEventNews } from "@/lib/taaza";

export const dynamicParams = false;
export const revalidate = 300;

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const ev = eventBySlug((await params).slug);
  if (!ev) return {};
  return { title: `${ev.name} | Taaza TV`, description: ev.desc.en };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ev = eventBySlug(slug);
  if (!ev) notFound();
  const news = await getEventNews(ev.news);
  return <EventPage key={slug} slug={slug} news={news} />;
}
