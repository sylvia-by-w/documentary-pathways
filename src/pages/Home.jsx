import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="hero" id="home">
      <div className="eyebrow">A Personal Documentary Archive</div>
      <h1>
        Learning to see the world
        <br />
        through lives that are <em>often overlooked</em>.
      </h1>
      <div className="zh-line">通过那些常被忽略的人生，重新学习如何观看世界。</div>
      <div className="tagline">
        <span>A personal and evolving archive of documentary viewing, research, and reflection.</span>
        <span>一个持续生长的个人纪录片观看、研究与思考档案。</span>
      </div>

      <div className="hero-cta">
        <Link className="btn btn-primary" to="/pathways">Explore Pathways</Link>
        <Link className="btn btn-ghost" to="/directors">Director Studies</Link>
      </div>
    </div>
  );
}