import { useState } from "react";
import { Link } from "react-router-dom";
import films from "../data/generated/films.json";
import pathways from "../data/generated/pathways.json";
import directors from "../data/generated/directors.json";
import notes from "../data/generated/notes.json";

// 把 films / pathways / directors / notes 四份生成数据整理成统一的索引条目
function buildIndex() {
  const directorNameById = Object.fromEntries(directors.map((d) => [d.id, d.name]));

  const pathwayTitleByFilmId = {};
  pathways.forEach((p) => {
    p.films.forEach((f) => {
      pathwayTitleByFilmId[f.id] = p.title;
    });
  });

  return films.map((f) => ({
    id: f.id,
    title: f.title,
    chineseTitle: f.chineseTitle || "",
    year: f.year,
    director: (f.directorIds || []).map((id) => directorNameById[id]).filter(Boolean).join(", ") || f.director || "",
    status: f.status,
    curationLevel: f.curationLevel,
    inPathway: pathwayTitleByFilmId[f.id] || "",
    hasNotes: notes.some((n) => n.filmId === f.id)
  }));
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
