"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowIcon, BookIcon, PencilIcon, PotIcon, SproutIcon, SunIcon } from "./Icons";

const items = [
  { href: "/", label: "Today", Icon: SunIcon },
  { href: "/bible", label: "Scripture", Icon: BookIcon },
  { href: "/kitchen", label: "Kitchen", Icon: PotIcon },
  { href: "/school", label: "School", Icon: PencilIcon },
];

export default function Nav() {
  const path = usePathname() || "/";
  return (
    <aside className="sidebar">
      <Link href="/" className="wordmark">
        <SproutIcon /> Kate&rsquo;s Garden
      </Link>

      <nav className="nav" aria-label="Rooms">
        {items.map(({ href, label, Icon }) => {
          const active = href === "/" ? path === "/" : path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`nav-item${active ? " is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <Icon />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <Link href="/reset" className="sidebar-foot">
        <span className="eyebrow">Each Sunday</span>
        <p className="serif">Sunday Reset</p>
        <span className="card-link">
          Plan the week <ArrowIcon />
        </span>
      </Link>
    </aside>
  );
}
