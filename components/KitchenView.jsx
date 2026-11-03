"use client";

import Link from "next/link";
import { useState } from "react";
import { useNow, usePersistent } from "@/lib/hooks";
import { SHORT_DAYS, weekKey } from "@/lib/dates";
import { groceryList, mealFor, recipes } from "@/lib/data";
import { ArrowIcon, CheckIcon, PotIcon, TrashIcon } from "./Icons";

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
  const [cookbook, setCookbook] = usePersistent("kg:cookbook", { recipes: [], subsections: [] });
  const [editingSection, setEditingSection] = useState(null);
  const [newSection, setNewSection] = useState("");
  const [draggedId, setDraggedId] = useState(null);

  const addRecipe = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    try {
      new URL(url); // Validate URL
      const id = `recipe-${Date.now()}`;
      const title = new URL(url).hostname || url;

      setCookbook((prev) => ({
        ...prev,
        recipes: [
          ...prev.recipes,
          {
            id,
            url: url.trim(),
            title,
            subsection: null,
            addedAt: new Date().toISOString(),
          },
        ],
      }));
      setUrl("");
    } catch {
      alert("Please enter a valid URL");
    }
  };

  const deleteRecipe = (id) => {
    setCookbook((prev) => ({
      ...prev,
      recipes: prev.recipes.filter((r) => r.id !== id),
    }));
  };

  const moveRecipe = (id, subsection) => {
    setCookbook((prev) => ({
      ...prev,
      recipes: prev.recipes.map((r) => (r.id === id ? { ...r, subsection } : r)),
    }));
  };

  const addSection = () => {
    if (!newSection.trim()) return;
    setCookbook((prev) => ({
      ...prev,
      subsections: [...prev.subsections, newSection.trim()],
    }));
    setNewSection("");
    setEditingSection(null);
  };

  const deleteSection = (section) => {
    setCookbook((prev) => ({
      ...prev,
      subsections: prev.subsections.filter((s) => s !== section),
      recipes: prev.recipes.map((r) => (r.subsection === section ? { ...r, subsection: null } : r)),
    }));
  };

  const moveRecipeUp = (id) => {
    setCookbook((prev) => {
      const idx = prev.recipes.findIndex((r) => r.id === id);
      if (idx <= 0) return prev;
      const newRecipes = [...prev.recipes];
      [newRecipes[idx], newRecipes[idx - 1]] = [newRecipes[idx - 1], newRecipes[idx]];
      return { ...prev, recipes: newRecipes };
    });
  };

  const moveRecipeDown = (id) => {
    setCookbook((prev) => {
      const idx = prev.recipes.findIndex((r) => r.id === id);
      if (idx >= prev.recipes.length - 1) return prev;
      const newRecipes = [...prev.recipes];
      [newRecipes[idx], newRecipes[idx + 1]] = [newRecipes[idx + 1], newRecipes[idx]];
      return { ...prev, recipes: newRecipes };
    });
  };

  const recipesInSection = (section) =>
    cookbook.recipes.filter((r) => (section === null ? r.subsection === null : r.subsection === section));

  return (
    <>
      <div className="hero-row section-title">
        <h2>Recipe box</h2>
        <span className="small muted">{recipes.length + cookbook.recipes.length} recipes</span>
      </div>

      <section className="card" style={{ marginBottom: "1.5rem" }}>
        <div className="card-head">
          <span className="eyebrow">Add from the web</span>
        </div>
        <form className="import" onSubmit={addRecipe}>
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
      </section>

      {cookbook.recipes.length > 0 && (
        <section className="card" style={{ marginBottom: "1.5rem" }}>
          <div className="card-head">
            <span className="eyebrow">My cookbook</span>
            <span className="small muted">{cookbook.recipes.length} saved</span>
          </div>

          {recipesInSection(null).length > 0 && (
            <div className="cookbook-section">
              <h3 style={{ fontSize: "0.9rem", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Unsorted
              </h3>
              <ul className="cookbook-list">
                {recipesInSection(null).map((r) => (
                  <CookbookRecipe
                    key={r.id}
                    recipe={r}
                    onMove={moveRecipe}
                    onDelete={deleteRecipe}
                    onMoveUp={moveRecipeUp}
                    onMoveDown={moveRecipeDown}
                    sections={cookbook.subsections}
                  />
                ))}
              </ul>
            </div>
          )}

          {cookbook.subsections.map((section) => (
            <div key={section} className="cookbook-section">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "0.9rem", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  {section}
                </h3>
                <button
                  className="btn btn-ghost"
                  onClick={() => deleteSection(section)}
                  style={{ padding: "0.25rem 0.5rem", fontSize: "0.8rem" }}
                >
                  Delete section
                </button>
              </div>
              <ul className="cookbook-list">
                {recipesInSection(section).map((r) => (
                  <CookbookRecipe
                    key={r.id}
                    recipe={r}
                    onMove={moveRecipe}
                    onDelete={deleteRecipe}
                    onMoveUp={moveRecipeUp}
                    onMoveDown={moveRecipeDown}
                    sections={cookbook.subsections}
                  />
                ))}
              </ul>
            </div>
          ))}

          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--line)" }}>
            {editingSection ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addSection();
                }}
              >
                <input
                  className="field"
                  type="text"
                  placeholder="Section name"
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                  autoFocus
                  style={{ marginBottom: "0.5rem" }}
                />
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button className="btn btn-primary" type="submit">
                    Create
                  </button>
                  <button
                    className="btn btn-ghost"
                    type="button"
                    onClick={() => {
                      setEditingSection(null);
                      setNewSection("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button className="btn btn-ghost" onClick={() => setEditingSection(true)}>
                + Add section
              </button>
            )}
          </div>
        </section>
      )}

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

function CookbookRecipe({ recipe, onMove, onDelete, onMoveUp, onMoveDown, sections }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <li className="cookbook-recipe">
      <div className="cookbook-recipe-content">
        <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="cookbook-recipe-link">
          {recipe.title}
        </a>
        <span className="small muted" style={{ display: "block", fontSize: "0.8rem", marginTop: "0.25rem" }}>
          {recipe.url}
        </span>
      </div>
      <div className="cookbook-recipe-actions">
        {showMenu ? (
          <div className="cookbook-menu">
            {sections.map((section) => (
              <button
                key={section}
                className="cookbook-menu-item"
                onClick={() => {
                  onMove(recipe.id, section);
                  setShowMenu(false);
                }}
              >
                {section}
              </button>
            ))}
            {sections.length > 0 && <div className="cookbook-menu-divider" />}
            <button
              className="cookbook-menu-item"
              onClick={() => {
                onMove(recipe.id, null);
                setShowMenu(false);
              }}
            >
              Unsorted
            </button>
          </div>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={() => setShowMenu(true)} style={{ fontSize: "0.85rem" }}>
              Move
            </button>
            <button className="btn btn-ghost" onClick={() => onDelete(recipe.id)} aria-label="Delete recipe">
              <TrashIcon />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
