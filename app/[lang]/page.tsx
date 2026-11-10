import { notFound } from "next/navigation";
import HomePage from "@/components/HomePage";
import { isLocale } from "@/lib/i18n";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <HomePage lang={lang} />;
}
