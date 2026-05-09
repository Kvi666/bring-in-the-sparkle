import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Users, Globe2, FileCheck, Check, LogIn, UserPlus, ShieldCheck, HelpCircle, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dual-citizenship")({
  component: DCPage,
  head: () => ({
    meta: [
      { title: "Dual Citizenship — Sri Lanka Immigration" },
      { name: "description", content: "Apply for or restore Sri Lankan dual citizenship. Eligibility, requirements and online application." },
    ],
  }),
});

function DCPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dual Citizenship"
        title="Reconnect with Sri Lanka — keep both citizenships"
        description="Sri Lankans living abroad can apply to retain or regain citizenship while holding another nationality."
      />

      {/* Sign-in / account CTA — required to apply for Dual Citizenship */}
      <section className="border-b border-border bg-gradient-to-br from-secondary/60 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="grid gap-6 rounded-3xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur md:p-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-medium text-trust">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secure account required
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                Sign in to start or continue your application
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
                Dual Citizenship applications are processed through a secure portal. Sign in to save your progress, upload documents, pay fees, and track your application status — anytime, from anywhere.
              </p>

              <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                {[
                  "Save & resume your application",
                  "Upload documents securely",
                  "Track status in real time",
                  "Receive official notifications",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="h-4 w-4 text-success" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign in to apply
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Create an account
                </Button>
                <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-trust hover:underline">
                  <KeyRound className="h-3.5 w-3.5" />
                  Forgot password?
                </a>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                New to the portal? Creating an account takes less than 2 minutes — you'll only need a valid email address and your NIC or passport number.
              </p>
            </div>

            <aside className="rounded-2xl border border-border bg-secondary/40 p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-trust">
                <HelpCircle className="h-4 w-4" />
                Need help signing in?
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="rounded-xl bg-card p-3">
                  <div className="font-medium">Already started an application?</div>
                  <p className="mt-1 text-muted-foreground">Use the same email you registered with to resume.</p>
                </li>
                <li className="rounded-xl bg-card p-3">
                  <div className="font-medium">Applying as a family?</div>
                  <p className="mt-1 text-muted-foreground">One account holder can add spouse and children under one application.</p>
                </li>
                <li className="rounded-xl bg-card p-3">
                  <div className="font-medium">Trouble logging in?</div>
                  <p className="mt-1 text-muted-foreground">
                    Call our support desk on{" "}
                    <a href="tel:+94112101500" className="font-medium text-trust hover:underline">+94 11 2 101 500</a>
                    {" "}— Mon–Fri, 8:30am – 4:15pm.
                  </p>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 grid gap-6 md:grid-cols-3">
        {[
          { icon: Users, title: "Who can apply", desc: "Sri Lankans who lost citizenship after gaining another nationality, and their eligible family members." },
          { icon: FileCheck, title: "What you need", desc: "Birth certificate, foreign passport, current citizenship proof and recent photographs." },
          { icon: Globe2, title: "Benefits", desc: "Visa-free travel, property ownership rights, and the ability to live and work in Sri Lanka." },
        ].map(c => (
          <article key={c.title} className="card-hover rounded-2xl border border-border bg-card p-6">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-trust"><c.icon className="h-5 w-5" /></div>
            <h3 className="mt-5 font-display text-lg font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
          </article>
        ))}
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold">Application steps</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-4">
            {["Create an account","Submit application","Pay the fee","Receive certificate"].map((s,i) => (
              <li key={s} className="rounded-2xl border border-border bg-card p-6">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gold text-gold-foreground font-semibold">{i+1}</div>
                <div className="mt-4 font-display text-base font-semibold">{s}</div>
              </li>
            ))}
          </ol>
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {[
              "Processing typically completes within 8–12 weeks",
              "Family applications can be filed together",
              "Online status tracking with secure login",
              "Pay in LKR or USD with verified payment partners",
            ].map(t => (
              <li key={t} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <Check className="mt-0.5 h-4 w-4 text-success" />
                <span className="text-sm">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
