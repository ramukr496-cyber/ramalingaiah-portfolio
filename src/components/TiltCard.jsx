import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Pointer-tracking 3D tilt. Rotation is driven by real rotateX/rotateY on a
 * preserve-3d layer, and a glare follows the cursor across the surface.
 * Falls back to a plain card when the OS asks for reduced motion.
 */
export default function TiltCard({
  children,
  className = "",
  max = 7,
  lift = 14,
  ...rest
}) {
  const ref = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    px.set(nx - 0.5);
    py.set(ny - 0.5);
    el.style.setProperty("--mx", `${nx * 100}%`);
    el.style.setProperty("--my", `${ny * 100}%`);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry }}
      whileHover={{ z: lift }}
      {...rest}
    >
      {children}
      <div className="tilt-glare" />
    </motion.div>
  );
}
