import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const links = [
  ["about", "About"],
  ["work", "Work"],
  ["skills", "Skills"],
  ["path", "Path"],
  ["contact", "Contact"],
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    const ids = ["home", ...links.map(([id]) => id)];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="nav-mark" href="#home">
          RKR<span style={{ color: "var(--signal)" }}>_</span>
        </a>

        <button
          className="nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          {open ? "close" : "menu"}
        </button>

        <div className={`nav-links ${open ? "open" : ""}`}>
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="nav-link"
              data-active={active === id}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
      <motion.div className="nav-progress" style={{ scaleX: progress, width: "100%" }} />
    </nav>
  );
}
