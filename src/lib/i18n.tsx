import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "si" | "ta";

const dict = {
  en: {
    "lang.code": "EN",
    "top.official": "Official portal of the Department of Immigration & Emigration, Sri Lanka",
    "top.shortGov": "Government of Sri Lanka",
    "brand.title": "Immigration & Emigration",
    "brand.sub": "Department of Sri Lanka",
    "nav.home": "Home",
    "nav.visa": "Visa Services",
    "nav.passport": "Passport",
    "nav.dual": "Dual Citizenship",
    "nav.appointment": "Appointments",
    "nav.news": "News",
    "nav.contact": "Contact",
    "nav.services": "Services",
    "cta.book": "Book Appointment",
    "search.placeholder": "Search services…",

    "hero.badge": "New: Apply for ETA in under 5 minutes",
    "hero.title1": "Modern immigration services for",
    "hero.title2": "Sri Lanka",
    "hero.desc": "Passports, visas, dual citizenship and appointments — securely managed through the official portal of the Department of Immigration & Emigration.",
    "hero.searchPlaceholder": "Search for a service, e.g. ‘passport renewal’",
    "hero.search": "Search",
    "hero.popular": "Popular:",
    "hero.quickActions": "Quick actions",
    "hero.online": "24/7 online",
    "hero.open": "Open",
    "trust.secure": "Secure",
    "trust.fast": "Fast",
    "trust.multi": "Multilingual",

    "notice.label": "Notice:",
    "notice.text": "Walk-in services are temporarily limited. Please book an appointment online before visiting any office.",
    "notice.book": "Book now →",

    "services.kicker": "Our services",
    "services.title": "Everything you need, in one place",
    "services.viewAll": "View all",
    "services.start": "Get started",

    "svc.passport.t": "Apply for Passport",
    "svc.passport.d": "New, renewal, and emergency passports.",
    "svc.passport.tag": "Most popular",
    "svc.visa.t": "Visa Services",
    "svc.visa.d": "ETA, tourist, business and resident visas.",
    "svc.visa.tag": "Foreign visitors",
    "svc.extend.t": "Extend Visa",
    "svc.extend.d": "Extend your stay quickly and securely.",
    "svc.dual.t": "Dual Citizenship",
    "svc.dual.d": "Apply or restore Sri Lankan citizenship.",
    "svc.appt.t": "Make Appointment",
    "svc.appt.d": "Book in-person visits at any office.",
    "svc.track.t": "Track Application",
    "svc.track.d": "Check the status of any submission.",
    "svc.track.tag": "Self-service",

    "stats.served": "Citizens served annually",
    "stats.countries": "Visa-eligible countries",
    "stats.sat": "Online satisfaction",
    "stats.eta": "ETA processing",

    "news.kicker": "News & announcements",
    "news.title": "Latest updates",
    "news.all": "All news",
    "news.read": "Read more",

    "cta.title": "Ready to get started?",
    "cta.desc": "Book an appointment or apply online — no queues, no paperwork.",
    "cta.apply": "Apply for a visa",

    "footer.tagline": "Serving citizens and visitors with secure, modern, and accessible immigration services.",
    "footer.verified": "Verified government portal",
    "footer.services": "Services",
    "footer.info": "Information",
    "footer.contact": "Contact",
    "footer.news": "News & Notices",
    "footer.downloads": "Downloads",
    "footer.faqs": "FAQs",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.access": "Accessibility",
  },
  si: {
    "lang.code": "සිං",
    "top.official": "ශ්‍රී ලංකා ආගමන හා විගමන දෙපාර්තමේන්තුවේ නිල වෙබ් අඩවිය",
    "top.shortGov": "ශ්‍රී ලංකා රජය",
    "brand.title": "ආගමන හා විගමන",
    "brand.sub": "ශ්‍රී ලංකා දෙපාර්තමේන්තුව",
    "nav.home": "මුල් පිටුව",
    "nav.visa": "වීසා සේවා",
    "nav.passport": "ගමන් බලපත්‍ර",
    "nav.dual": "ද්විත්ව පුරවැසිභාවය",
    "nav.appointment": "නියමයන්",
    "nav.news": "පුවත්",
    "nav.contact": "අප හා සම්බන්ධ වන්න",
    "nav.services": "සේවා",
    "cta.book": "නියමයක් වෙන් කරන්න",
    "search.placeholder": "සේවා සොයන්න…",

    "hero.badge": "නව: ETA මිනිත්තු 5කින් අයදුම් කරන්න",
    "hero.title1": "නවීන ආගමන සේවා —",
    "hero.title2": "ශ්‍රී ලංකාව",
    "hero.desc": "ගමන් බලපත්‍ර, වීසා, ද්විත්ව පුරවැසිභාවය හා නියමයන් — දෙපාර්තමේන්තුවේ නිල වෙබ් අඩවියෙන් ආරක්ෂිතව කළමනාකරණය කරයි.",
    "hero.searchPlaceholder": "සේවාවක් සොයන්න, උදා: ‘ගමන් බලපත්‍ර අලුත් කිරීම’",
    "hero.search": "සොයන්න",
    "hero.popular": "ජනප්‍රිය:",
    "hero.quickActions": "ඉක්මන් ක්‍රියා",
    "hero.online": "24/7 මාර්ගගත",
    "hero.open": "විවෘත කරන්න",
    "trust.secure": "ආරක්ෂිතයි",
    "trust.fast": "වේගවත්",
    "trust.multi": "බහුභාෂා",

    "notice.label": "දැන්වීම:",
    "notice.text": "කාර්යාල පැමිණීම් තාවකාලිකව සීමා කර ඇත. කරුණාකර පැමිණීමට පෙර මාර්ගගතව නියමයක් වෙන්කරගන්න.",
    "notice.book": "දැන් වෙන් කරන්න →",

    "services.kicker": "අපගේ සේවා",
    "services.title": "ඔබට අවශ්‍ය සියල්ල එකම ස්ථානයක",
    "services.viewAll": "සියල්ල බලන්න",
    "services.start": "ආරම්භ කරන්න",

    "svc.passport.t": "ගමන් බලපත්‍රයක් සඳහා අයදුම් කරන්න",
    "svc.passport.d": "නව, අලුත් කිරීම් සහ හදිසි ගමන් බලපත්‍ර.",
    "svc.passport.tag": "ජනප්‍රියම",
    "svc.visa.t": "වීසා සේවා",
    "svc.visa.d": "ETA, සංචාරක, ව්‍යාපාර හා පදිංචි වීසා.",
    "svc.visa.tag": "විදේශීය අමුත්තන්",
    "svc.extend.t": "වීසා දීර්ඝ කරන්න",
    "svc.extend.d": "ඔබේ රැඳී සිටීම ඉක්මනින් දීර්ඝ කරන්න.",
    "svc.dual.t": "ද්විත්ව පුරවැසිභාවය",
    "svc.dual.d": "ශ්‍රී ලාංකික පුරවැසිභාවය ලබාගන්න හෝ යළි ලබාගන්න.",
    "svc.appt.t": "නියමයක් කරන්න",
    "svc.appt.d": "ඕනෑම කාර්යාලයකට පැමිණීමක් වෙන් කරන්න.",
    "svc.track.t": "අයදුම්පත් තත්ත්වය",
    "svc.track.d": "ඔබේ අයදුම්පතේ තත්ත්වය පරීක්ෂා කරන්න.",
    "svc.track.tag": "ස්වයං-සේවා",

    "stats.served": "වාර්ෂිකව සේවය සැපයූ පුරවැසියන්",
    "stats.countries": "වීසා සුදුසු රටවල්",
    "stats.sat": "මාර්ගගත සතුට",
    "stats.eta": "ETA සැකසුම්",

    "news.kicker": "පුවත් හා නිවේදන",
    "news.title": "නවතම යාවත්කාලීන",
    "news.all": "සියලු පුවත්",
    "news.read": "තවත් කියවන්න",

    "cta.title": "ආරම්භ කිරීමට සූදානම්ද?",
    "cta.desc": "මාර්ගගතව අයදුම් කරන්න හෝ නියමයක් වෙන්කරගන්න — පෝලිම් නැත, ලිපි නැත.",
    "cta.apply": "වීසාවක් සඳහා අයදුම් කරන්න",

    "footer.tagline": "පුරවැසියන්ට සහ අමුත්තන්ට ආරක්ෂිත, නවීන, ප්‍රවේශ විය හැකි ආගමන සේවා.",
    "footer.verified": "තහවුරු කළ රාජ්‍ය වෙබ් අඩවිය",
    "footer.services": "සේවා",
    "footer.info": "තොරතුරු",
    "footer.contact": "සම්බන්ධතා",
    "footer.news": "පුවත් හා නිවේදන",
    "footer.downloads": "බාගත කිරීම්",
    "footer.faqs": "නිතර අසන",
    "footer.rights": "සියලු හිමිකම් ඇවිරිණි.",
    "footer.privacy": "පෞද්ගලිකත්වය",
    "footer.terms": "කොන්දේසි",
    "footer.access": "ප්‍රවේශ්‍යතාව",
  },
  ta: {
    "lang.code": "தமி",
    "top.official": "இலங்கை குடிவரவு மற்றும் குடியகல்வுத் திணைக்களத்தின் அதிகாரப்பூர்வ வலைத்தளம்",
    "top.shortGov": "இலங்கை அரசாங்கம்",
    "brand.title": "குடிவரவு மற்றும் குடியகல்வு",
    "brand.sub": "இலங்கை திணைக்களம்",
    "nav.home": "முகப்பு",
    "nav.visa": "விசா சேவைகள்",
    "nav.passport": "கடவுச்சீட்டு",
    "nav.dual": "இரட்டை குடியுரிமை",
    "nav.appointment": "சந்திப்புகள்",
    "nav.news": "செய்திகள்",
    "nav.contact": "தொடர்பு",
    "nav.services": "சேவைகள்",
    "cta.book": "சந்திப்பை பதிவு செய்க",
    "search.placeholder": "சேவைகளைத் தேடுக…",

    "hero.badge": "புதியது: 5 நிமிடங்களில் ETA விண்ணப்பிக்கவும்",
    "hero.title1": "நவீன குடிவரவு சேவைகள் —",
    "hero.title2": "இலங்கை",
    "hero.desc": "கடவுச்சீட்டுகள், விசாக்கள், இரட்டை குடியுரிமை மற்றும் சந்திப்புகள் — அதிகாரப்பூர்வ வலைத்தளத்தின் மூலம் பாதுகாப்பாக நிர்வகிக்கப்படுகின்றன.",
    "hero.searchPlaceholder": "ஒரு சேவையைத் தேடுக, எ.கா. ‘கடவுச்சீட்டு புதுப்பித்தல்’",
    "hero.search": "தேடுக",
    "hero.popular": "பிரபலம்:",
    "hero.quickActions": "விரைவு செயல்கள்",
    "hero.online": "24/7 ஆன்லைன்",
    "hero.open": "திற",
    "trust.secure": "பாதுகாப்பானது",
    "trust.fast": "வேகமானது",
    "trust.multi": "பன்மொழி",

    "notice.label": "அறிவிப்பு:",
    "notice.text": "நேரடி வருகை சேவைகள் தற்காலிகமாக வரம்பிடப்பட்டுள்ளன. அலுவலகத்திற்கு வருகை தருமுன் ஆன்லைனில் சந்திப்பை பதிவு செய்யவும்.",
    "notice.book": "இப்போது பதிவு செய்க →",

    "services.kicker": "எங்கள் சேவைகள்",
    "services.title": "உங்களுக்குத் தேவையான அனைத்தும் ஓரிடத்தில்",
    "services.viewAll": "அனைத்தையும் பார்க்க",
    "services.start": "தொடங்குக",

    "svc.passport.t": "கடவுச்சீட்டுக்கு விண்ணப்பிக்கவும்",
    "svc.passport.d": "புதிய, புதுப்பித்தல் மற்றும் அவசர கடவுச்சீட்டுகள்.",
    "svc.passport.tag": "மிகவும் பிரபலம்",
    "svc.visa.t": "விசா சேவைகள்",
    "svc.visa.d": "ETA, சுற்றுலா, வணிக மற்றும் குடியிருப்பு விசாக்கள்.",
    "svc.visa.tag": "வெளிநாட்டு பயணிகள்",
    "svc.extend.t": "விசாவை நீட்டிக்கவும்",
    "svc.extend.d": "உங்கள் தங்குதலை விரைவாக நீட்டிக்கவும்.",
    "svc.dual.t": "இரட்டை குடியுரிமை",
    "svc.dual.d": "இலங்கை குடியுரிமைக்கு விண்ணப்பிக்கவும் அல்லது மீட்கவும்.",
    "svc.appt.t": "சந்திப்பை பதிவு செய்க",
    "svc.appt.d": "எந்த அலுவலகத்திலும் வருகையை பதிவு செய்யவும்.",
    "svc.track.t": "விண்ணப்பத்தை கண்காணிக்க",
    "svc.track.d": "எந்த சமர்ப்பிப்பின் நிலையையும் சரிபார்க்கவும்.",
    "svc.track.tag": "சுய சேவை",

    "stats.served": "ஆண்டுதோறும் சேவை செய்யப்பட்ட குடிமக்கள்",
    "stats.countries": "விசா தகுதியான நாடுகள்",
    "stats.sat": "ஆன்லைன் திருப்தி",
    "stats.eta": "ETA செயலாக்கம்",

    "news.kicker": "செய்திகள் & அறிவிப்புகள்",
    "news.title": "சமீபத்திய புதுப்பிப்புகள்",
    "news.all": "அனைத்து செய்திகள்",
    "news.read": "மேலும் படிக்க",

    "cta.title": "தொடங்க தயாரா?",
    "cta.desc": "சந்திப்பை பதிவு செய்க அல்லது ஆன்லைனில் விண்ணப்பிக்கவும் — வரிசை இல்லை, காகிதம் இல்லை.",
    "cta.apply": "விசாவுக்கு விண்ணப்பிக்கவும்",

    "footer.tagline": "குடிமக்களுக்கும் பார்வையாளர்களுக்கும் பாதுகாப்பான, நவீன, அணுகக்கூடிய சேவைகள்.",
    "footer.verified": "சரிபார்க்கப்பட்ட அரசாங்க வலைத்தளம்",
    "footer.services": "சேவைகள்",
    "footer.info": "தகவல்",
    "footer.contact": "தொடர்பு",
    "footer.news": "செய்திகள் & அறிவிப்புகள்",
    "footer.downloads": "பதிவிறக்கங்கள்",
    "footer.faqs": "கேள்விகள்",
    "footer.rights": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    "footer.privacy": "தனியுரிமை",
    "footer.terms": "விதிமுறைகள்",
    "footer.access": "அணுகல்",
  },
} as const;

type Key = keyof typeof dict.en;

const I18nContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved && (saved === "en" || saved === "si" || saved === "ta")) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };

  const t = (k: Key) => (dict[lang] as Record<string, string>)[k] ?? dict.en[k] ?? k;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
