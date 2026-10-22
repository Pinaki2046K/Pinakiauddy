/** A project's discipline line, e.g. "Rule-driven product · full-stack build". Each part stays on one line. */
export default function Discipline({ text }: { text: string }) {
  const parts = text.split(' · ');
  return (
    <span>
      {parts.map((part, i) => (
        <span key={part}>
          <span className="meta-part">{part}</span>
          {i < parts.length - 1 && ' · '}
        </span>
      ))}
    </span>
  );
}
