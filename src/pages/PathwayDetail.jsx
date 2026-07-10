import { useParams } from "react-router-dom";
import documentaries from "../data/documentaries.json";
import DocCard from "../components/DocCard";

export default function PathwayDetail() {
  const { id } = useParams();

  // 目前只有一条真实路径，之后有更多条时改成按 id 从数据文件里查
  return (
    <div className="hero" style={{ textAlign: "left" }}>
      <div className="section-head">
        <div className="eyebrow">Pathway</div>
        <h2>How Systems Shape Us</h2>
        <div className="zh">系统如何塑造一个人</div>
      </div>

      <div className="core-q" style={{ marginBottom: "40px" }}>
        What parts of a person are chosen, and what parts are shaped?
      </div>

      <div className="route">
        {documentaries.map((doc) => (
          <DocCard key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  );
}