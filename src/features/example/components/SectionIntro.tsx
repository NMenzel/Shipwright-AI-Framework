interface SectionIntroProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionIntro({
  id,
  eyebrow,
  title,
  description,
}: SectionIntroProps) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="text-3xl font-semibold tracking-tight text-balance"
      >
        {title}
      </h2>
      <p className="text-base leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}
