"use client";

import Link from "next/link";
import { useState } from "react";
import { useNow, usePersistent } from "@/lib/hooks";
import { SHORT_DAYS, weekKey } from "@/lib/dates";
import { mealFor, student, readingPlan, rhythmFor, wordsForTheWeek } from "@/lib/data";
import { ArrowIcon, BackIcon, CheckIcon } from "./Icons";

const STEPS = ["Look back", "The table", "Scripture", "School", "A word"];
const blank = { joy: "", release: "", word: "", schoolNote: "" };

export default function ResetView() {
  const now = useNow();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = usePersistent(`kg:reset:${now ? weekKey(now) : "pending"}`, blank);
  const [completed] = usePersistent(
    "kg:reading",
    Array.from({ length: readingPlan.startCompleted }, (_, i) => i + 1)
  );

  const set = (patch) => setAnswers((a) => ({ ...a, ...patch }));
  const done = step >= STEPS.length;

  const firstReading = Math.min(completed.length + 1, readingPlan.days);
  const lastReading = Math.min(firstReading + 6, readingPlan.days);
  const loops = [1, 2, 3, 4, 5].map((d) => ({ d, block: rhythmFor(d).find((b) => b.id === "loop") }));

  return (
    <div className="fade-in narrow">
      <Link href="/" className="back">
        <BackIcon /> Today
      </Link>
      <header className="hero" style={{ paddingBottom: "1rem" }}>
        <p className="eyebrow">Sunday Reset</p>
        <h1>{done ? "Your week ahead" : "Ten quiet minutes"}</h1>
      </header>

      <div className="steps-dots" aria-hidden>
        {STEPS.map((s, i) => (
          <span key={s} className={i <= step ? "on" : ""} />
        ))}
      </div>

      {!done && (
        <section className="card reset-step" key={step} style={{ animation: "fadeIn 0.6s ease both" }}>
          <p className="eyebrow">
            Step {step + 1} of {STEPS.length} · {STEPS[step]}
          </p>

          {step === 0 && (
            <>
              <h2>How was this week?</h2>
              <p className="muted">There are no wrong answers. A sentence is plenty.</p>
              <p className="prompt">What brought you joy?</p>
              <textarea
                className="textarea"
                value={answers.joy}
                onChange={(e) => set({ joy: e.target.value })}
                placeholder="Ella wrote her first letter to Grandma…"
              />
              <p className="prompt">What can you let go of?</p>
              <textarea
                className="textarea"
                value={answers.release}
                onChange={(e) => set({ release: e.target.value })}
                placeholder="The laundry pile. It will wait."
              />
            </>
          )}

          {step === 1 && (
            <>
              <h2>The table</h2>
              <p className="muted">Here is what you planned. The grocery list is already built from it.</p>
              <ul className="summary-list" style={{ marginTop: "1rem" }}>
                {[0, 1, 2, 3, 4, 5, 6].map((d) => (
                  <li key={d}>
                    <span className="d">{SHORT_DAYS[d]}</span>
                    <span>{mealFor(d).title}</span>
                  </li>
                ))}
              </ul>
              <Link href="/kitchen" className="card-link" style={{ marginTop: "1rem" }}>
                Adjust in the Kitchen <ArrowIcon />
              </Link>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Scripture</h2>
              <p className="muted">Next week you&rsquo;ll read:</p>
              <p className="serif" style={{ fontSize: "2.2rem", margin: "0.75rem 0" }}>
                {readingPlan.book} {firstReading}
                {lastReading > firstReading ? `–${lastReading}` : ""}
              </p>
              <p className="muted">{readingPlan.title} · one chapter a day</p>
            </>
          )}

          {step === 3 && (
            <>
              <h2>School</h2>
              <p className="muted">
                The usual rhythm for {student.name}. Here are the afternoons:
              </p>
              <ul className="summary-list" style={{ marginTop: "1rem" }}>
                {loops.map(({ d, block }) => (
                  <li key={d}>
                    <span className="d">{SHORT_DAYS[d]}</span>
                    <span>
                      {block.title}
                      <span className="row-sub" style={{ display: "block" }}>
                        {block.note}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="prompt">Anything special this week?</p>
              <textarea
                className="textarea"
                value={answers.schoolNote}
                onChange={(e) => set({ schoolNote: e.target.value })}
                placeholder="Library books due Thursday. Dentist on Wednesday at 10."
              />
            </>
          )}

          {step === 4 && (
            <>
              <h2>A word for the week</h2>
              <p className="muted">One word to come back to when the days get full.</p>
              <div className="chips" style={{ marginTop: "1.25rem" }}>
                {wordsForTheWeek.map((w) => (
                  <button key={w} className="chip" aria-pressed={answers.word === w} onClick={() => set({ word: w })}>
                    {w}
                  </button>
                ))}
              </div>
              <input
                className="field"
                style={{ width: "100%", marginTop: "1rem" }}
                placeholder="Or choose your own…"
                value={wordsForTheWeek.includes(answers.word) ? "" : answers.word}
                onChange={(e) => set({ word: e.target.value })}
                aria-label="Your own word"
              />
            </>
          )}

          <div className="reset-actions">
            <button className="btn btn-ghost" onClick={() => setStep((s) => Math.max(s - 1, 0))} disabled={step === 0}>
              Back
            </button>
            <button className="btn btn-primary" onClick={() => setStep((s) => s + 1)}>
              {step === STEPS.length - 1 ? (
                <>
                  <CheckIcon /> Finish
                </>
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </section>
      )}

      {done && (
        <section className="card summary" style={{ animation: "fadeIn 0.8s ease both" }}>
          <p className="eyebrow">This week&rsquo;s word</p>
          <p className="word">{answers.word || "Peace"}</p>
          {answers.joy && (
            <p className="serif" style={{ fontSize: "1.2rem", fontStyle: "italic", marginBottom: "1.25rem" }}>
              &ldquo;{answers.joy}&rdquo;
            </p>
          )}
          <ul className="summary-list">
            {[1, 2, 3, 4, 5, 6, 0].map((d) => (
              <li key={d}>
                <span className="d">{SHORT_DAYS[d]}</span>
                <span>
                  {mealFor(d).title}
                  {d >= 1 && d <= 5 && (
                    <span className="row-sub" style={{ display: "block" }}>
                      Afternoon: {loops[d - 1].block.title}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          {answers.schoolNote && <p className="note">{answers.schoolNote}</p>}
          <div className="reset-actions">
            <button className="btn btn-ghost" onClick={() => setStep(0)}>
              Revisit
            </button>
            <Link href="/" className="btn btn-primary">
              Back to today
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
