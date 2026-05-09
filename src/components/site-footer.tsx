import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Shield, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import logoUrl from "@/assets/logo.png";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Sri Lanka government emblem" className="h-11 w-11 object-contain bg-white/95 rounded-md p-1" />
            <div>
              <div className="font-display text-sm font-semibold">{t("brand.title")}</div>
              <div className="text-xs text-primary-foreground/70">{t("brand.sub")}</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/75 leading-relaxed">{t("footer.tagline")}</p>
          <div className="mt-5 flex items-center gap-2 text-xs text-primary-foreground/70">
            <Shield className="h-3.5 w-3.5 text-gold" /> {t("footer.verified")}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gold">{t("footer.services")}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/visa" className="hover:text-gold">{t("nav.visa")}</Link></li>
            <li><Link to="/passport" className="hover:text-gold">{t("nav.passport")}</Link></li>
            <li><Link to="/dual-citizenship" className="hover:text-gold">{t("nav.dual")}</Link></li>
            <li><Link to="/appointment" className="hover:text-gold">{t("cta.book")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gold">{t("footer.info")}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/news" className="hover:text-gold">{t("footer.news")}</Link></li>
            <li><Link to="/contact" className="hover:text-gold">{t("footer.contact")}</Link></li>
            <li><a href="#" className="hover:text-gold inline-flex items-center gap-1">{t("footer.downloads")} <ExternalLink className="h-3 w-3" /></a></li>
            <li><a href="#" className="hover:text-gold">{t("footer.faqs")}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gold">{t("footer.contact")}</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-gold mt-0.5" /><span>Suhurupaya, Subhuthipura Rd, Battaramulla</span></li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-gold mt-0.5" /><span>+94 11 2 101 500</span></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-gold mt-0.5" /><span>controller@immigration.gov.lk</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/70">
          <p>© {new Date().getFullYear()} {t("brand.title")}. {t("footer.rights")}</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-gold">{t("footer.terms")}</a>
            <a href="#" className="hover:text-gold">{t("footer.access")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
