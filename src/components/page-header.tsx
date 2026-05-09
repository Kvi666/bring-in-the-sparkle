import { Link } from "@tanstack/react-router";

export function PageHeader({
  eyebrow,
  title,
  description,
}: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      <div className="absolute inset-0 -z-0 opacity-60"
        style={{
          background:
            "radial-gradient(800px 300px at 90% -20%, color-mix(in oklab, var(--color-gold) 18%, transparent), transparent 60%), radial-gradient(700px 280px at -10% 0%, color-mix(in oklab, var(--color-trust) 18%, transparent), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-20">
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-wider text-trust">{eyebrow}</div>
        )}
        <h1 className="mt-2 font-display text-3xl md:text-5xl font-bold text-balance text-foreground max-w-3xl">{title}</h1>
        {description && (
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl text-pretty">{description}</p>
        )}
        <nav className="mt-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{title}</span>
        </nav>
      </div>
    </section>
  );
}
