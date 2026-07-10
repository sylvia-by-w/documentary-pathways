import { documentaries } from "../data/documentaries";
import DocCard from "../components/DocCard";

export default function Home() {
  return (
    <div className="hero" id="home">
      <div className="eyebrow">A Curated Map, Not a Watchlist</div>
      <h1>Understand the world <em>before</em><br />creating in it.</h1>
      <div className="zh-line">给想理解世界的年轻创作者的纪录片观看路径</div>

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