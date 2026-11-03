import Link from "next/link";
import { notFound } from "next/navigation";
import { recipeBySlug, recipes } from "@/lib/data";
import CookMode from "@/components/CookMode";
import { BackIcon } from "@/components/Icons";

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const r = recipeBySlug(slug);
  return { title: r ? `${r.title} · Kate's Garden` : "Kate's Garden" };
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const r = recipeBySlug(slug);
  if (!r) notFound();

  return (
    <div className="fade-in">
      <Link href="/kitchen" className="back">
        <BackIcon /> Kitchen
      </Link>

      <header className={`recipe-hero tone-${r.tone}`} style={{ padding: "2.5rem" }}>
        <div className="pills" style={{ marginBottom: "0.75rem" }}>
          {r.tags.map((t) => (
            <span key={t} className="pill">
              {t}
            </span>
          ))}
        </div>
        <h1>{r.title}</h1>
        <p className="serif" style={{ fontSize: "1.35rem", fontStyle: "italic", marginTop: "0.25rem" }}>
          {r.subtitle}
        </p>
        <p style={{ maxWidth: "38rem" }}>{r.blurb}</p>
        <div className="facts">
          <div>
            <strong>Time</strong>
            {r.time}
          </div>
          <div>
            <strong>Serves</strong>
            {r.serves}
          </div>
          <div>
            <strong>Steps</strong>
            {r.steps.length}
          </div>
        </div>
        <CookMode title={r.title} steps={r.steps} />
      </header>

      <div className="recipe-layout">
      <section className="card ingredients-card">
        <div className="card-head">
          <span className="eyebrow">Ingredients</span>
        </div>
        <ul className="ingredients">
          {r.ingredients.map((i) => (
            <li key={i.item}>
              <span>{i.item}</span>
              <span className="qty">{i.qty}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <div className="card-head">
          <span className="eyebrow">Method</span>
        </div>
        <ol className="steps">
          {r.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>
      </div>
    </div>
  );
}
