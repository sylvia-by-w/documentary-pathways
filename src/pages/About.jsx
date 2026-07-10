export default function About() {
  return (
    <div className="hero" style={{ textAlign: "left" }}>
      <div className="section-head">
        <div className="eyebrow">About</div>
        <h2>关于这个项目</h2>
      </div>
      <p style={{ marginBottom: "20px", color: "var(--off-white)" }}>
        This is not a public documentary recommendation platform. It is a personal,
        evolving archive — a place to keep watching, taking notes, studying
        directors, and slowly building my own way of seeing documentary film.
      </p>
      <p style={{ color: "var(--muted)" }}>
        这不是一个面向公众的纪录片推荐平台，而是一个持续生长的个人档案——
        用来持续观看、记录笔记、研究导演，并逐渐形成自己的纪录片观看方法。
      </p>
    </div>
  );
}