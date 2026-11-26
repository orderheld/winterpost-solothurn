"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

type Labels = Dict["status"];

type State =
  | { kind: "loading" }
  | { kind: "countdown"; d: number; h: number; m: number; s: number }
  | { kind: "season" }
  | { kind: "over" };

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
  return { kind: "season" };
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

  if (state.kind === "season") {
    return (
      <p className="status status--open" role="status">
        <span className="status__dot" aria-hidden="true" />
        {labels.season}
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
