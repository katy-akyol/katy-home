"use client";

import { useNow, usePersistent } from "@/lib/hooks";
import { dateKey, minutesNow, WEEKDAYS } from "@/lib/dates";
import {
  attendance,
  currentBlockIndex,
  curriculum,
  natureJournal,
  rhythmFor,
  sentenceOfTheWeek,
  spellingWords,
  student,
  writingJourney,
} from "@/lib/data";
import Timeline from "./Timeline";
import { CheckIcon } from "./Icons";

/** Turns "*word*" into italics. */
function Emph({ text }) {
  return text.split(/\*(.+?)\*/g).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}

export default function SchoolView() {
  const now = useNow();
  const [log, setLog] = usePersistent(`kg:log:${now ? dateKey(now) : "pending"}`, []);

  if (!now) return <div className="loading" aria-hidden />;

  const weekday = now.getDay();
  const rhythm = rhythmFor(weekday);
  const current = currentBlockIndex(rhythm, minutesNow(now));
  const loggable = rhythm ? rhythm.filter((b) => b.log) : [];

  // Today counts toward attendance as soon as anything is logged.
  const days = attendance.done + (log.length > 0 ? 1 : 0);
  const pct = days / attendance.goal;
  const R = 44;
  const C = 2 * Math.PI * R;

  const toggle = (id) => setLog((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="fade-in">
      <header className="hero">
        <p className="eyebrow">School · {WEEKDAYS[weekday]}</p>
        <h1>{student.name}&rsquo;s school days</h1>
        <div className="student">
          <span className={`avatar tone-${student.tone}`}>{student.name[0]}</span>
          <span className="muted">
            Age {student.age} · {student.grade} · this term&rsquo;s focus is <strong style={{ color: "var(--ink)" }}>writing</strong>
          </span>
        </div>
      </header>

      <div className="grid">
        <div className="span-7 col">
          <section className="card">
            <div className="card-head">
              <span className="eyebrow">Writing journey</span>
              <span className="small muted">one step at a time</span>
            </div>
            <ol className="journey">
              {writingJourney.map((s) => (
                <li key={s.title} className={s.state}>
                  <span className="mark">{s.state === "done" && <CheckIcon />}</span>
                  <div>
                    <div className="j-title">
                      {s.title}
                      {s.state === "now" && <span className="now-tag">working on</span>}
                    </div>
                    <div className="j-note">
                      <Emph text={s.note} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="card">
            <div className="card-head">
              <span className="eyebrow">Copywork sentence</span>
              <span className="small muted">this week</span>
            </div>
            <p className="copywork">{sentenceOfTheWeek}</p>
            <div className="card-head" style={{ marginTop: "1.5rem" }}>
              <span className="eyebrow">Spelling words</span>
              <span className="small muted">long i with silent e</span>
            </div>
            <div className="spelling">
              {spellingWords.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>
          </section>
        </div>

        <div className="span-5 col">
          <section className="card">
            <div className="card-head">
              <span className="eyebrow">{rhythm ? "Today's rhythm" : "Weekend"}</span>
            </div>
            {rhythm ? (
              <Timeline rhythm={rhythm} current={current} />
            ) : (
              <p className="serif" style={{ fontSize: "1.3rem" }}>
                No lessons today. Rest, play and get outside. Monday&rsquo;s rhythm will be here when you need it.
              </p>
            )}
          </section>

          {rhythm && (
            <section className="card">
              <div className="card-head">
                <span className="eyebrow">Today&rsquo;s log</span>
                <span className="small muted">this builds her records</span>
              </div>
              <ul className="rows">
                {loggable.map((b) => {
                  const done = log.includes(b.id);
                  return (
                    <li key={b.id} className={`row${done ? " is-done" : ""}`}>
                      <button
                        className={`check${done ? " is-done" : ""}`}
                        aria-pressed={done}
                        aria-label={`${b.title} ${done ? "done" : "not done"}`}
                        onClick={() => toggle(b.id)}
                      >
                        <CheckIcon />
                      </button>
                      <div className="row-main" onClick={() => toggle(b.id)}>
                        <div className="row-title">{b.title}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>

        <section className="card span-7">
          <div className="card-head">
            <span className="eyebrow">Curriculum progress</span>
          </div>
          {curriculum.map((s) => (
            <div key={s.subject} className="subject">
              <div className="top">
                <span className="name">{s.subject}</span>
                <span className="small muted">{Math.round((s.done / s.total) * 100)}%</span>
              </div>
              <div className="small muted">{s.detail}</div>
              <div className="progress">
                <span style={{ width: `${(s.done / s.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </section>

        <div className="span-5 col">
          <section className="card">
            <div className="ring-wrap">
              <svg className="ring" width="108" height="108" viewBox="0 0 108 108" aria-hidden>
                <circle className="track" cx="54" cy="54" r={R} />
                <circle
                  className="fill"
                  cx="54"
                  cy="54"
                  r={R}
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - pct)}
                  transform="rotate(-90 54 54)"
                />
              </svg>
              <div>
                <span className="eyebrow">School days this year</span>
                <p className="ring-num">
                  {days}{" "}
                  <span className="muted" style={{ fontSize: "1.2rem" }}>
                    of {attendance.goal}
                  </span>
                </p>
                <p className="small muted">Counted for you from the daily log.</p>
              </div>
            </div>
          </section>

          <section className="card">
            <div className="card-head">
              <span className="eyebrow">Nature journal</span>
            </div>
            {natureJournal.map((e) => (
              <article key={e.date} className="journal-entry">
                <p className="date">{e.date}</p>
                <h3>{e.title}</h3>
                <p className="muted">{e.text}</p>
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
