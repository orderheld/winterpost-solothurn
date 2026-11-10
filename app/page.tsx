import Image from "next/image";
import Header from "@/components/Header";
import OpeningStatus from "@/components/OpeningStatus";
import Snow from "@/components/Snow";
import { Arrow, Calendar, Clock, Instagram, Mail, Phone, Pin, Snowflake } from "@/components/Icons";
import { menu, site } from "@/lib/site";

const tickerWords = [
  "Glühwein",
  "Heisse Schokolade",
  "Raclettebrot",
  "Grillwurst",
  "Pilzrisotto",
  "Weihnachtszauber",
  "Alter Postplatz",
];

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: site.name,
    slogan: site.claim,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phone.replace(/\s/g, ""),
    image: `${site.url}/images/poster.jpg`,
    logo: `${site.url}/images/logo-stempel.png`,
    servesCuisine: ["Glühwein", "Raclette", "Schweizer Winterküche"],
    sameAs: [site.instagram],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "11:00",
        closes: "22:00",
        validFrom: "2026-11-27",
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <a href="#inhalt" className="skip-link">
        Zum Inhalt springen
      </a>
      <div className="airmail-bar" aria-hidden="true" />
      <Header />

      <main id="inhalt">
        {/* ---------- HERO ---------- */}
        <section className="hero" id="top">
          <Snow count={46} />
          <div className="hero__glow" aria-hidden="true" />
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="eyebrow eyebrow--light">
                <Snowflake className="eyebrow__icon" />
                Alter Postplatz · Solothurn
              </p>
              <h1 className="hero__title">
                <span>Dein Winter.</span>
                <span>Dein Treffpunkt.</span>
              </h1>
              <p className="hero__lead">
                Glühwein, Genuss &amp; Weihnachtszauber im Herzen von Solothurn.
                Komm vorbei, wärm dich auf und triff deine Leute.
              </p>

              <div className="hero__stamp-row">
                <p className="rubber-stamp">
                  <span className="rubber-stamp__small">Ab</span> 27. November 2026
                </p>
                <p className="hero__hours">
                  <Clock className="hero__hours-icon" />
                  Täglich 11:00 – 22:00 Uhr
                </p>
              </div>

              <div className="hero__actions">
                <a href="#angebot" className="btn btn--red">
                  Zum Angebot <Arrow className="btn__icon" />
                </a>
                <a href={site.mapsUrl} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
                  <Pin className="btn__icon" /> Route planen
                </a>
              </div>

              <OpeningStatus />
            </div>

            <div className="hero__visual">
              <div className="postcard-stack">
                <figure className="postcard postcard--hero">
                  <Image
                    src="/images/poster.jpg"
                    alt="Plakat der Winter Post Solothurn: Ab 27. November, Dein Winter Treffpunkt mit Glühwein und Genuss, täglich 11 bis 22 Uhr, Postplatz Solothurn"
                    width={1290}
                    height={1601}
                    priority
                    sizes="(max-width: 900px) 80vw, 460px"
                  />
                </figure>
                <div className="ring-stamp" aria-hidden="true">
                  <svg viewBox="0 0 200 200" className="ring-stamp__ring">
                    <defs>
                      <path id="ring" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
                    </defs>
                    <circle cx="100" cy="100" r="96" />
                    <circle cx="100" cy="100" r="54" />
                    <text>
                      <textPath href="#ring" startOffset="0" textLength="458" lengthAdjust="spacing">
                        Eröffnung · 27.11.2026 · Solothurn ·
                      </textPath>
                    </text>
                  </svg>
                  <Snowflake className="ring-stamp__flake" />
                </div>
              </div>
            </div>
          </div>
          <a href="#idee" className="hero__scroll" aria-label="Weiter nach unten">
            <span />
          </a>
        </section>

        {/* ---------- TICKER ---------- */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker__track">
            {[0, 1].map((k) => (
              <div className="ticker__group" key={k}>
                {tickerWords.map((w) => (
                  <span key={w + k} className="ticker__item">
                    {w}
                    <Snowflake className="ticker__flake" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ---------- IDEE ---------- */}
        <section className="section paper" id="idee">
          <div className="container idea">
            <article className="letter">
              <Image
                src="/images/logo-stempel.png"
                alt=""
                width={120}
                height={120}
                className="letter__postmark"
              />
              <p className="letter__kicker">Post für dich</p>
              <h2 className="letter__title">Liebe Solothurnerinnen und Solothurner</h2>
              <div className="letter__body">
                <p>
                  wenn die Tage kürzer werden und der Atem in der Luft hängt, braucht es
                  einen Ort zum Ankommen. Genau dafür gibt es die Winter Post: euren neuen
                  Wintertreffpunkt auf dem Alter Postplatz.
                </p>
                <p>
                  Hier dampft der Glühwein, der Raclettekäse schmilzt aufs Brot und die
                  Wurst brutzelt auf dem Grill. Ob kurz nach der Arbeit, mit Freunden am
                  Wochenende oder mit der ganzen Familie: Bei uns findest du ein warmes
                  Plätzchen und ganz viel Weihnachtszauber.
                </p>
                <p>Wir freuen uns auf euch!</p>
              </div>
              <p className="letter__sign">Eure Winter Post</p>
            </article>

            <div className="idea__side">
              <p className="eyebrow">Die Idee</p>
              <h2 className="section-title">
                Ein Treffpunkt, so warm wie ein Brief von Herzen.
              </h2>
              <ul className="features">
                <li className="feature">
                  <span className="feature__icon"><Pin /></span>
                  <div>
                    <h3>Mitten in Solothurn</h3>
                    <p>Auf dem Alter Postplatz, im Herzen von Solothurn.</p>
                  </div>
                </li>
                <li className="feature">
                  <span className="feature__icon"><Clock /></span>
                  <div>
                    <h3>Jeden Tag für dich da</h3>
                    <p>Von 11 bis 22 Uhr: zum Zmittag, zum Feierabend oder für einen späten Glühwein.</p>
                  </div>
                </li>
                <li className="feature">
                  <span className="feature__icon"><Snowflake /></span>
                  <div>
                    <h3>Winterküche mit Herz</h3>
                    <p>Heisse Getränke und herzhafte Klassiker, frisch zubereitet und mit Liebe serviert.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- ANGEBOT ---------- */}
        <section className="section paper paper--alt" id="angebot">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow">Unser Angebot</p>
              <h2 className="section-title">Aus der Winterküche</h2>
              <p className="section-lead">
                Von dampfend heiss bis schön geschmolzen: Das erwartet dich bei der Winter Post.
              </p>
            </header>

            <ul className="menu-grid">
              {menu.map((item, i) => (
                <li key={item.name} className={`menu-card ${i < 2 ? "menu-card--wide" : ""}`}>
                  <div className="menu-card__photo">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes={i < 2 ? "(max-width: 700px) 100vw, 50vw" : "(max-width: 700px) 100vw, 33vw"}
                    />
                    <span className="menu-card__no" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="menu-card__body">
                    <p className="menu-card__cat">{item.category}</p>
                    <h3 className="menu-card__name">{item.name}</h3>
                    <p className="menu-card__text">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="menu-note">
              <Snowflake className="menu-note__icon" />
              Das aktuelle Angebot und die Preise findest du direkt vor Ort.
            </p>
          </div>
        </section>

        {/* ---------- BESUCH ---------- */}
        <section className="section night" id="besuch">
          <Snow count={28} />
          <div className="container visit">
            <div className="visit__hours">
              <p className="eyebrow eyebrow--light">Öffnungszeiten</p>
              <h2 className="section-title section-title--light">Komm vorbei</h2>
              <dl className="timetable">
                <div className="timetable__row">
                  <dt><Calendar className="timetable__icon" /> Eröffnung</dt>
                  <dd>Freitag, 27. November 2026</dd>
                </div>
                <div className="timetable__row">
                  <dt><Clock className="timetable__icon" /> Montag bis Sonntag</dt>
                  <dd>11:00 – 22:00 Uhr</dd>
                </div>
                <div className="timetable__row">
                  <dt><Pin className="timetable__icon" /> Standort</dt>
                  <dd>Alter Postplatz, 4500 Solothurn</dd>
                </div>
              </dl>
              <p className="visit__hint">
                Einfach vorbeikommen, aufwärmen und geniessen.
              </p>
            </div>

            <div className="visit__card">
              <div className="ticket">
                <div className="ticket__stamp">
                  <Image
                    src="/images/briefmarke-solothurn.jpg"
                    alt="Briefmarke mit der St.-Ursen-Kathedrale Solothurn"
                    width={425}
                    height={475}
                    sizes="180px"
                  />
                </div>
                <p className="ticket__label">Adresse</p>
                <address className="ticket__address">
                  Winter Post Solothurn
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city}
                </address>
                <a href={site.mapsUrl} className="btn btn--red btn--block" target="_blank" rel="noopener noreferrer">
                  <Pin className="btn__icon" /> In Google Maps öffnen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- KONTAKT ---------- */}
        <section className="section paper" id="kontakt">
          <div className="container">
            <div className="envelope">
              <div className="envelope__inner">
                <div className="envelope__copy">
                  <p className="eyebrow">Kontakt</p>
                  <h2 className="section-title">Schreib uns ein paar Zeilen</h2>
                  <p className="section-lead">
                    Fragen, Ideen oder einfach liebe Grüsse? Wir freuen uns auf deine
                    Nachricht oder deinen Anruf.
                  </p>
                  <div className="contact-links">
                    <a className="contact-link" href={`mailto:${site.email}`}>
                      <span className="contact-link__icon"><Mail /></span>
                      <span>
                        <span className="contact-link__label">E-Mail</span>
                        <span className="contact-link__value">{site.email}</span>
                      </span>
                    </a>
                    <a className="contact-link" href={site.phoneHref}>
                      <span className="contact-link__icon"><Phone /></span>
                      <span>
                        <span className="contact-link__label">Telefon</span>
                        <span className="contact-link__value">{site.phone}</span>
                      </span>
                    </a>
                    <a className="contact-link" href={site.instagram} target="_blank" rel="noopener noreferrer">
                      <span className="contact-link__icon"><Instagram /></span>
                      <span>
                        <span className="contact-link__label">Instagram</span>
                        <span className="contact-link__value">{site.instagramHandle}</span>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="envelope__address" aria-hidden="true">
                  <Image
                    src="/images/logo-stempel.png"
                    alt=""
                    width={150}
                    height={150}
                    className="envelope__logo"
                  />
                  <p className="envelope__airmail">Par Avion · Luftpost</p>
                  <div className="envelope__lines">
                    <span>An die Winter Post</span>
                    <span>Alter Postplatz</span>
                    <span>4500 Solothurn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="airmail-bar" aria-hidden="true" />
        <div className="container footer__grid">
          <div className="footer__brand">
            <Image src="/images/logo-stempel.png" alt="Winter Post Solothurn Logo" width={84} height={84} />
            <div>
              <p className="footer__claim">{site.claim}</p>
              <p className="footer__small">{site.tagline}</p>
            </div>
          </div>
          <div className="footer__col">
            <p className="footer__heading">Besuch</p>
            <p>Alter Postplatz<br />4500 Solothurn</p>
            <p>Ab 27.11.2026<br />täglich 11–22 Uhr</p>
          </div>
          <div className="footer__col">
            <p className="footer__heading">Kontakt</p>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              <a href={site.phoneHref}>{site.phone}</a>
              <br />
              <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            </p>
          </div>
        </div>

        <div className="container">
          <details className="legal" id="impressum">
            <summary>Impressum &amp; Datenschutz</summary>
            <div className="legal__body">
              <div>
                <h3>Impressum</h3>
                <p>
                  Winter Post Solothurn
                  <br />
                  Alter Postplatz, 4500 Solothurn
                  <br />
                  E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
                  <br />
                  Telefon: <a href={site.phoneHref}>{site.phone}</a>
                </p>
              </div>
              <div>
                <h3>Datenschutz</h3>
                <p>
                  Diese Website verwendet keine Cookies, keine Analyse- oder Trackingdienste
                  und kein Kontaktformular. Schriften und Bilder werden direkt von unserem
                  Server ausgeliefert. Beim Aufruf der Seite verarbeitet unser
                  Hosting-Anbieter (Vercel) technisch notwendige Daten wie die IP-Adresse
                  in Server-Logfiles, um die Website sicher auszuliefern. Wenn du uns per
                  E-Mail oder Telefon kontaktierst, verwenden wir deine Angaben nur zur
                  Beantwortung deiner Anfrage.
                </p>
              </div>
            </div>
          </details>
        </div>

        <div className="container footer__bottom">
          <p>© {new Date().getFullYear()} Winter Post Solothurn</p>
          <p>
            Website von{" "}
            <a href="https://webnova.ch" target="_blank" rel="noopener noreferrer">
              Webnova
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
