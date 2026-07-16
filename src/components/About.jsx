import { profile } from "../data";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import TiltCard from "./TiltCard";

const facts = [
  ["Based in", "Doddaballapur, KA"],
  ["Studying", "B.Tech CSE, 2026"],
  ["University", "Presidency University"],
  ["Focus", "GenAI · Agents · RAG"],
  ["Ships with", "Python · FastAPI · Docker"],
  ["Status", "Open to work"],
];

export default function About() {
  return (
    <section id="about" className="shell">
      <SectionHead index="01" label="About" title="I build the loop, not just the prompt" />

      <div className="about-grid" style={{ marginTop: 40 }}>
        <Reveal className="about-body" delay={0.05}>
          <p>
            I'm a final-year Computer Science student at Presidency University,
            Bangalore, and most of my work sits in one place:{" "}
            <strong>getting language models to do something useful and
            answer for it</strong>. That means the unglamorous parts — tool
            definitions, reasoning loops, retry paths, read-only guardrails,
            citations that point back at a real page number.
          </p>
          <p>
            Before that I spent six months as a full-stack Java intern, which is
            where I learned that a model is only as good as the API around it. So
            I write the backend too: <strong>FastAPI services, SQL schemas,
            Docker images, and the tests that keep them honest</strong>.
          </p>
          <p>
            Right now I'm looking for a Software Engineer, AI/ML or GenAI role
            where I can keep shipping systems end to end.
          </p>
        </Reveal>

        <Reveal delay={0.15} style={{ perspective: 1000 }}>
          <TiltCard className="facts" max={5}>
            {facts.map(([k, v]) => (
              <div className="fact" key={k}>
                <span>{k}</span>
                <b>{v}</b>
              </div>
            ))}
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
