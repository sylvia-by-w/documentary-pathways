import { Link } from "react-router-dom";
import pathways from "../data/pathways.json";

export default function Pathways() {
  return (
    <div className="hero" style={{ textAlign: "left" }}>
      <div className="section-head">
        <div className="eyebrow">Pathways</div>
        <h2>观看路径</h2>
      </div>

      <div className="theme-grid">
        {pathways.map((p) => {
          const card = (
            <div className={`theme-card ${p.status === "active" ? "active" : "soon"}`}>
              <div>
                <div className="t-en">{p.title}</div>
                {p.zh && <div className="t-zh">{p.zh}</div>}
              </div>
              <div className="status">
                {p.status === "active" ? "● Available" : "Coming Soon"}
              </div>
            </div>
          );
          return p.status === "active" ? (
            <Link to={`/pathways/${p.id}`} key={p.id}>{card}</Link>
          ) : (
            <div key={p.id}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}
