import { formatTime } from "@/lib/dates";

export default function Timeline({ rhythm, current, compact = false }) {
  return (
    <ol className="timeline">
      {rhythm.map((b, i) => {
        const state = current === -1 ? "" : i < current ? "is-past" : i === current ? "is-now" : "";
        return (
          <li key={b.id} className={state}>
            <span className="time">{formatTime(b.time)}</span>
            <span className="dot" />
            <div>
              <div className="tl-title">
                {b.title}
                {i === current && <span className="now-tag">now</span>}
              </div>
              {!compact && b.note && <div className="tl-note">{b.note}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
