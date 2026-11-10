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
  title: site.title,
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Winter Post Solothurn",
    "Glühwein Solothurn",
    "Wintertreffpunkt Solothurn",
    "Weihnachtsmarkt Solothurn",
    "Winter Pop-up Solothurn",
    "Alter Postplatz Solothurn",
    "Raclette Solothurn",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.shareDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.shareDescription,
  },
  appleWebApp: { title: site.shortName, statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#0e182b",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
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
