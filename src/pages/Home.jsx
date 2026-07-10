import { documentaries } from "../data/documentaries";
import DocCard from "../components/DocCard";

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

      <section id="pathway" style={{ textAlign: "left", marginTop: "60px" }}>
        <div className="section-head">
          <div className="eyebrow">Featured Pathway · 01</div>
          <h2>How Systems Shape Us</h2>
          <div className="zh">系统如何塑造一个人</div>
        </div>

        <div className="route">
          {documentaries.map((doc) => (
            <DocCard key={doc.id} doc={doc} />
          ))}
        </div>
      </section>
    </div>
  );
}