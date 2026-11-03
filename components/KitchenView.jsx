"use client";

import Link from "next/link";
import { useState } from "react";
import { useNow, usePersistent } from "@/lib/hooks";
import { SHORT_DAYS, weekKey } from "@/lib/dates";
import { groceryList, mealFor, recipes } from "@/lib/data";
import { ArrowIcon, CheckIcon, PotIcon } from "./Icons";

const ORDER = [1, 2, 3, 4, 5, 6, 0];

export default function KitchenView() {
  const now = useNow();

  return (
    <div className="fade-in">
      <header className="hero">
        <p className="eyebrow">Kitchen · Turkish home cooking</p>
        <h1>This week&rsquo;s table</h1>
        <p className="lede">Plan the week once on Sunday, and the grocery list is made for you.</p>
      </header>

      <div className="grid">
        <div className="span-7">
          <Week today={now ? now.getDay() : -1} />
        </div>
        <div className="span-5">
          <Groceries week={now ? weekKey(now) : "pending"} />
        </div>
      </div>

      <Recipes />
    </div>
  );
}

function Week({ today }) {
  return (
    <section className="card" style={{ padding: "1.25rem 0.9rem" }}>
      <div className="card-head" style={{ padding: "0 0.6rem" }}>
        <span className="eyebrow">The week</span>
      </div>
      <ul className="week">
        {ORDER.map((d) => {
          const meal = mealFor(d);
          const inner = (
            <>
              <span className="day">{SHORT_DAYS[d]}</span>
              <span>
                <span className="meal">{meal.title}</span>
                <span className="row-sub" style={{ display: "block" }}>
                  {d === today ? "Today · " : ""}
                  {meal.subtitle ? `${meal.subtitle} · ` : ""}
                  {meal.note}
                </span>
              </span>
              {meal.href ? <ArrowIcon className="chev" /> : <span />}
            </>
          );
          return (
            <li key={d} className={d === today ? "is-today" : ""}>
              {meal.href ? <Link href={meal.href}>{inner}</Link> : <div>{inner}</div>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Groceries({ week }) {
  const groups = groceryList();
  const [got, setGot] = usePersistent(`kg:groceries:${week}`, []);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  const toggle = (id) => setGot((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <section className="card">
      <div className="card-head">
        <span className="eyebrow">Built from your meal plan</span>
        <span className="small muted">
          {got.length} of {total}
        </span>
      </div>
      {groups.map((g) => (
        <div key={g.aisle} className="aisle">
          <h3>{g.aisle}</h3>
          <ul className="rows">
            {g.items.map((it) => {
              const done = got.includes(it.id);
              return (
                <li key={it.id} className={`row${done ? " is-done" : ""}`}>
                  <button
                    className={`check${done ? " is-done" : ""}`}
                    aria-label={`${done ? "Unmark" : "Mark"} ${it.item}`}
                    aria-pressed={done}
                    onClick={() => toggle(it.id)}
                  >
                    <CheckIcon />
                  </button>
                  <div className="row-main grocery-line" onClick={() => toggle(it.id)}>
                    <span className="row-title">{it.item}</span>
                    <span className="row-sub" title={it.count > 1 ? `For ${it.count} meals` : undefined}>
                      {it.qty}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}

function Recipes() {
  const [url, setUrl] = useState("");
  const [tried, setTried] = useState(false);

  return (
    <>
      <div className="hero-row section-title">
        <h2>Recipe box</h2>
        <span className="small muted">{recipes.length} recipes</span>
      </div>
      <section className="card" style={{ marginBottom: "1.5rem" }}>
        <div className="card-head">
          <span className="eyebrow">Add from the web</span>
        </div>
        <form
          className="import"
          onSubmit={(e) => {
            e.preventDefault();
            setTried(true);
          }}
        >
          <input
            className="field"
            type="url"
            inputMode="url"
            placeholder="Paste a recipe link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            aria-label="Recipe link"
          />
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </form>
        {tried && (
          <p className="note">
            Coming soon: paste any recipe link and it will arrive here as just the recipe, without the long story or the
            ads.
          </p>
        )}
      </section>

      <div className="recipe-grid">
        {recipes.map((r) => (
          <Link key={r.slug} href={`/kitchen/${r.slug}`} className="recipe-tile">
            <div className={`art tone-${r.tone}`}>
              <PotIcon />
            </div>
            <div className="body">
              <h3>{r.title}</h3>
              <p className="meta">{r.subtitle}</p>
              <p className="meta">
                {r.time} · serves {r.serves}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
