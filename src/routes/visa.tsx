import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Plane, Briefcase, GraduationCap, Home, RefreshCw, Globe2, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/visa")({
  component: VisaPage,
  head: () => ({
    meta: [
      { title: "Visa Services — Sri Lanka Immigration" },
      { name: "description", content: "Apply for tourist, business, residence and ETA visas to Sri Lanka. Extend or convert your visa online." },
    ],
  }),
});

const visas = [
  { icon: Plane, name: "Tourist Visa (ETA)", duration: "30 days", price: "USD 50", desc: "For leisure, sightseeing, family visits and short stays." },
  { icon: Briefcase, name: "Business Visa", duration: "30–90 days", price: "USD 60", desc: "For meetings, conferences and short-term work." },
  { icon: GraduationCap, name: "Student Visa", duration: "Up to 1 year", price: "USD 100", desc: "For students enrolled at recognised institutions." },
  { icon: Home, name: "Residence Visa", duration: "1+ years", price: "Variable", desc: "For long-term residents, investors and retirees." },
  { icon: RefreshCw, name: "Visa Extension", duration: "Renewable", price: "From USD 30", desc: "Extend your existing visa without leaving Sri Lanka." },
  { icon: Globe2, name: "Transit Visa", duration: "2 days", price: "Free", desc: "For travelers in transit through Sri Lanka." },
];

function VisaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visa Services"
        title="Visit, work, study or live in Sri Lanka"
        description="Choose the right visa for your purpose of stay. Most applications are fully online and processed within 24 hours."
      />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visas.map(v => {
            const isTourist = v.name === "Tourist Visa (ETA)";
            const applyTo = isTourist ? "/eta-application" : "/appointment";
            return (
              <article key={v.name} className="card-hover rounded-2xl border border-border bg-card p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-trust">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{v.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-secondary p-3">
                    <dt className="text-muted-foreground">Duration</dt>
                    <dd className="mt-0.5 font-semibold text-foreground">{v.duration}</dd>
                  </div>
                  <div className="rounded-lg bg-secondary p-3">
                    <dt className="text-muted-foreground">From</dt>
                    <dd className="mt-0.5 font-semibold text-foreground">{v.price}</dd>
                  </div>
                </dl>
                <Link to={applyTo} className="mt-5 inline-flex items-center text-sm font-semibold text-trust">
                  Apply now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold">How it works</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              "Choose visa type",
              "Fill the application",
              "Pay securely online",
              "Receive your visa",
            ].map((s, i) => (
              <li key={s} className="rounded-2xl border border-border bg-card p-6">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gold text-gold-foreground font-semibold">{i+1}</div>
                <div className="mt-4 font-display text-base font-semibold">{s}</div>
                <p className="mt-1 text-sm text-muted-foreground">Clear, guided, and accessible at every step.</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">Required documents</h2>
            <p className="mt-2 text-muted-foreground">Most visa types require the following. Check the specific page for details.</p>
            <ul className="mt-6 space-y-3">
              {[
                "Passport valid for 6+ months",
                "Recent passport-size photograph",
                "Proof of accommodation in Sri Lanka",
                "Return or onward ticket",
                "Sufficient funds for stay",
              ].map(t => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-success/20 text-success"><Check className="h-3.5 w-3.5" /></span>
                  <span className="text-sm">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-elevated">
            <h3 className="font-display text-xl font-semibold">Need help choosing?</h3>
            <p className="mt-2 text-sm text-primary-foreground/85">Our 3-question wizard recommends the right visa in under a minute.</p>
            <button className="mt-6 inline-flex h-11 items-center rounded-lg bg-gold px-6 text-sm font-semibold text-gold-foreground hover:opacity-90">
              Start visa wizard
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
