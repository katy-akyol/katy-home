"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, PotIcon } from "./Icons";

export default function CookMode({ title, steps }) {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const [awake, setAwake] = useState(false);
  const finished = i >= steps.length;

  // Keep the screen awake while cooking, and stop page scrolling behind the overlay.
  useEffect(() => {
    if (!open) return;
    let lock = null;
    let cancelled = false;

    async function request() {
      try {
        if ("wakeLock" in navigator) {
          lock = await navigator.wakeLock.request("screen");
          if (cancelled) {
            lock.release().catch(() => {});
            return;
          }
          setAwake(true);
          lock.addEventListener("release", () => setAwake(false));
        }
      } catch {
        setAwake(false);
      }
    }

    const onVisible = () => {
      if (document.visibilityState === "visible" && !cancelled) request();
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setI((n) => Math.min(n + 1, steps.length));
      if (e.key === "ArrowLeft") setI((n) => Math.max(n - 1, 0));
    };

    request();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (lock) lock.release().catch(() => {});
      setAwake(false);
    };
  }, [open, steps.length]);

  return (
    <>
      <div style={{ marginTop: "1.5rem" }}>
        <button
          className="btn btn-primary"
          onClick={() => {
            setI(0);
            setOpen(true);
          }}
        >
          <PotIcon /> Start Cook Mode
        </button>
      </div>

      {open &&
        createPortal(
        <div className="cook" role="dialog" aria-modal="true" aria-label={`Cook Mode: ${title}`}>
          <div className="cook-top">
            <span className="awake" style={{ visibility: awake ? "visible" : "hidden" }}>
              Screen will stay awake
            </span>
            <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close Cook Mode">
              <CloseIcon />
            </button>
          </div>

          <div className="cook-progress" aria-hidden>
            {steps.map((_, n) => (
              <span key={n} className={n < i || finished ? "on" : n === i ? "on" : ""} />
            ))}
          </div>

          <div className="cook-body" aria-live="polite">
            {finished ? (
              <div key="done" className="cook-step enter" style={{ textAlign: "center" }}>
                <p className="cook-step-label">{title}</p>
                Enjoy your meal.
                <p className="muted" style={{ fontSize: "1.1rem", marginTop: "0.75rem" }}>
                  Bless this food and those who share it.
                </p>
              </div>
            ) : (
              <div key={i} className="enter cook-step">
                <p className="cook-step-label">
                  Step {i + 1} of {steps.length}
                </p>
                {steps[i]}
              </div>
            )}
          </div>

          <div className="cook-nav">
            <button className="btn btn-ghost" onClick={() => setI((n) => Math.max(n - 1, 0))} disabled={i === 0}>
              Back
            </button>
            {finished ? (
              <button className="btn btn-primary" onClick={() => setOpen(false)}>
                Close
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => setI((n) => n + 1)}>
                {i === steps.length - 1 ? "Done" : "Next step"}
              </button>
            )}
          </div>
        </div>,
          // Render at the top of the page so the overlay always covers the screen,
          // not just the (animated) page wrapper it's declared inside.
          document.body
        )}
    </>
  );
}
