import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { BookOpen, RefreshCw, Zap, Baby, FileText, Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/passport")({
  component: PassportPage,
  head: () => ({
    meta: [
      { title: "Passport Services — Sri Lanka Immigration" },
      { name: "description", content: "Apply, renew, or replace Sri Lankan passports. Standard, one-day, and emergency services available." },
    ],
  }),
});

const types = [
  { icon: BookOpen, name: "New Passport", time: "7 working days", price: "LKR 15,000", popular: true },
  { icon: RefreshCw, name: "Renewal", time: "5 working days", price: "LKR 10,000" },
  { icon: Zap, name: "One-Day Service", time: "Same day", price: "LKR 20,000", popular: true },
  { icon: Baby, name: "Child Passport", time: "7 working days", price: "LKR 12,000" },
  { icon: FileText, name: "Lost / Replacement", time: "10 working days", price: "LKR 18,000" },
];

function PassportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Passport Services"
        title="Apply for or renew your Sri Lankan passport"
        description="Secure, internationally accepted travel documents — issued through a streamlined online process."
      />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {types.map(t => (
            <article key={t.name} className="card-hover relative rounded-2xl border border-border bg-card p-6">
              {t.popular && <span className="absolute top-4 right-4 rounded-full bg-gold/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-foreground">Popular</span>}
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-trust">
                <t.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{t.name}</h3>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Processing</span>
                <span className="font-semibold">{t.time}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-semibold">{t.price}</span>
              </div>
              <Link to="/appointment" className="mt-5 inline-flex items-center text-sm font-semibold text-trust">
                Apply now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">Eligibility & documents</h2>
            <ul className="mt-6 space-y-3">
              {[
                "Sri Lankan citizenship (NIC required)",
                "Original birth certificate",
                "Recent biometric photograph",
                "Marriage certificate (if applicable)",
                "Existing passport for renewal",
              ].map(t => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-success/20 text-success"><Check className="h-3.5 w-3.5" /></span>
                  <span className="text-sm">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-elevated">
            <h3 className="font-display text-xl font-semibold">Track your application</h3>
            <p className="mt-2 text-sm text-muted-foreground">Enter your reference number to check status in real time.</p>
            <form className="mt-6 grid gap-3">
              <label className="text-xs font-semibold text-foreground">Reference number</label>
              <input className="h-11 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. PASS-2026-00012345" />
              <button className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground">Check status</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
