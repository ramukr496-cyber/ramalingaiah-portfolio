import { motion } from "framer-motion";
import profileImg from "../assets/profile.jpg";
import { profile } from "../data";
import AgentField from "./AgentField";

// The name assembles letter by letter, each one arriving out of depth.
const glyphs = profile.name.split("");

export default function Hero() {
  return (
    <section id="home" className="hero shell">
      <div>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <b>●</b> Open to Software / AI Engineer roles
        </motion.p>

        <h1 className="hero-name" style={{ perspective: 800 }}>
          {glyphs.map((g, i) => (
            <motion.span
              key={i}
              className="glyph"
              initial={{ opacity: 0, y: 26, rotateX: -70 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.25 + i * 0.035,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {g === " " ? "\u00A0" : g}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="hero-role"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          {profile.role}
        </motion.p>

        <motion.p
          className="hero-summary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
        >
          {profile.summary}
        </motion.p>

        <motion.div
          className="btn-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
        >
          <a className="btn primary" href="#work">
            See the work
          </a>
          {/* BASE_URL keeps this correct under a GitHub Pages sub-path. */}
          <a className="btn" href={`${import.meta.env.BASE_URL}resume.pdf`} download>
            Download résumé
          </a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero-stage"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <AgentField />
        <img className="hero-portrait" src={profileImg} alt={profile.name} />
      </motion.div>

      <div className="scroll-hint">
        <i />
        scroll
      </div>
    </section>
  );
}
