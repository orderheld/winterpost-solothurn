"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type State =
  | { kind: "loading" }
  | { kind: "countdown"; d: number; h: number; m: number; s: number }
  | { kind: "open"; until: string }
  | { kind: "closed"; next: string };

function zurichHour(now: Date) {
  const parts = new Intl.DateTimeFormat("de-CH", {
    timeZone: "Europe/Zurich",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h + m / 60;
}

function compute(now: Date): State {
  const opening = new Date(site.openingIso).getTime();
  const diff = opening - now.getTime();
  if (diff > 0) {
    const total = Math.floor(diff / 1000);
    return {
      kind: "countdown",
      d: Math.floor(total / 86400),
      h: Math.floor((total % 86400) / 3600),
      m: Math.floor((total % 3600) / 60),
      s: total % 60,
    };
  }
  const hour = zurichHour(now);
  if (hour >= site.hours.open && hour < site.hours.close) {
    return { kind: "open", until: `${site.hours.close}:00` };
  }
  return {
    kind: "closed",
    next: hour < site.hours.open ? `heute ab ${site.hours.open}:00 Uhr` : `morgen ab ${site.hours.open}:00 Uhr`,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function OpeningStatus() {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    const tick = () => setState(compute(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (state.kind === "open") {
    return (
      <p className="status status--open" role="status">
        <span className="status__dot" aria-hidden="true" />
        Jetzt geöffnet, bis {state.until} Uhr
      </p>
    );
  }

  if (state.kind === "closed") {
    return (
      <p className="status" role="status">
        <span className="status__dot status__dot--off" aria-hidden="true" />
        Gerade geschlossen. Wir sind {state.next} wieder für dich da.
      </p>
    );
  }

  const units =
    state.kind === "countdown"
      ? [
          { v: state.d, l: state.d === 1 ? "Tag" : "Tage" },
          { v: state.h, l: "Std." },
          { v: state.m, l: "Min." },
          { v: state.s, l: "Sek." },
        ]
      : [
          { v: null, l: "Tage" },
          { v: null, l: "Std." },
          { v: null, l: "Min." },
          { v: null, l: "Sek." },
        ];

  return (
    <div className="countdown" aria-label="Countdown bis zur Eröffnung">
      <p className="countdown__label">Noch bis zur Eröffnung</p>
      <ol className="countdown__grid">
        {units.map((u) => (
          <li key={u.l} className="countdown__unit">
            <span className="countdown__value" suppressHydrationWarning>
              {u.v === null ? "--" : pad(u.v)}
            </span>
            <span className="countdown__unitlabel">{u.l}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
