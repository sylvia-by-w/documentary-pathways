import { useParams, Link } from "react-router-dom";
import { notes } from "../data/notes";

const fields = [
  { key: "beforeWatching", label: "Before Watching", zh: "观看前" },
  { key: "whatINoticed", label: "What I Noticed", zh: "我注意到了什么" },
  { key: "whatStayedWithMe", label: "What Stayed With Me", zh: "最难忘的" },
  { key: "whatChangedForMe", label: "What Changed for Me", zh: "改变了什么理解" },
  { key: "whatMadeMeUncomfortable", label: "What Made Me Uncomfortable", zh: "哪里让我犹豫" },
  { key: "questionsAfterWatching", label: "Questions After Watching", zh: "还没想明白的问题" },
  { key: "connections", label: "Connections", zh: "与其他作品的联系" }
];

export default function NoteDetail() {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);

  if (!note) return <div className="hero">Note not found.</div>;

  return (
    <div className="hero" style={{ textAlign: "left" }}>
      <div className="section-head">
        <div className="eyebrow">{note.watchDate ? `Watched ${note.watchDate}` : "To Watch"}</div>
        <h2>{note.title} · {note.chineseTitle}</h2>
        <div className="zh">{note.director} · {note.year}</div>
      </div>

      {fields.map((f) =>
        note[f.key] ? (
          <div key={f.key} style={{ marginBottom: "28px" }}>
            <div className="zoom-field">
              <div className="k">{f.label} <span style={{ textTransform: "none" }}>{f.zh}</span></div>
              <div className="v">{note[f.key]}</div>
            </div>
          </div>
        ) : null
      )}

      <Link to="/notes" style={{ color: "var(--amber)", fontSize: "13px" }}>← Back to Notes</Link>
    </div>
  );
}