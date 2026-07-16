import { motion } from "framer-motion";
import { skillGroups } from "../data";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import TiltCard from "./TiltCard";

export default function Skills() {
  return (
    <section id="skills" className="shell">
      <SectionHead
        index="03"
        label="Toolkit"
        title="What I reach for"
        lede="Grouped by how I actually use them, not by how impressive the list looks."
      />

      <div className="skill-groups">
        {skillGroups.map((g, i) => (
          <Reveal key={g.label} delay={i * 0.07}>
            <TiltCard className="skill-group" max={6}>
              <h3>{g.label}</h3>
              <p className="note">{g.note}</p>
              <div className="chips">
                {g.items.map((s, j) => (
                  <motion.span
                    className="chip"
                    key={s.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + j * 0.03, duration: 0.35 }}
                  >
                    {s.icon && <img src={s.icon} alt="" loading="lazy" />}
                    {s.name}
                  </motion.span>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
