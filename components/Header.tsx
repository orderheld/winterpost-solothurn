"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#idee", label: "Die Idee" },
  { href: "#ort", label: "Der Ort" },
  { href: "#angebot", label: "Angebot" },
  { href: "#besuch", label: "Öffnungszeiten" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Header() {
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

        <nav className="nav" aria-label="Hauptnavigation">
          <ul className="nav__list" id="hauptmenue">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#besuch" className="btn btn--red header__cta">
          Ab 27. November
        </a>

        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="hauptmenue"
          aria-label={open ? "Menü schliessen" : "Menü öffnen"}
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
