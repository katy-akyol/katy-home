const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function SunIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </svg>
  );
}

export function BookIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 5.5c2.8-1.1 5.8-.9 9 1 3.2-1.9 6.2-2.1 9-1v13c-2.8-1.1-5.8-.9-9 1-3.2-1.9-6.2-2.1-9-1z" />
      <path d="M12 6.5v13" />
    </svg>
  );
}

export function PotIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 10h16v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z" />
      <path d="M2.5 10h19M9 6.5c0-1 1-1.2 1-2.3M14 6.5c0-1 1-1.2 1-2.3" />
    </svg>
  );
}

export function PencilIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20l4.2-1 10.6-10.6a2.1 2.1 0 0 0-3-3L5.2 16z" />
      <path d="M14.5 6.5l3 3" />
    </svg>
  );
}

export function LeafIcon({ filled, ...props }) {
  return (
    <svg {...base} {...props} fill={filled ? "currentColor" : "none"}>
      <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z" />
      <path d="M5 19c3-4 6-7 9.5-9.5" fill="none" />
    </svg>
  );
}

export function ArrowIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function BackIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg {...base} strokeWidth={2.2} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function SproutIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21v-9" />
      <path d="M12 12c0-4-3-6.5-7-6.5 0 4 3 6.5 7 6.5z" />
      <path d="M12 14.5c0-3.5 2.6-6 6.5-6 0 3.5-2.6 6-6.5 6z" />
    </svg>
  );
}
