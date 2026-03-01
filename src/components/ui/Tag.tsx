export function Tag({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "cyan" | "gold";
}) {
  const variants = {
    default:
      "border-sea-border text-text-secondary",
    cyan: "border-brand-cyan/30 text-brand-cyan bg-brand-cyan/5",
    gold: "border-accent-gold/30 text-accent-gold bg-accent-gold/5",
  };

  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
