import { directors } from "../data/directors";

export default function XuTong() {
  const d = directors.find((x) => x.id === "xu-tong");

  return (
    <div className="hero" style={{ textAlign: "left" }}>
      <div className="section-head">
        <div className="eyebrow">Director Study · {d.studyStatus}</div>
        <h2>{d.name} · {d.chineseName}</h2>
        <div className="zh">Started {d.startDate}</div>
      </div>

      <p style={{ marginBottom: "24px" }}>{d.intro}</p>

      <div className="core-q" style={{ marginBottom: "40px" }}>{d.whyIStarted}</div>

      <h3 style={{ marginBottom: "16px", color: "var(--parchment)" }}>Filmography / Viewing Progress</h3>
      {d.filmography.map((f) => (
        <div className="doc-card" key={f.id} style={{ marginBottom: "16px" }}>
          <div className="meta">
            <span>{f.chineseTitle}</span>
            <span>{f.title}</span>
            <span>{f.year}</span>
            <span>{f.status}</span>
          </div>
          <h3>{f.title} · {f.chineseTitle}</h3>
        </div>
      ))}

      <h3 style={{ margin: "32px 0 16px", color: "var(--parchment)" }}>Recurring Questions</h3>
      <ul style={{ paddingLeft: "20px", color: "var(--muted)" }}>
        {d.recurringQuestions.map((q, i) => (
          <li key={i} style={{ marginBottom: "8px" }}>{q}</li>
        ))}
      </ul>
    </div>
  );
}