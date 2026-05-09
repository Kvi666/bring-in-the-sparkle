import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen, Plane, RefreshCw, Users, CalendarCheck, Search,
  ArrowRight, ShieldCheck, Clock, Globe2, AlertTriangle, Newspaper, ChevronRight, Sparkles
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Sri Lanka Immigration & Emigration — Official Portal" },
      { name: "description", content: "Apply for passports, visas, dual citizenship, and book appointments online. The official Department of Immigration & Emigration of Sri Lanka." },
    ],
  }),
});

function Home() {
  const { t } = useI18n();

  const services = [
    { to: "/passport", icon: BookOpen, title: t("svc.passport.t"), desc: t("svc.passport.d"), tag: t("svc.passport.tag") },
    { to: "/visa", icon: Plane, title: t("svc.visa.t"), desc: t("svc.visa.d"), tag: t("svc.visa.tag") },
    { to: "/visa", icon: RefreshCw, title: t("svc.extend.t"), desc: t("svc.extend.d"), tag: "" },
    { to: "/dual-citizenship", icon: Users, title: t("svc.dual.t"), desc: t("svc.dual.d"), tag: "" },
    { to: "/appointment", icon: CalendarCheck, title: t("svc.appt.t"), desc: t("svc.appt.d"), tag: "" },
    { to: "/appointment", icon: Search, title: t("svc.track.t"), desc: t("svc.track.d"), tag: t("svc.track.tag") },
  ] as const;

  return (
    <>
      <section className="relative overflow-hidden gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-gold)_1px,transparent_1px),linear-gradient(90deg,var(--color-gold)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                {t("hero.badge")}
              </div>
              <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[1.05] text-balance">
                {t("hero.title1")} <span className="text-gold">{t("hero.title2")}</span>.
              </h1>
              <p className="mt-5 max-w-xl text-base md:text-lg text-primary-foreground/85 text-pretty">
                {t("hero.desc")}
              </p>

              <form className="mt-7 flex w-full max-w-xl items-center gap-2 rounded-xl border border-white/15 bg-white/10 p-2 backdrop-blur-md">
                <Search className="ml-2 h-5 w-5 text-primary-foreground/70" />
                <input
                  type="search"
                  placeholder={t("hero.searchPlaceholder")}
                  className="flex-1 bg-transparent px-2 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none"
                  aria-label="Search services"
                />
                <button className="inline-flex h-10 items-center rounded-lg bg-gold px-4 text-sm font-semibold text-gold-foreground hover:opacity-90">
                  {t("hero.search")}
                </button>
              </form>

              <div className="mt-6 flex flex-wrap gap-2 text-xs text-primary-foreground/75">
                <span className="opacity-70">{t("hero.popular")}</span>
                {[t("svc.visa.t"), t("svc.passport.t"), t("svc.extend.t"), t("svc.dual.t")].map(s => (
                  <button key={s} className="rounded-full border border-white/15 px-3 py-1 hover:bg-white/10">{s}</button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md shadow-elevated">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-semibold">{t("hero.quickActions")}</h3>
                  <span className="text-xs text-primary-foreground/70">{t("hero.online")}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {services.slice(0,4).map(s => (
                    <Link key={s.title} to={s.to} className="group flex flex-col gap-2 rounded-xl border border-white/15 bg-white/[0.06] p-4 hover:bg-white/[0.12] transition">
                      <s.icon className="h-5 w-5 text-gold" />
                      <div className="text-sm font-semibold leading-snug">{s.title}</div>
                      <div className="mt-auto inline-flex items-center text-xs text-primary-foreground/70 group-hover:text-gold">
                        {t("hero.open")} <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                {[
                  { i: ShieldCheck, t: t("trust.secure") },
                  { i: Clock, t: t("trust.fast") },
                  { i: Globe2, t: t("trust.multi") },
                ].map(({i:Icon,t:label}) => (
                  <div key={label} className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] py-2">
                    <Icon className="h-4 w-4 text-gold" /> {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-warning/15">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-start md:items-center gap-3 text-sm">
          <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
          <p className="text-foreground">
            <strong>{t("notice.label")}</strong> {t("notice.text")}
          </p>
          <Link to="/appointment" className="ml-auto hidden md:inline text-sm font-semibold text-trust hover:underline">{t("notice.book")}</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-trust">{t("services.kicker")}</div>
            <h2 className="mt-2 font-display text-2xl md:text-4xl font-bold text-balance">{t("services.title")}</h2>
          </div>
          <Link to="/visa" className="hidden sm:inline-flex items-center text-sm font-semibold text-trust hover:underline">
            {t("services.viewAll")} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(s => (
            <Link
              key={s.title}
              to={s.to}
              className="card-hover group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-elevated"
            >
              {s.tag && (
                <span className="absolute top-4 right-4 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-foreground">{s.tag}</span>
              )}
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-trust">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-5 inline-flex items-center text-sm font-semibold text-trust group-hover:gap-2 transition-all">
                {t("services.start")} <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v: "2.4M+", l: t("stats.served") },
            { v: "180+", l: t("stats.countries") },
            { v: "98%", l: t("stats.sat") },
            { v: "<24h", l: t("stats.eta") },
          ].map(s => (
            <div key={s.l} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary">{s.v}</div>
              <div className="mt-1 text-xs md:text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-trust">{t("news.kicker")}</div>
            <h2 className="mt-2 font-display text-2xl md:text-4xl font-bold">{t("news.title")}</h2>
          </div>
          <Link to="/news" className="hidden sm:inline-flex items-center text-sm font-semibold text-trust hover:underline">
            {t("news.all")} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            { tag: "Policy", date: "May 5, 2026", title: "New e-Passport rollout begins across all regional offices", desc: "Biometric-enabled passports now available. Existing passports remain valid until expiry." },
            { tag: "Service", date: "Apr 28, 2026", title: "Online ETA processing time reduced to under 24 hours", desc: "Travelers can apply, pay and download their ETA without visiting any office." },
            { tag: "Notice", date: "Apr 20, 2026", title: "Holiday closures: Vesak week service schedule", desc: "Selected services will operate on reduced hours. See the full schedule inside." },
          ].map(n => (
            <article key={n.title} className="card-hover rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-secondary px-2 py-0.5 font-semibold text-trust">{n.tag}</span>
                <time className="text-muted-foreground">{n.date}</time>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{n.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{n.desc}</p>
              <Link to="/news" className="mt-4 inline-flex items-center text-sm font-semibold text-trust">
                {t("news.read")} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-14 text-primary-foreground shadow-elevated">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Newspaper className="h-6 w-6 text-gold" />
              <h2 className="mt-3 font-display text-2xl md:text-4xl font-bold text-balance">{t("cta.title")}</h2>
              <p className="mt-3 text-primary-foreground/85">{t("cta.desc")}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/appointment" className="inline-flex h-11 items-center rounded-lg bg-gold px-6 text-sm font-semibold text-gold-foreground hover:opacity-90">{t("cta.book")}</Link>
              <Link to="/visa" className="inline-flex h-11 items-center rounded-lg border border-white/20 bg-white/5 px-6 text-sm font-semibold hover:bg-white/10">{t("cta.apply")}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
