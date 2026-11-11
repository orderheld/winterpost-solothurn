import Image from "next/image";
import Header from "@/components/Header";
import OpeningStatus from "@/components/OpeningStatus";
import Snow from "@/components/Snow";
import { Arrow, Calendar, Clock, Instagram, Mail, Pin, Snowflake } from "@/components/Icons";
import { events, galleryImages, menuImages, site, specialHours } from "@/lib/site";
import { getDict, localeInfo, locales, type Locale } from "@/lib/i18n";

function pageUrl(lang: Locale) {
  const path = localeInfo[lang].path;
  return path === "/" ? `${site.url}/` : `${site.url}${path}`;
}

/** Datum (JJJJ-MM-TT) in der Sprache der Seite, Zeitzone Zürich. */
function formatDate(date: string, lang: Locale, opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(localeInfo[lang].htmlLang, { timeZone: "Europe/Zurich", ...opts }).format(
    new Date(`${date}T12:00:00+01:00`),
  );
}

function reservationMailto(lang: Locale) {
  const r = getDict(lang).reservation;
  return `mailto:${site.email}?subject=${encodeURIComponent(r.subject)}&body=${encodeURIComponent(r.body)}`;
}

function JsonLd({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const url = pageUrl(lang);
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
    `${site.url}/og-image.jpg`,
    `${site.url}/images/ort/vogelperspektive.jpg`,
    `${site.url}${posterSrc(lang)}`,
  ];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: `${site.url}/`,
        name: site.name,
        inLanguage: locales.map((l) => localeInfo[l].htmlLang),
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: localeInfo[lang].htmlLang,
        isPartOf: { "@id": `${site.url}/#website` },
      },
      {
        "@type": "FoodEstablishment",
        "@id": `${site.url}/#betrieb`,
        name: site.name,
        slogan: t.claim,
        description: t.meta.description,
        url,
        email: site.email,
        hasMap: site.mapsUrl,
        image: images,
        logo: `${site.url}/icon-512.png`,
        servesCuisine: ["Glühwein", "Raclette", "Swiss winter food"],
        acceptsReservations: true,
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
          ...specialHours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            validFrom: h.date,
            validThrough: h.date,
            ...(h.opens && h.closes ? { opens: h.opens, closes: h.closes } : { opens: "00:00", closes: "00:00" }),
          })),
        ],
      },
      {
        "@type": "Event",
        "@id": `${url}#event`,
        name: `${site.name}: ${t.claim}`,
        description: t.meta.description,
        inLanguage: localeInfo[lang].htmlLang,
        startDate: "2026-11-27T11:00:00+01:00",
        endDate: "2027-01-03T22:00:00+01:00",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        isAccessibleForFree: true,
        image: images,
        location: place,
        organizer: { "@id": `${site.url}/#betrieb` },
        url,
        ...(events.length
          ? {
              subEvent: events.map((e) => ({
                "@type": "Event",
                name: e.title[lang],
                description: e.text[lang],
                startDate: `${e.date}T${e.start ?? "11:00"}:00+01:00`,
                ...(e.end ? { endDate: `${e.date}T${e.end}:00+01:00` } : {}),
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                location: place,
                url: `${url}#events`,
                ...(e.image ? { image: `${site.url}${e.image}` } : {}),
              })),
            }
          : {}),
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

/** Deutsch = Original-Plakat des Kunden, sonst übersetzte Version. */
const posterSrc = (lang: Locale) =>
  lang === "de" ? "/images/poster.jpg" : `/images/poster-${lang}.jpg`;

export default function HomePage({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const languages = locales.map((l) => ({
    code: l,
    label: localeInfo[l].label,
    name: localeInfo[l].name,
    href: localeInfo[l].path,
    hrefLang: localeInfo[l].htmlLang,
  }));

  return (
    <>
      <JsonLd lang={lang} />
      <a href="#inhalt" className="skip-link">
        {t.skip}
      </a>
      <div className="airmail-bar" aria-hidden="true" />
      <Header nav={t.nav} lang={lang} languages={languages} />

      <main id="inhalt">
        {/* ---------- HERO ---------- */}
        <section className="hero" id="top">
          <Snow count={46} />
          <div className="hero__glow" aria-hidden="true" />
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="eyebrow eyebrow--light">
                <Snowflake className="eyebrow__icon" />
                {t.hero.eyebrow}
              </p>
              <h1 className="hero__title">
                <span>{t.hero.title1}</span>
                <span>{t.hero.title2}</span>
              </h1>
              <p className="hero__lead">{t.hero.lead}</p>

              <div className="hero__stamp-row">
                <p className="rubber-stamp">
                  <span className="rubber-stamp__small">{t.hero.stampSmall}</span> {t.hero.stampDate}
                </p>
                <div className="hero__facts">
                  <p className="hero__hours">
                    <Clock className="hero__hours-icon" />
                    {t.hero.hours}
                  </p>
                  <p className="hero__hours">
                    <Calendar className="hero__hours-icon" />
                    {t.hero.until}
                  </p>
                </div>
              </div>

              <div className="hero__actions">
                <a href="#angebot" className="btn btn--red">
                  {t.hero.ctaMenu} <Arrow className="btn__icon" />
                </a>
                <a href={site.mapsUrl} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
                  <Pin className="btn__icon" /> {t.hero.ctaRoute}
                </a>
              </div>

              <OpeningStatus labels={t.status} />
            </div>

            <div className="hero__visual">
              <div className="postcard-stack">
                <figure className="postcard postcard--hero">
                  <Image
                    src={posterSrc(lang)}
                    alt={t.hero.posterAlt}
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
                        {t.hero.ring}
                      </textPath>
                    </text>
                  </svg>
                  <Snowflake className="ring-stamp__flake" />
                </div>
              </div>
            </div>
          </div>
          <a href="#idee" className="hero__scroll" aria-label={t.hero.scroll}>
            <span />
          </a>
        </section>

        {/* ---------- TICKER ---------- */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker__track">
            {[0, 1].map((k) => (
              <div className="ticker__group" key={k}>
                {t.ticker.map((w) => (
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
              <p className="letter__kicker">{t.letter.kicker}</p>
              <h2 className="letter__title">{t.letter.title}</h2>
              <div className="letter__body">
                {t.letter.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="letter__sign">{t.letter.sign}</p>
            </article>

            <div className="idea__side">
              <p className="eyebrow">{t.idea.eyebrow}</p>
              <h2 className="section-title">{t.idea.title}</h2>
              <p className="section-lead">{t.idea.lead}</p>
              <ul className="features">
                {t.idea.features.map((f, i) => (
                  <li key={f.t} className="feature">
                    <span className="feature__icon">{i === 0 ? <Pin /> : i === 1 ? <Clock /> : <Snowflake />}</span>
                    <div>
                      <h3>{f.t}</h3>
                      <p>{f.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- DER ORT ---------- */}
        <section className="section night place" id="ort">
          <Snow count={22} />
          <div className="container place__inner">
            <header className="section-head section-head--light">
              <p className="eyebrow eyebrow--light">{t.place.eyebrow}</p>
              <h2 className="section-title section-title--light">{t.place.title}</h2>
              <p className="section-lead section-lead--light">{t.place.lead}</p>
            </header>

            <div className="gallery">
              {t.place.gallery.map((g, i) => (
                <figure key={galleryImages[i]} className={`gallery__item gallery__item--${i + 1}`}>
                  <Image
                    src={galleryImages[i]}
                    alt={g.alt}
                    fill
                    sizes={i === 0 ? "(max-width: 900px) 100vw, 66vw" : "(max-width: 900px) 100vw, 33vw"}
                  />
                  <figcaption>{g.caption}</figcaption>
                </figure>
              ))}
            </div>
            <p className="place__note">{t.place.note}</p>
          </div>
        </section>

        {/* ---------- ANGEBOT ---------- */}
        <section className="section paper paper--alt" id="angebot">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow">{t.menu.eyebrow}</p>
              <h2 className="section-title">{t.menu.title}</h2>
              <p className="section-lead">{t.menu.lead}</p>
            </header>

            <ul className="menu-grid">
              {t.menu.items.map((item, i) => (
                <li key={item.name} className={`menu-card ${i < 2 ? "menu-card--wide" : ""}`}>
                  <div className="menu-card__photo">
                    <Image
                      src={menuImages[i]}
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
                <p className="eyebrow">{t.menu.barEyebrow}</p>
                <h3 className="bar-strip__title">{t.menu.barTitle}</h3>
              </div>
              <ul className="chips">
                {t.menu.drinks.map((d) => (
                  <li key={d} className="chip">{d}</li>
                ))}
              </ul>
            </div>
            <p className="menu-note">
              <Snowflake className="menu-note__icon" />
              {t.menu.note}
            </p>
          </div>
        </section>

        {/* ---------- EVENTS ---------- */}
        <section className="section paper" id="events">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow">{t.events.eyebrow}</p>
              <h2 className="section-title">{t.events.title}</h2>
              <p className="section-lead">{t.events.lead}</p>
            </header>
            {events.length > 0 ? (
              <ul className="events">
                {events.map((e) => (
                  <li
                    key={`${e.date}-${e.title.de}`}
                    className={e.image ? "event-card event-card--poster" : "event-card"}
                  >
                    {e.image && (
                      <a
                        href={e.image}
                        className="event-card__poster"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={e.title[lang]}
                      >
                        <Image
                          src={e.image}
                          alt={e.title[lang]}
                          width={900}
                          height={1597}
                          sizes="(max-width: 760px) 100vw, 304px"
                        />
                      </a>
                    )}
                    <p className="event-card__date">
                      <span className="event-card__day">{formatDate(e.date, lang, { day: "numeric" })}</span>
                      <span className="event-card__month">{formatDate(e.date, lang, { month: "short" })}</span>
                    </p>
                    <div className="event-card__body">
                      <p className="event-card__meta">
                        {formatDate(e.date, lang, { weekday: "long" })}
                        {e.start && (
                          <>
                            {" · "}
                            {e.start}
                            {e.end && `–${e.end}`}
                            {t.events.time && ` ${t.events.time}`}
                          </>
                        )}
                      </p>
                      <h3 className="event-card__title">{e.title[lang]}</h3>
                      <p className="event-card__text">{e.text[lang]}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="events-empty">
                <Snowflake className="events-empty__icon" />
                <div>
                  <h3 className="events-empty__title">{t.events.emptyTitle}</h3>
                  <p className="events-empty__text">{t.events.emptyText}</p>
                </div>
                <a href={site.instagram} className="btn btn--red" target="_blank" rel="noopener noreferrer">
                  <Instagram className="btn__icon" /> {site.instagramHandle}
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ---------- BESUCH ---------- */}
        <section className="section night" id="besuch">
          <Snow count={28} />
          <div className="container visit">
            <div className="visit__hours">
              <p className="eyebrow eyebrow--light">{t.visit.eyebrow}</p>
              <h2 className="section-title section-title--light">{t.visit.title}</h2>
              <dl className="timetable">
                <div className="timetable__row">
                  <dt><Calendar className="timetable__icon" /> {t.visit.season}</dt>
                  <dd>{t.visit.seasonValue}</dd>
                </div>
                <div className="timetable__row">
                  <dt><Clock className="timetable__icon" /> {t.visit.days}</dt>
                  <dd>{t.visit.daysValue}</dd>
                </div>
                <div className="timetable__row">
                  <dt><Pin className="timetable__icon" /> {t.visit.location}</dt>
                  <dd>{site.address.street}, {site.address.zip} {site.address.city}</dd>
                </div>
              </dl>
              <p className="visit__hint">{t.visit.hint}</p>
              <div className="special-hours">
                <h3 className="special-hours__title">
                  <Calendar className="timetable__icon" /> {t.visit.special.title}
                </h3>
                {specialHours.length > 0 ? (
                  <dl className="timetable timetable--special">
                    {specialHours.map((h) => (
                      <div key={h.date} className="timetable__row">
                        <dt>{formatDate(h.date, lang, { weekday: "long", day: "numeric", month: "long" })}</dt>
                        <dd>{h.hours[lang]}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="special-hours__empty">{t.visit.special.empty}</p>
                )}
              </div>
            </div>

            <div className="visit__card">
              <div className="ticket">
                <div className="ticket__stamp">
                  <Image
                    src="/images/briefmarke-solothurn.jpg"
                    alt={t.visit.stampAlt}
                    width={425}
                    height={475}
                    sizes="180px"
                  />
                </div>
                <p className="ticket__label">{t.visit.addressLabel}</p>
                <address className="ticket__address">
                  {site.name}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.zip} {site.address.city}
                </address>
                <a href={site.mapsUrl} className="btn btn--red btn--block" target="_blank" rel="noopener noreferrer">
                  <Pin className="btn__icon" /> {t.visit.maps}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- RESERVATION ---------- */}
        <section className="section paper" id="reservation">
          <div className="container reservation">
            <div className="reservation__intro">
              <p className="eyebrow">{t.reservation.eyebrow}</p>
              <h2 className="section-title">{t.reservation.title}</h2>
              <p className="section-lead">{t.reservation.lead}</p>
              <ul className="reservation__occasions">
                {t.reservation.occasions.map((o) => (
                  <li key={o.t} className="care__card">
                    <h3>{o.t}</h3>
                    <p>{o.d}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reservation__card">
              <p className="reservation__airmail">{t.contact.airmail}</p>
              <h3 className="reservation__how">{t.reservation.howTitle}</h3>
              <ol className="reservation__steps">
                {t.reservation.how.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <a href={reservationMailto(lang)} className="btn btn--red btn--block">
                <Mail className="btn__icon" /> {t.reservation.cta}
              </a>
              <p className="reservation__note">{t.reservation.note}</p>
            </div>
          </div>
        </section>

        {/* ---------- VERANTWORTUNG ---------- */}
        <section className="section paper paper--alt" id="nachhaltigkeit">
          <div className="container care">
            <div className="care__intro">
              <p className="eyebrow">{t.care.eyebrow}</p>
              <h2 className="section-title">{t.care.title}</h2>
              <p className="section-lead">{t.care.lead}</p>
            </div>
            <ul className="care__grid">
              {t.care.items.map((c, i) => (
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
            <p className="eyebrow eyebrow--light">{t.team.eyebrow}</p>
            <h2 className="team__title">{t.team.title}</h2>
            <p className="team__text">{t.team.text}</p>
            <p className="team__quote">{t.team.quote}</p>
          </div>
        </section>

        {/* ---------- KONTAKT ---------- */}
        <section className="section paper" id="kontakt">
          <div className="container">
            <div className="envelope">
              <div className="envelope__inner">
                <div className="envelope__copy">
                  <p className="eyebrow">{t.contact.eyebrow}</p>
                  <h2 className="section-title">{t.contact.title}</h2>
                  <p className="section-lead">{t.contact.lead}</p>
                  <div className="contact-links">
                    <a className="contact-link" href={`mailto:${site.email}`}>
                      <span className="contact-link__icon"><Mail /></span>
                      <span>
                        <span className="contact-link__label">{t.contact.email}</span>
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
                  <p className="envelope__airmail">{t.contact.airmail}</p>
                  <div className="envelope__lines">
                    {t.contact.lines.map((l) => (
                      <span key={l}>{l}</span>
                    ))}
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
            <Image src="/images/logo-stempel.png" alt={t.footer.logoAlt} width={84} height={84} />
            <div>
              <p className="footer__claim">{t.claim}</p>
              <p className="footer__small">{t.tagline}</p>
            </div>
          </div>
          <div className="footer__col">
            <p className="footer__heading">{t.footer.visit}</p>
            <p>{site.address.street}<br />{site.address.zip} {site.address.city}</p>
            <p>{t.footer.season}<br />{t.footer.hours}</p>
          </div>
          <div className="footer__col">
            <p className="footer__heading">{t.footer.contact}</p>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            </p>
            <ul className="footer__langs" aria-label={t.nav.language}>
              {languages.map((l) => (
                <li key={l.code}>
                  <a
                    href={l.href}
                    hrefLang={l.hrefLang}
                    lang={l.hrefLang}
                    aria-current={l.code === lang ? "page" : undefined}
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container">
          <details className="legal" id="impressum">
            <summary>{t.footer.legal}</summary>
            <div className="legal__body">
              <div>
                <h3>{t.footer.imprint}</h3>
                <p>
                  {site.name}
                  <br />
                  {site.address.street}, {site.address.zip} {site.address.city}
                  <br />
                  {t.footer.emailLabel}: <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
              </div>
              <div>
                <h3>{t.footer.privacy}</h3>
                <p>{t.footer.privacyText}</p>
              </div>
            </div>
          </details>
        </div>

        <div className="container footer__bottom">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>
            {t.footer.credit}{" "}
            <a href="https://webnova.ch" target="_blank" rel="noopener noreferrer">
              Webnova
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
