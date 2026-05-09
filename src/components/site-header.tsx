import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Search,
  Globe,
  Shield,
  Phone,
  ChevronDown,
  Home,
  Plane,
  BookUser,
  Users,
  CalendarCheck,
  Newspaper,
  MessageSquare,
} from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import logoUrl from "@/assets/logo.png";

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  desc?: string;
};

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { lang, setLang, t } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Scroll-aware shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change / Esc
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setServicesOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close services dropdown on outside click
  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [servicesOpen]);

  // Focus search when opened
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const services: NavItem[] = [
    { to: "/visa", label: t("nav.visa"), icon: Plane, desc: "Tourist, business & transit visas" },
    { to: "/passport", label: t("nav.passport"), icon: BookUser, desc: "Apply, renew or replace" },
    { to: "/dual-citizenship", label: t("nav.dual"), icon: Users, desc: "Citizenship & resumption" },
  ];

  const primary: NavItem[] = [
    { to: "/", label: t("nav.home"), icon: Home },
    { to: "/appointment", label: t("nav.appointment"), icon: CalendarCheck },
    { to: "/news", label: t("nav.news"), icon: Newspaper },
    { to: "/contact", label: t("nav.contact"), icon: MessageSquare },
  ];

  const langs: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "si", label: "සිං" },
    { code: "ta", label: "தமி" },
  ];

  const isServiceActive = services.some((s) => pathname.startsWith(s.to));

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Utility bar */}
      <div className="bg-primary text-primary-foreground/90 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <Shield className="h-3.5 w-3.5 text-gold shrink-0" />
            <span className="truncate">
              <span className="hidden sm:inline">{t("top.official")}</span>
              <span className="sm:hidden">{t("top.shortGov")}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+94112101500"
              className="hidden md:inline-flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Phone className="h-3 w-3" />
              +94 11 2 101 500
            </a>
            <div
              className="flex items-center gap-0.5 rounded-md border border-white/15 bg-white/5 px-1 py-0.5"
              role="group"
              aria-label="Language"
            >
              <Globe className="h-3 w-3 mx-0.5 opacity-70" />
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  aria-pressed={lang === l.code}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                    lang === l.code
                      ? "bg-gold text-gold-foreground"
                      : "hover:bg-white/10 hover:text-gold"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b bg-background/90 backdrop-blur-md transition-shadow ${
          scrolled ? "shadow-elevated border-border" : "border-border/60"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src={logoUrl}
              alt="Sri Lanka government emblem"
              className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
            />
            <div className="leading-tight hidden sm:block">
              <div className="font-display text-sm font-semibold text-foreground">
                {t("brand.title")}
              </div>
              <div className="text-[11px] text-muted-foreground">{t("brand.sub")}</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 ml-2" aria-label="Primary">
            <NavLinkItem item={primary[0]} pathname={pathname} exact />

            {/* Services dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setServicesOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={servicesOpen}
                className={`relative flex items-center gap-1 px-3 h-10 rounded-md text-sm font-medium transition-colors ${
                  isServiceActive
                    ? "text-primary"
                    : "text-foreground/75 hover:text-foreground hover:bg-muted"
                }`}
              >
                {t("nav.services")}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                />
                {isServiceActive && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 bg-gold rounded-full" />
                )}
              </button>

              {servicesOpen && (
                <div
                  role="menu"
                  className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-border bg-popover shadow-elevated p-2 animate-in fade-in-0 zoom-in-95"
                >
                  {services.map((s) => {
                    const active = pathname.startsWith(s.to);
                    return (
                      <Link
                        key={s.to}
                        to={s.to}
                        role="menuitem"
                        onClick={() => setServicesOpen(false)}
                        className={`flex items-start gap-3 rounded-lg p-3 transition-colors ${
                          active ? "bg-secondary" : "hover:bg-muted"
                        }`}
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                          <s.icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-foreground">
                            {s.label}
                          </span>
                          {s.desc && (
                            <span className="block text-xs text-muted-foreground mt-0.5">
                              {s.desc}
                            </span>
                          )}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {primary.slice(1).map((n) => (
              <NavLinkItem key={n.to} item={n} pathname={pathname} />
            ))}
          </nav>

          {/* Right cluster */}
          <div className="ml-auto flex items-center gap-1.5">
            {/* Search (collapsible) */}
            <div className="hidden md:flex items-center">
              {searchOpen ? (
                <div className="relative animate-in fade-in-0 slide-in-from-right-2">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder={t("search.placeholder")}
                    onBlur={(e) => !e.currentTarget.value && setSearchOpen(false)}
                    className="h-10 w-64 rounded-md border border-input bg-surface pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open search"
                  className="grid h-10 w-10 place-items-center rounded-md text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
            </div>

            <Link
              to="/appointment"
              className="hidden sm:inline-flex h-10 items-center gap-1.5 rounded-md bg-gold px-4 text-sm font-semibold text-gold-foreground shadow-elevated hover:opacity-90 transition"
            >
              <CalendarCheck className="h-4 w-4" />
              {t("cta.book")}
            </Link>

            {/* Mobile toggle */}
            <button
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-muted"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 top-[88px] bg-foreground/40 backdrop-blur-sm z-40 animate-in fade-in-0"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="lg:hidden absolute top-full inset-x-0 z-50 border-t border-border bg-background shadow-elevated max-h-[calc(100vh-88px)] overflow-y-auto animate-in slide-in-from-top-2">
            <div className="mx-auto max-w-7xl px-4 py-4">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder={t("search.placeholder")}
                  className="h-11 w-full rounded-md border border-input bg-surface pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <nav className="grid gap-1" aria-label="Mobile">
                <MobileLink item={primary[0]} pathname={pathname} exact onNavigate={() => setMobileOpen(false)} />

                <div className="mt-2 mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Services
                </div>
                {services.map((s) => (
                  <MobileLink key={s.to} item={s} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
                ))}

                <div className="mt-2 mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  More
                </div>
                {primary.slice(1).map((n) => (
                  <MobileLink key={n.to} item={n} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
                ))}
              </nav>

              <Link
                to="/appointment"
                onClick={() => setMobileOpen(false)}
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-gold px-4 text-sm font-semibold text-gold-foreground"
              >
                <CalendarCheck className="h-4 w-4" />
                {t("cta.book")}
              </Link>

              <a
                href="tel:+94112101500"
                className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-border text-sm font-medium text-foreground hover:bg-muted"
              >
                <Phone className="h-4 w-4 text-primary" />
                +94 11 2 101 500
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

function NavLinkItem({
  item,
  pathname,
  exact = false,
}: {
  item: NavItem;
  pathname: string;
  exact?: boolean;
}) {
  const active = exact ? pathname === item.to : pathname.startsWith(item.to);
  return (
    <Link
      to={item.to}
      activeOptions={{ exact }}
      className={`relative flex items-center px-3 h-10 rounded-md text-sm font-medium transition-colors ${
        active ? "text-primary" : "text-foreground/75 hover:text-foreground hover:bg-muted"
      }`}
    >
      {item.label}
      {active && <span className="absolute inset-x-3 -bottom-px h-0.5 bg-gold rounded-full" />}
    </Link>
  );
}

function MobileLink({
  item,
  pathname,
  exact = false,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  exact?: boolean;
  onNavigate: () => void;
}) {
  const active = exact ? pathname === item.to : pathname.startsWith(item.to);
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
        active ? "bg-secondary text-primary" : "text-foreground hover:bg-muted"
      }`}
    >
      <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
      <span>{item.label}</span>
    </Link>
  );
}
