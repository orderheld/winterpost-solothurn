import type { Metadata, Viewport } from "next";
import { Lora, Zilla_Slab, Yellowtail } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | ${site.claim}`,
  description: site.description,
  keywords: [
    "Winter Post",
    "Solothurn",
    "Glühwein Solothurn",
    "Weihnachtsmarkt Solothurn",
    "Alter Postplatz",
    "Raclette",
    "Wintertreffpunkt",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.claim}`,
    description: site.description,
    images: [
      {
        url: "/images/poster.jpg",
        width: 1290,
        height: 1601,
        alt: "Winter Post Solothurn: ab 27. November, täglich 11 bis 22 Uhr",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.claim}`,
    description: site.description,
    images: ["/images/poster.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#14213a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de-CH"
      className={`${serif.variable} ${slab.variable} ${script.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
