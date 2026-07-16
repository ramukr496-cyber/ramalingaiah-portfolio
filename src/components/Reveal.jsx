import { motion } from "framer-motion";

/** Scroll-triggered reveal with a small 3D rotation on entry. */
export default function Reveal({ children, delay = 0, y = 28, ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, rotateX: -6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 900 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
