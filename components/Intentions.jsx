"use client";

import { usePersistent } from "@/lib/hooks";
import { CheckIcon } from "./Icons";

const prompts = ["Something for the soul…", "Something for the home…", "Something for someone I love…"];

const empty = prompts.map(() => ({ text: "", done: false }));

export default function Intentions({ dateKey }) {
  const [items, setItems] = usePersistent(`kg:intentions:${dateKey}`, empty);

  const update = (i, patch) => setItems((prev) => prev.map((it, j) => (j === i ? { ...it, ...patch } : it)));

  return (
    <section className="card">
      <div className="card-head">
        <span className="eyebrow">Three intentions</span>
        <span className="small muted">only three, on purpose</span>
      </div>
      <ul className="rows">
        {items.map((it, i) => (
          <li key={i} className={`row${it.done ? " is-done" : ""}`}>
            <button
              className={`check${it.done ? " is-done" : ""}`}
              aria-label={it.done ? "Mark as not done" : "Mark as done"}
              aria-pressed={it.done}
              onClick={() => update(i, { done: !it.done })}
            >
              <CheckIcon />
            </button>
            <input
              className="intent-input"
              value={it.text}
              placeholder={prompts[i]}
              aria-label={`Intention ${i + 1}`}
              onChange={(e) => update(i, { text: e.target.value })}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
