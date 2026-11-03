"use client";

import Link from "next/link";
import { useNow, usePersistent } from "@/lib/hooks";
import { dateKey, dayOfYear, greeting, longDate, minutesNow } from "@/lib/dates";
import { currentBlockIndex, mealFor, owner, readingPlan, rhythmFor, student, verses } from "@/lib/data";
import Intentions from "./Intentions";
import Timeline from "./Timeline";
import { ArrowIcon, BookIcon, PotIcon } from "./Icons";

export default function TodayView() {
  const now = useNow();
  const [completed] = usePersistent(
    "kg:reading",
    Array.from({ length: readingPlan.startCompleted }, (_, i) => i + 1)
  );

  if (!now) return <div className="loading" aria-hidden />;

  const weekday = now.getDay();
  const verse = verses[dayOfYear(now) % verses.length];
  const dinner = mealFor(weekday);
  const rhythm = rhythmFor(weekday);
  const current = currentBlockIndex(rhythm, minutesNow(now));
  const readingDay = Math.min(completed.length + 1, readingPlan.days);
  const planDone = completed.length >= readingPlan.days;
  const daysToSunday = (7 - weekday) % 7;

  return (
    <div className="fade-in">
      <header className="hero">
        <p className="eyebrow">{longDate(now)}</p>
        <h1>
          {greeting(now)}, {owner}.
        </h1>
      </header>

      <div className="grid">
        <section className="card verse-card today-verse span-7 stretch" aria-label="Verse for today">
          <div className="breath" aria-hidden />
          <blockquote>&ldquo;{verse.text}&rdquo;</blockquote>
          <cite>{verse.ref}</cite>
          <p className="breath-hint">Breathe in as the light grows, and out as it fades.</p>
        </section>

        <div className="span-5">
          <Intentions dateKey={dateKey(now)} />
        </div>

        <section className="card span-5">
          <div className="card-head">
            <span className="eyebrow">{rhythm ? `${student.name}'s day` : "No school today"}</span>
            <Link href="/school" className="card-link">
              School <ArrowIcon />
            </Link>
          </div>
          {rhythm ? (
            <Timeline rhythm={rhythm} current={current} compact />
          ) : (
            <p className="serif" style={{ fontSize: "1.3rem" }}>
              {weekday === 0 ? "A day of rest and worship." : "A slow Saturday. Let Ella play."}
            </p>
          )}
        </section>

        <div className="span-7 col">
          <section className="card">
            <div className="card-head">
              <span className="eyebrow">Scripture</span>
              <Link href="/bible" className="card-link">
                Open <ArrowIcon />
              </Link>
            </div>
            <Link href="/bible" className="feature">
              <span className="feature-swatch tone-sage">
                <BookIcon />
              </span>
              <div>
                <h3>{planDone ? "Plan complete" : `${readingPlan.book} ${readingDay}`}</h3>
                <p className="small muted">
                  {readingPlan.title} · day {readingDay} of {readingPlan.days}
                </p>
              </div>
            </Link>
          </section>

          <section className="card">
            <div className="card-head">
              <span className="eyebrow">{weekday === 6 ? "This morning's table" : "Tonight's table"}</span>
              <Link href="/kitchen" className="card-link">
                Kitchen <ArrowIcon />
              </Link>
            </div>
            {dinner.href ? (
              <Link href={dinner.href} className="feature">
                <span className={`feature-swatch tone-${dinner.recipe.tone}`}>
                  <PotIcon />
                </span>
                <div>
                  <h3>{dinner.title}</h3>
                  <p className="small muted">
                    {dinner.subtitle} · {dinner.note}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="feature">
                <span className="feature-swatch tone-honey">
                  <PotIcon />
                </span>
                <div>
                  <h3>{dinner.title}</h3>
                  <p className="small muted">{dinner.note}</p>
                </div>
              </div>
            )}
          </section>

          <Link href="/reset" className="card reset-card" style={{ display: "block" }}>
            <span className="eyebrow">
              {weekday === 0 ? "Today" : `In ${daysToSunday} day${daysToSunday === 1 ? "" : "s"}`}
            </span>
            <h3>Sunday Reset</h3>
            <p className="small muted">
              {weekday === 0
                ? "Ten quiet minutes to look back, then plan the week ahead."
                : "Ten quiet minutes each Sunday to plan the meals, readings and lessons in one place."}
            </p>
            <p className="card-link" style={{ marginTop: "0.75rem" }}>
              {weekday === 0 ? "Begin" : "Take a look"} <ArrowIcon />
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
