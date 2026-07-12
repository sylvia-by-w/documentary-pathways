import { useParams } from "react-router-dom";
import pathways from "../data/generated/pathways.json";
import DocCard from "../components/DocCard";

export default function PathwayDetail() {
  const { id } = useParams();
  const pathway = pathways.find((p) => p.id === id);

  if (!pathway) return <div className="hero">Pathway not found.</div>;

  return (
    <div className="hero" style={{ textAlign: "left" }}>
      <div className="section-head">
        <div className="eyebrow">Pathway</div>
        <h2>{pathway.title}</h2>
        {pathway.zh && <div className="zh">{pathway.zh}</div>}
      </div>

      {pathway.coreQuestion && (
        <div className="core-q" style={{ marginBottom: "40px" }}>
          {pathway.coreQuestion}
        </div>
      )}

      <div className="route">
        {pathway.films.map((doc) => (
          <DocCard key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  );
}
