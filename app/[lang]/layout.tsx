import type { Metadata, Viewport } from "next";
import { Lora, Zilla_Slab, Yellowtail } from "next/font/google";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getDict, isLocale, localeInfo, locales } from "@/lib/i18n";
import "../globals.css";

const serif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const slab = Zilla_Slab({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-slab",
  display: "swap",
});

const script = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  const path = localeInfo[lang].path;
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [localeInfo[l].htmlLang, localeInfo[l].path]),
  );
  languages["x-default"] = "/";

  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: site.name,
    keywords: t.meta.keywords,
    alternates: { canonical: path, languages },
    formatDetection: { telephone: false, email: true, address: true },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      type: "website",
      locale: t.meta.ogLocale,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => getDict(l).meta.ogLocale),
      url: path,
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.shareDescription,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: t.meta.ogAlt, type: "image/jpeg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.shareDescription,
      images: [{ url: "/og-image.jpg", alt: t.meta.ogAlt }],
    },
    appleWebApp: { title: site.shortName, statusBarStyle: "black-translucent" },
  };
}

export const viewport: Viewport = {
  themeColor: "#0e182b",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html
      lang={localeInfo[lang].htmlLang}
      className={`${serif.variable} ${slab.variable} ${script.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
