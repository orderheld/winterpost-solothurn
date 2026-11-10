import type { Metadata } from "next";
import { Lora, Zilla_Slab } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const serif = Lora({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const slab = Zilla_Slab({ subsets: ["latin"], weight: ["700"], variable: "--font-slab", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "404 | Winter Post Solothurn",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="de-CH" className={`${serif.variable} ${slab.variable}`}>
      <body>
        <main className="hero" style={{ minHeight: "100svh", padding: "4rem 0" }}>
          <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <p className="eyebrow eyebrow--light">404</p>
            <h1 className="section-title section-title--light">Diese Post ist leider nicht angekommen.</h1>
            <p className="section-lead section-lead--light" style={{ marginInline: "auto" }}>
              Cette page n’existe pas · Questa pagina non esiste · This page doesn’t exist.
            </p>
            <p style={{ marginTop: "2rem" }}>
              <a href="/" className="btn btn--red">Zur Startseite</a>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
