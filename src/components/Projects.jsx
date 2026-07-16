import { projects } from "../data";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import TiltCard from "./TiltCard";

const featured = projects.filter((p) => p.featured);
const archive = projects.filter((p) => !p.featured);

function Title({ p }) {
  if (!p.link) return <>{p.title}</>;
  return (
    <a href={p.link} target="_blank" rel="noreferrer">
      {p.title}
    </a>
  );
}

export default function Projects() {
  return (
    <section id="work" className="shell">
      <SectionHead
        index="02"
        label="Selected work"
        title="Things I built and had to make work"
        lede="Each of these went past the demo stage — trained models, live databases, deployed apps."
      />

      <div className="projects-list">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <TiltCard className="project" max={4} lift={18}>
              <div className="project-head">
                <span className="project-year">{p.year}</span>
                <h3 className="project-title">
                  <Title p={p} />
                </h3>
                <span className="project-kicker">{p.kicker}</span>
              </div>

              <p className="project-summary">{p.summary}</p>

              {p.bullets.length > 0 && (
                <ul className="project-bullets">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}

              <div className="tags">
                {p.tech.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="archive">
          {archive.map((p) => {
            const Row = p.link ? "a" : "div";
            return (
              <Row
                key={p.id}
                className="archive-row"
                {...(p.link
                  ? { href: p.link, target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                <span className="y">{p.year}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.tech.join(" · ")}</p>
                </div>
                <span className="go">{p.link ? "open ↗" : ""}</span>
              </Row>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
