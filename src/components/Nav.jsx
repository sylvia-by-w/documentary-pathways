export default function Nav() {
  return (
    <nav>
      <div className="brand">
        <span className="brand-en">Documentary Pathways</span>
        <span className="brand-zh">纪录片观看路径</span>
      </div>
      <div className="navlinks">
        <a className="active" href="#home">Home</a>
        <a href="#pathway">Pathways</a>
        <a href="#index">Index</a>
        <a href="#workflow">Workflow</a>
        <a href="#about">About</a>
      </div>
    </nav>
  );
}