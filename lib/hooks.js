import { useEffect, useState } from "react";

/**
 * State that survives a page reload on this device (Phase 1 only —
 * Phase 3 swaps this for a real database so every device stays in sync).
 */
export function usePersistent(key, initial) {
  const [value, setValue] = useState(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    try {
      const raw = localStorage.getItem(key);
      setValue(raw !== null ? JSON.parse(raw) : initial);
    } catch {
      setValue(initial);
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value, ready]);

  return [value, setValue];
}

/** The current time on her device, refreshed each minute. Null until mounted. */
export function useNow() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  return now;
}
