"use client";

import { useState } from "react";
import { usePersistent } from "@/lib/hooks";
import { journalEntry, memoryVerse, prayers, readingPlan } from "@/lib/data";
import { CheckIcon, LeafIcon } from "./Icons";

const initialCompleted = Array.from({ length: readingPlan.startCompleted }, (_, i) => i + 1);

export default function BibleView() {
  const [completed, setCompleted] = usePersistent("kg:reading", initialCompleted);
  const [answered, setAnswered] = usePersistent(
    "kg:answered",
    prayers.filter((p) => p.answered).map((p) => p.id)
  );
  const [revealed, setRevealed] = useState(false);

  const today = Math.min(completed.length + 1, readingPlan.days);
  const allDone = completed.length >= readingPlan.days;

  const toggleDay = (day) =>
    setCompleted((prev) => {
      // Keep the vine simple: tapping a leaf grows the vine up to that day,
      // or trims it back if you tap the newest leaf.
      if (prev.includes(day) && day === prev.length) return prev.slice(0, -1);
      return Array.from({ length: Math.max(day, prev.length) }, (_, i) => i + 1);
    });

  const toggleAnswered = (id) =>
    setAnswered((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const open = prayers.filter((p) => !answered.includes(p.id));
  const closed = prayers.filter((p) => answered.includes(p.id));

  return (
    <div className="fade-in">
      <header className="hero">
        <p className="eyebrow">Scripture</p>
        <h1>Abide</h1>
        <p className="lede">A slow reading plan, a journal for what you notice, and a record of your prayers.</p>
      </header>

      <div className="grid">
      <div className="span-7 col">
      <section className="card">
        <div className="card-head">
          <span className="eyebrow">{readingPlan.title}</span>
          <span className="small muted">
            {completed.length} of {readingPlan.days}
          </span>
        </div>
        <div className="vine" role="group" style={{ maxWidth: "30rem" }} aria-label="Reading plan progress">
          {Array.from({ length: readingPlan.days }, (_, i) => i + 1).map((day) => {
            const done = completed.includes(day);
            const isToday = !allDone && day === today;
            return (
              <button
                key={day}
                className={`${done ? "is-done" : ""}${isToday ? " is-today" : ""}`}
                onClick={() => toggleDay(day)}
                aria-label={`Day ${day}: ${readingPlan.book} ${day}${done ? ", read" : ""}`}
              >
                <LeafIcon filled={done} />
              </button>
            );
          })}
        </div>
        {allDone ? (
          <p className="serif" style={{ fontSize: "1.3rem" }}>
            The whole vine is green. Well done, faithful one.
          </p>
        ) : (
          <div className="feature" style={{ justifyContent: "space-between" }}>
            <div>
              <h3>
                {readingPlan.book} {today}
              </h3>
              <p className="small muted">Today&rsquo;s chapter · {readingPlan.subtitle.toLowerCase()}</p>
            </div>
            <button className="btn btn-soft" onClick={() => toggleDay(today)}>
              <CheckIcon /> Read
            </button>
          </div>
        )}
      </section>

      <section className="card">
        <div className="card-head">
          <span className="eyebrow">{journalEntry.passage}</span>
          <span className="small muted">Study journal · SOAP method</span>
        </div>
        <div className="soap">
          <div>
            <span className="letter">S</span>
            <div>
              <div className="label">Scripture</div>
              <p className="scripture-text">&ldquo;{journalEntry.scripture}&rdquo;</p>
            </div>
          </div>
          <div>
            <span className="letter">O</span>
            <div>
              <div className="label">Observation</div>
              <p>{journalEntry.observation}</p>
            </div>
          </div>
          <div>
            <span className="letter">A</span>
            <div>
              <div className="label">Application</div>
              <p>{journalEntry.application}</p>
            </div>
          </div>
          <div>
            <span className="letter">P</span>
            <div>
              <div className="label">Prayer</div>
              <p>{journalEntry.prayer}</p>
            </div>
          </div>
        </div>
      </section>

      </div>

      <div className="span-5 col">
      <section className="card">
        <div className="card-head">
          <span className="eyebrow">Prayer list</span>
          <span className="small muted">tap when answered</span>
        </div>
        <ul className="rows">
          {open.map((p) => (
            <li key={p.id} className="row">
              <button className="check" aria-label={`Mark "${p.text}" as answered`} onClick={() => toggleAnswered(p.id)}>
                <CheckIcon />
              </button>
              <div className="row-main">
                <div className="row-title">{p.text}</div>
                <div className="row-sub">Since {p.since}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {closed.length > 0 && (
        <section className="card">
          <div className="card-head">
            <span className="eyebrow">Answered</span>
            <span className="small muted">remember His faithfulness</span>
          </div>
          <ul className="rows">
            {closed.map((p) => (
              <li key={p.id} className="row">
                <button
                  className="check is-done"
                  aria-label={`Move "${p.text}" back to the list`}
                  onClick={() => toggleAnswered(p.id)}
                >
                  <CheckIcon />
                </button>
                <div className="row-main">
                  <div className="row-title">{p.text}</div>
                  <div className="answered">{p.answered || "Answered · this week"}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <button className="card memory" onClick={() => setRevealed((r) => !r)} aria-live="polite">
        {revealed ? (
          <div className="fade-in" key="text">
            <p className="text">&ldquo;{memoryVerse.text}&rdquo;</p>
            <p className="small muted" style={{ marginTop: "0.75rem" }}>
              {memoryVerse.ref} · tap to hide
            </p>
          </div>
        ) : (
          <div className="fade-in" key="ref">
            <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>Memory verse</p>
            <p className="ref">{memoryVerse.ref}</p>
            <p className="small muted" style={{ marginTop: "0.5rem" }}>
              Say it from memory, then tap to check
            </p>
          </div>
        )}
      </button>
      </div>
      </div>
    </div>
  );
}
