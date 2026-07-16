import Reveal from "./Reveal";

export default function SectionHead({ index, label, title, lede }) {
  return (
    <Reveal>
      <p className="eyebrow">
        <b>{index}</b> {label}
      </p>
      <h2 className="section-title">{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </Reveal>
  );
}
