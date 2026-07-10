import { useState } from "react";
import { Link } from "react-router-dom";
import documentaries from "../data/documentaries.json";
import directors from "../data/directors.json";
import notes from "../data/notes.json";

// 把三处数据源整理成统一的索引条目
function buildIndex() {
  const items = [];

  documentaries.forEach((d) => {
    items.push({
      id: d.id,
      title: d.title,
      chineseTitle: d.chineseTitle || "",
      year: d.year,
      director: "",
      status: "watched",
      inPathway: "How Systems Shape Us",
      inDirectorStudy: "",
      hasNotes: notes.some((n) => n.filmId === d.id)
    });
  });

  directors.forEach((dir) => {
    dir.filmography.forEach((f) => {
      items.push({
        id: f.id,
        title: f.title,
        chineseTitle: f.chineseTitle,
        year: f.year,
        director: dir.name,
        status: f.status,
        inPathway: "",
        inDirectorStudy: dir.name,
        hasNotes: notes.some((n) => n.filmId === f.id)
      });
    });
  });

  return items;
}

export default function Index() {
  const allItems = buildIndex();
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered =
    statusFilter === "all"
      ? allItems
      : allItems.filter((i) => i.status === statusFilter);

  return (
    <div className="hero" style={{ textAlign: "left" }}>
      <div className="section-head">
        <div className="eyebrow">Index</div>
        <h2>纪录片索引</h2>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "32px" }}>
        {["all", "watched", "to-watch"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className="btn btn-ghost"
            style={{
              cursor: "pointer",
              borderColor: statusFilter === s ? "var(--amber)" : "var(--line)",
              color: statusFilter === s ? "var(--amber)" : "var(--muted)"
            }}
          >
            {s === "all" ? "All" : s === "watched" ? "Watched" : "To Watch"}
          </button>
        ))}
      </div>

      {filtered.map((item) => (
        <div className="doc-card" key={item.id} style={{ marginBottom: "14px" }}>
          <div className="meta">
            <span>{item.chineseTitle || item.title}</span>
            <span>{item.year}</span>
            <span>{item.status}</span>
            {item.director && <span>{item.director}</span>}
          </div>
          <h3>{item.title}</h3>
          <div className="why">
            {item.inPathway && <>Pathway: {item.inPathway} </>}
            {item.inDirectorStudy && <>· Director Study: {item.inDirectorStudy} </>}
            {item.hasNotes && (
              <>
                ·{" "}
                <Link to={`/notes`} style={{ color: "var(--amber)" }}>
                  Notes available
                </Link>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}