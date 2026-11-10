import Image from "next/image";
import Header from "@/components/Header";
import OpeningStatus from "@/components/OpeningStatus";
import Snow from "@/components/Snow";
import { Arrow, Calendar, Clock, Instagram, Mail, Pin, Snowflake } from "@/components/Icons";
import { menu, site } from "@/lib/site";

const gallery = [
  {
    src: "/images/ort/vogelperspektive.jpg",
    alt: "Visualisierung der Winter Post aus der Vogelperspektive: Holzhütten, Schirme, Zelt, Tannen mit Lichterketten und Sitzplätze",
    caption: "Das Winterdorf aus der Vogelperspektive",
  },
  {
    src: "/images/ort/bar.jpg",
    alt: "Visualisierung der Bar-Hütte mit Lichterketten, Tannenbaum und Gästen am Abend",
    caption: "Bar und Küche in den Holzhütten",
  },
  {
    src: "/images/ort/lounge.jpg",
    alt: "Visualisierung der Lounge mit Sitzplätzen auf Holzstämmen zwischen beleuchteten Tannen",
    caption: "Winter-Lounge unter Lichterketten",
  },
];

const tickerWords = [
  "Glühwein",
  "Heisse Schokolade",
  "Raclettebrot",
  "Grillwurst",
  "Pilzrisotto",
  "Punsch",
  "Weihnachtszauber",
  "Alter Postplatz",
];

function JsonLd() {
  const place = {
    "@type": "Place",
    name: `${site.address.street}, ${site.address.city}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressRegion: "SO",
      addressCountry: site.address.country,
    },
  };
  const images = [
    `${site.url}/opengraph-image.jpg`,
    `${site.url}/images/ort/vogelperspektive.jpg`,
    `${site.url}/images/poster.jpg`,
  ];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "de-CH",
      },
      {
        "@type": "FoodEstablishment",
        "@id": `${site.url}/#betrieb`,
        name: site.name,
        slogan: site.claim,
        description: site.description,
        url: site.url,
        email: site.email,
        image: images,
        logo: `${site.url}/icon-512.png`,
        servesCuisine: ["Glühwein", "Raclette", "Schweizer Winterküche"],
        acceptsReservations: false,
        sameAs: [site.instagram],
        address: place.address,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "11:00",
            closes: "22:00",
            validFrom: "2026-11-27",
            validThrough: "2027-01-03",
          },
        ],
      },
      {
        "@type": "Event",
        "@id": `${site.url}/#event`,
        name: `${site.name}: ${site.claim}`,
        description: site.description,
        startDate: "2026-11-27T11:00:00+01:00",
        endDate: "2027-01-03T22:00:00+01:00",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        isAccessibleForFree: true,
        image: images,
        location: place,
        organizer: { "@id": `${site.url}/#betrieb` },
        url: site.url,
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
                Glühwein, Genuss &amp; Weihnachtszauber: Dein Winter-Pop-up im Herzen
                von Solothurn. Komm vorbei, wärm dich auf und triff deine Leute.
              </p>

              <div className="hero__stamp-row">
                <p className="rubber-stamp">
                  <span className="rubber-stamp__small">Ab</span> 27. November 2026
                </p>
                <div className="hero__facts">
                  <p className="hero__hours">
                    <Clock className="hero__hours-icon" />
                    Täglich 11:00 – 22:00 Uhr
                  </p>
                  <p className="hero__hours">
                    <Calendar className="hero__hours-icon" />
                    Bis 3. Januar 2027
                  </p>
                </div>
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
                    sizes="(max-width: 900px) 320px, 440px"
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
                  gerade in den Wintermonaten braucht eine Stadt Orte, die Menschen
                  zusammenbringen. Die Winter Post ist so ein Ort: offen, einladend und
                  voller Atmosphäre.
                </p>
                <p>
                  Komm nach der Arbeit auf einen warmen Drink vorbei, iss etwas mit der
                  Familie oder geniess mit Freunden einen langen Winterabend. Holz, warmes
                  Licht und Tannen sorgen für Geborgenheit, Glühwein und Raclette für den
                  Genuss.
                </p>
                <p>Ein Ort. Ein Winter. Gemeinsame Momente. Wir freuen uns auf euch!</p>
              </div>
              <p className="letter__sign">Eure Winter Post</p>
            </article>

            <div className="idea__side">
              <p className="eyebrow">Die Idee</p>
              <h2 className="section-title">Winter in der Stadt. Aber anders.</h2>
              <p className="section-lead">
                Kein klassischer Weihnachtsmarkt, sondern ein zeitgemässer Winter-Pop-up:
                ein Ort zum Ankommen, Verweilen, Essen, Trinken und Zusammensein.
              </p>
              <ul className="features">
                <li className="feature">
                  <span className="feature__icon"><Pin /></span>
                  <div>
                    <h3>Ein kleines Winterdorf</h3>
                    <p>Holzhütten, Lichterketten, Tannen und gemütliche Lounge-Bereiche auf dem Alten Postplatz.</p>
                  </div>
                </li>
                <li className="feature">
                  <span className="feature__icon"><Clock /></span>
                  <div>
                    <h3>Jeden Tag für dich da</h3>
                    <p>Vom 27. November bis 3. Januar, täglich von 11 bis 22 Uhr: zum Zmittag, zum Feierabend oder für einen späten Glühwein.</p>
                  </div>
                </li>
                <li className="feature">
                  <span className="feature__icon"><Snowflake /></span>
                  <div>
                    <h3>Für alle</h3>
                    <p>Für Solothurnerinnen und Solothurner, Familien, Freunde, Firmen und Gäste der Stadt.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- DER ORT ---------- */}
        <section className="section night place" id="ort">
          <Snow count={22} />
          <div className="container place__inner">
            <header className="section-head section-head--light">
              <p className="eyebrow eyebrow--light">Der Ort</p>
              <h2 className="section-title section-title--light">So sieht die Winter Post aus</h2>
              <p className="section-lead section-lead--light">
                Mitten in Solothurn entsteht eine stimmungsvolle Winterwelt: Hütten mit
                Bar und Küche, Sitzplätze auf Holzstämmen, ein Zelt und überall
                warmes Licht. Schon beim Betreten fühlt es sich an wie ein kleines
                Winterdorf.
              </p>
            </header>

            <div className="gallery">
              {gallery.map((g, i) => (
                <figure key={g.src} className={`gallery__item gallery__item--${i + 1}`}>
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes={i === 0 ? "(max-width: 900px) 100vw, 66vw" : "(max-width: 900px) 100vw, 33vw"}
                  />
                  <figcaption>{g.caption}</figcaption>
                </figure>
              ))}
            </div>
            <p className="place__note">Visualisierungen. Die definitive Umsetzung kann im Detail abweichen.</p>
          </div>
        </section>

        {/* ---------- ANGEBOT ---------- */}
        <section className="section paper paper--alt" id="angebot">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow">Unser Angebot</p>
              <h2 className="section-title">Aus der Winterküche</h2>
              <p className="section-lead">
                Einfach, hochwertig und passend zur kalten Jahreszeit: eine kompakte Auswahl
                an Wintergerichten, Snacks und saisonalen Spezialitäten.
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
            <div className="bar-strip">
              <div className="bar-strip__head">
                <p className="eyebrow">Heiss &amp; gemütlich</p>
                <h3 className="bar-strip__title">Und an der Bar</h3>
              </div>
              <ul className="chips">
                {["Glühwein", "Punsch", "Heisse Schokolade", "Kaffee", "Tee", "Klassische Drinks", "Alkoholfreie Alternativen"].map((d) => (
                  <li key={d} className="chip">{d}</li>
                ))}
              </ul>
            </div>
            <p className="menu-note">
              <Snowflake className="menu-note__icon" />
              Wo sinnvoll mit lokalen und regionalen Partnern. Das aktuelle Angebot und die Preise findest du vor Ort.
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
                  <dt><Calendar className="timetable__icon" /> Saison</dt>
                  <dd>27. November 2026 – 3. Januar 2027</dd>
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

        {/* ---------- VERANTWORTUNG ---------- */}
        <section className="section paper paper--alt" id="nachhaltigkeit">
          <div className="container care">
            <div className="care__intro">
              <p className="eyebrow">Verantwortung</p>
              <h2 className="section-title">Gemütlich und trotzdem bewusst</h2>
              <p className="section-lead">
                Ein temporäres Projekt kann hochwertig wirken und gleichzeitig sorgsam mit
                Ressourcen umgehen. Darum setzen wir auf natürliche Materialien und eine
                möglichst ressourcenschonende Umsetzung.
              </p>
            </div>
            <ul className="care__grid">
              {[
                { t: "Wiederverwenden", d: "Modulare Hütten, Mobiliar und Dekoration für mehrere Einsätze." },
                { t: "Trennen", d: "Klare Abfallstationen für Glas, PET/Alu, Rest- und organische Abfälle." },
                { t: "Mehrweg", d: "Mehrweggeschirr und langlebige Lösungen, wo immer es betrieblich sinnvoll ist." },
                { t: "Regional", d: "Kurze Wege und lokale Partnerschaften, wo immer möglich." },
              ].map((c, i) => (
                <li key={c.t} className="care__card">
                  <span className="care__no">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- TEAM ---------- */}
        <section className="team" id="team">
          <Image
            src="/images/ort/lounge.jpg"
            alt=""
            fill
            sizes="100vw"
            className="team__bg"
          />
          <div className="container team__inner">
            <p className="eyebrow eyebrow--light">Das Team</p>
            <h2 className="team__title">Erfahrung trifft Leidenschaft.</h2>
            <p className="team__text">
              Hinter der Winter Post steht eine Crew mit einem erfolgreichen Jahrzehnt im
              Eventmanagement, von Musikevents bis zu Pop-up-Konzepten. Wir koordinieren
              Gastronomie, Künstler, Infrastruktur und Technik und haben einen klaren
              Anspruch: Erwartungen nicht nur erfüllen, sondern übertreffen. Mit der
              Winter Post wollen wir die kalte Jahreszeit in Solothurn bereichern.
            </p>
            <p className="team__quote">Aus Solothurn. Für Solothurn.</p>
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
                    Nachricht.
                  </p>
                  <div className="contact-links">
                    <a className="contact-link" href={`mailto:${site.email}`}>
                      <span className="contact-link__icon"><Mail /></span>
                      <span>
                        <span className="contact-link__label">E-Mail</span>
                        <span className="contact-link__value">{site.email}</span>
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
            <p>27.11.2026 – 3.1.2027<br />täglich 11–22 Uhr</p>
          </div>
          <div className="footer__col">
            <p className="footer__heading">Kontakt</p>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
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
                  E-Mail oder Instagram kontaktierst, verwenden wir deine Angaben nur zur
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
