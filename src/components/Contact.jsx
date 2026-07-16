import { profile } from "../data";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

export default function Contact() {
  return (
    <section id="contact" className="shell">
      <Reveal style={{ perspective: 1200 }}>
        <TiltCard className="contact-card" max={4}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>
            <b>05</b> Contact
          </p>
          <h2 className="section-title">Let's build something that reasons</h2>
          <p className="lede" style={{ margin: "0 auto" }}>
            I'm looking for a Software Engineer, AI/ML or GenAI role. If you have
            one — or just want to talk about agents — my inbox is open.
          </p>

          <div className="contact-links">
            <a className="btn primary" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="btn" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              {profile.phone}
            </a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </TiltCard>
      </Reveal>

      <div className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with React, Vite and a lot of canvas maths</span>
      </div>
    </section>
  );
}
