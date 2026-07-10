export default function DocCard({ doc }) {
  return (
    <div className="stage">
      <div className="stage-label">
        {doc.stageLabel} <span className="zh">{doc.stageZh}</span>
      </div>
      <div className="doc-card">
        <div className="meta">
          <span>{doc.title}</span>
          <span>{doc.year}</span>
          <span>{doc.country}</span>
        </div>
        <h3>{doc.title}</h3>
        <div className="why">
          <b>Why it's here — </b>
          {doc.why}
        </div>
      </div>
    </div>
  );
}