import { Link } from "react-router-dom";
import notes from "../data/generated/notes.json";

export default function Notes() {
  return (
    <div className="hero" style={{ textAlign: "left" }}>
      <div className="section-head">
        <div className="eyebrow">Viewing Notes</div>
        <h2>观看笔记</h2>
      </div>

      {notes.map((n) => (
        <Link to={`/notes/${n.id}`} key={n.id} style={{ display: "block", marginBottom: "16px" }}>
          <div className="doc-card">
            <div className="meta">
              <span>{n.chineseTitle}</span>
              <span>{n.title}</span>
              <span>{n.year}</span>
              <span>{n.watchDate ? `Watched ${n.watchDate}` : "To Watch"}</span>
            </div>
            <h3>{n.title} · {n.chineseTitle}</h3>
            <div className="why">{n.beforeWatching}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}