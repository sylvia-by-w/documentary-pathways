import { Link } from "react-router-dom";

const pathways = [
  {
    id: "how-systems-shape-us",
    title: "How Systems Shape Us",
    zh: "系统如何塑造一个人",
    coreQuestion: "What parts of a person are chosen, and what parts are shaped?",
    status: "active"
  },
  { id: "left-behind", title: "被留下的人", zh: "", status: "soon" },
  { id: "how-to-survive", title: "如何活下去", zh: "", status: "soon" },
  { id: "after-leaving-home", title: "离开故乡以后", zh: "", status: "soon" },
  { id: "who-watches-whom", title: "谁在观看谁", zh: "", status: "soon" }
];

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