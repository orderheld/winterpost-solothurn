"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { Dict, Locale } from "@/lib/i18n";

type Language = { code: Locale; label: string; name: string; href: string; hrefLang: string };

export default function Header({
  nav,
  lang,
  languages,
}: {
  nav: Dict["nav"];
  lang: Locale;
  languages: Language[];
}) {
  const links = [
    { href: "#ort", label: nav.ort },
    { href: "#angebot", label: nav.angebot },
    { href: "#events", label: nav.events },
    { href: "#besuch", label: nav.besuch },
    { href: "#reservation", label: nav.reservation },
    { href: "#kontakt", label: nav.kontakt },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="header__inner container">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <Image src="/images/logo-stempel.png" alt="" width={48} height={48} className="brand__logo" priority />
          <span className="brand__text">
            <span className="brand__name">Winter Post</span>
            <span className="brand__city">Solothurn</span>
          </span>
        </a>

        <nav className="nav" aria-label={nav.main}>
          <ul className="nav__list" id="hauptmenue">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="langs langs--menu" aria-label={nav.language}>
            {languages.map((l) => (
              <li key={l.code}>
                <a
                  href={l.href}
                  hrefLang={l.hrefLang}
                  lang={l.hrefLang}
                  title={l.name}
                  aria-current={l.code === lang ? "page" : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#besuch" className="btn btn--red header__cta">
          {nav.cta}
        </a>

        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="hauptmenue"
          aria-label={open ? nav.close : nav.open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
