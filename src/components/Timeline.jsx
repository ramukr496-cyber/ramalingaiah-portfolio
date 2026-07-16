import { timeline } from "../data";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Timeline() {
  return (
    <section id="path" className="shell">
      <SectionHead index="04" label="Path" title="Where I've been" />

      <div className="timeline">
        {timeline.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <div className="tl-item">
              <div className="tl-meta">
                <b>{item.tag}</b>
                <span>{item.period}</span>
              </div>
              <h3>{item.title}</h3>
              <p className="tl-org">{item.org}</p>
              <p className="tl-detail">{item.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
