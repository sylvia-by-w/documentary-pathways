const steps = [
  { en: "Start with a question", zh: "先从一个真实问题出发，而不是先建立宽泛分类。" },
  { en: "Watch and record", zh: "观看过程中记录人物、场景、关系、结构和自己的情绪反应。" },
  { en: "Build connections", zh: "把作品和其他纪录片、导演、人物、主题连接起来。" },
  { en: "Identify contrast", zh: "寻找不同观点、地区、形式和拍摄关系的作品，避免所有材料只证明同一个结论。" },
  { en: "Build a pathway", zh: "将作品按照理解推进的顺序排列，而不是简单按照年份或评分排列。" },
  { en: "Revisit and revise", zh: "允许修改旧笔记、更换路径顺序，并保留认知变化的痕迹。" },
  { en: "Record limitations", zh: "说明一条路径缺少哪些视角，我的理解受到什么限制。" }
];

export default function Workflow() {
  return (
    <div className="hero" style={{ textAlign: "left" }}>
      <div className="section-head">
        <div className="eyebrow">Process</div>
        <h2>我的学习与策展方法</h2>
      </div>

      <div className="workflow-list">
        {steps.map((s, i) => (
          <div className="wf-step" key={i}>
            <div className="num">{i + 1}</div>
            <div>
              <h4>{s.en}</h4>
              <p>{s.zh}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}