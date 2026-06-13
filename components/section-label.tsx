export default function SectionLabel({ label, color = "#505549" }: { label: string; color?: string }) {
  return (
    <span className="font-mono uppercase tracking-widest" style={{fontSize:9, color, letterSpacing:"0.14em"}}>
      {label}
    </span>
  );
}
