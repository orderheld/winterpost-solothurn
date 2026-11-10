"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

type Labels = Dict["status"];

type State =
  | { kind: "loading" }
  | { kind: "countdown"; d: number; h: number; m: number; s: number }
  | { kind: "open"; until: string }
  | { kind: "closed"; tomorrow: boolean }
  | { kind: "over" };

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
  if (now.getTime() >= new Date(site.closingIso).getTime()) {
    return { kind: "over" };
  }
  const hour = zurichHour(now);
  if (hour >= site.hours.open && hour < site.hours.close) {
    return { kind: "open", until: `${site.hours.close}:00` };
  }
  return { kind: "closed", tomorrow: hour >= site.hours.open };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function OpeningStatus({ labels }: { labels: Labels }) {
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
        {labels.open.replace("{time}", state.until)}
      </p>
    );
  }

  if (state.kind === "over") {
    return (
      <p className="status" role="status">
        <span className="status__dot status__dot--off" aria-hidden="true" />
        {labels.over}
      </p>
    );
  }

  if (state.kind === "closed") {
    return (
      <p className="status" role="status">
        <span className="status__dot status__dot--off" aria-hidden="true" />
        {(state.tomorrow ? labels.closedTomorrow : labels.closedToday).replace(
          "{time}",
          `${site.hours.open}:00`,
        )}
      </p>
    );
  }

  const units =
    state.kind === "countdown"
      ? [
          { k: "d", v: state.d, l: state.d === 1 ? labels.day : labels.days },
          { k: "h", v: state.h, l: labels.hours },
          { k: "m", v: state.m, l: labels.minutes },
          { k: "s", v: state.s, l: labels.seconds },
        ]
      : [
          { k: "d", v: null, l: labels.days },
          { k: "h", v: null, l: labels.hours },
          { k: "m", v: null, l: labels.minutes },
          { k: "s", v: null, l: labels.seconds },
        ];

  return (
    <div className="countdown" aria-label={labels.countdownAria}>
      <p className="countdown__label">{labels.countdownLabel}</p>
      <ol className="countdown__grid">
        {units.map((u) => (
          <li key={u.k} className="countdown__unit">
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
