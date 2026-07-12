import { Link } from "react-router-dom";
import directors from "../data/generated/directors.json";

export default function Directors() {
  return (
    <div className="hero" style={{ textAlign: "left" }}>
      <div className="section-head">
        <div className="eyebrow">Director Studies</div>
        <h2>导演研究</h2>
      </div>
      {directors.map((d) => (
        <Link to={`/directors/${d.id}`} key={d.id} style={{ display: "block", marginBottom: "20px" }}>
          <div className="doc-card">
            <div className="meta">
              <span>{d.chineseName}</span>
              <span>{d.name}</span>
              <span>{d.studyStatus}</span>
            </div>
            <h3>{d.name} · {d.chineseName}</h3>
            <div className="why">{d.intro}</div>
            <div style={{ marginTop: "10px", fontSize: "12px", color: "var(--muted)" }}>
            {d.filmography.filter((f) => f.status === "watched").length} / {d.filmography.length} watched
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}