import { Link } from "react-router-dom";
import directors from "../data/directors.json";
import notes from "../data/notes.json";

export default function XuTong() {
  const d = directors.find((x) => x.id === "xu-tong");
  const watchedCount = d.filmography.filter((f) => f.status === "watched").length;
  const total = d.filmography.length;
  const progressPct = Math.round((watchedCount / total) * 100);

  return (
    <div className="hero" style={{ textAlign: "left" }}>
      <div className="section-head">
        <div className="eyebrow">Director Study · {d.studyStatus}</div>
        <h2>{d.name} · {d.chineseName}</h2>
        <div className="zh">Started {d.startDate}</div>
      </div>

      <p style={{ marginBottom: "24px" }}>{d.intro}</p>

      <div className="core-q" style={{ marginBottom: "20px" }}>{d.whyIStarted}</div>

      <div className="progress-wrap">
        <div className="progress-label">
          <span>Viewing Progress</span>
          <span>{watchedCount} / {total} watched</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <h3 style={{ marginBottom: "16px", color: "var(--parchment)" }}>Filmography / Viewing Progress</h3>
      {d.filmography.map((f) => {
        const relatedNote = notes.find((n) => n.filmId === f.id);
        return (
          <div className="doc-card" key={f.id} style={{ marginBottom: "16px" }}>
            <div className="meta">
              <span>{f.chineseTitle}</span>
              <span>{f.title}</span>
              <span>{f.year}</span>
            </div>
            <h3>{f.title} · {f.chineseTitle}</h3>
            <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span className={`status-badge ${f.status === "watched" ? "watched" : ""}`}>
                {f.status}
              </span>
              {relatedNote && (
                <Link to={`/notes/${relatedNote.id}`} style={{ color: "var(--amber)", fontSize: "12px" }}>
                  View note →
                </Link>
              )}
            </div>
          </div>
        );
      })}

      <h3 style={{ margin: "32px 0 16px", color: "var(--parchment)" }}>Recurring Questions</h3>
      <ul style={{ paddingLeft: "20px", color: "var(--muted)" }}>
        {d.recurringQuestions.map((q, i) => (
          <li key={i} style={{ marginBottom: "8px" }}>{q}</li>
        ))}
      </ul>
    </div>
  );
}