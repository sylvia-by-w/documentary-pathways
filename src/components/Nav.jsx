import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <Link to="/" className="brand">
        <span className="brand-en">Documentary Pathways</span>
        <span className="brand-zh">纪录片观看路径</span>
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