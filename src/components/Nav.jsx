import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <Link to="/" className="brand" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <svg width="26" height="26" viewBox="0 0 34 34" style={{ flexShrink: 0 }}>
          <path
            d="M4 17 C4 17 11 8 17 8 C23 8 30 17 30 17 C30 17 23 26 17 26 C11 26 4 17 4 17 Z"
            fill="none"
            stroke="#E8E3D3"
            strokeWidth="1.3"
          />
          <circle cx="17" cy="17" r="4.5" fill="#C9A227" />
        </svg>
        <div>
          <div className="brand-en">Documentary Pathways</div>
          <div className="brand-zh">纪录片观看路径</div>
        </div>
      </Link>
      <div className="navlinks">
        <Link to="/">Home</Link>
        <Link to="/pathways">Pathways</Link>
        <Link to="/directors">Directors</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/index">Index</Link>
        <Link to="/workflow">Workflow</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}