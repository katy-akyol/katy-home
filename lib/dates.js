export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function pad(n) {
  return String(n).padStart(2, "0");
}

export function dateKey(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Key for the week, anchored on its Sunday. */
export function weekKey(d) {
  const s = new Date(d);
  s.setDate(d.getDate() - d.getDay());
  return dateKey(s);
}

export function dayOfYear(d) {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - start) / 86400000);
}

export function partOfDay(d) {
  const h = d.getHours();
  if (h < 5) return "night";
  if (h < 11) return "dawn";
  if (h < 17) return "day";
  if (h < 21) return "dusk";
  return "night";
}

export function greeting(d) {
  return {
    dawn: "Good morning",
    day: "Good afternoon",
    dusk: "Good evening",
    night: "Rest well",
  }[partOfDay(d)];
}

export function longDate(d) {
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

/** "13:30" -> minutes since midnight */
export function toMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

/** "13:30" -> "1:30" */
export function formatTime(t) {
  const [h, m] = t.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${pad(m)}`;
}

export function minutesNow(d) {
  return d.getHours() * 60 + d.getMinutes();
}
