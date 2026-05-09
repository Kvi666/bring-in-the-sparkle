import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/news")({
  component: NewsPage,
  head: () => ({
    meta: [
      { title: "News & Announcements — Sri Lanka Immigration" },
      { name: "description", content: "Latest updates, policy changes and service notices from the Department of Immigration & Emigration." },
    ],
  }),
});

const items = [
  { tag: "Policy", date: "May 5, 2026", title: "New e-Passport rollout begins across all regional offices", desc: "Biometric-enabled passports are now available nationwide. Existing passports remain valid until expiry." },
  { tag: "Service", date: "Apr 28, 2026", title: "Online ETA processing time reduced to under 24 hours", desc: "Travelers can apply, pay and download their ETA without visiting any office." },
  { tag: "Notice", date: "Apr 20, 2026", title: "Holiday closures: Vesak week service schedule", desc: "Selected services will operate on reduced hours during the Vesak holidays." },
  { tag: "Update", date: "Apr 12, 2026", title: "Updated visa fees effective from May 1", desc: "Revised fee structure for visa categories takes effect on May 1, 2026." },
  { tag: "Service", date: "Mar 30, 2026", title: "Mobile-friendly application portal launched", desc: "A redesigned portal optimized for phones and tablets is now live." },
  { tag: "Policy", date: "Mar 18, 2026", title: "Expanded visa-on-arrival eligibility for 14 more countries", desc: "Citizens of newly added countries can now obtain visas on arrival." },
];

function NewsPage() {
  return (
    <>
      <PageHeader eyebrow="News" title="Announcements & updates" description="Stay informed with the latest changes to immigration services and policies." />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {items.map(n => (
            <article key={n.title} className="card-hover rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-secondary px-2 py-0.5 font-semibold text-trust">{n.tag}</span>
                <time className="text-muted-foreground">{n.date}</time>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{n.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{n.desc}</p>
              <a href="#" className="mt-4 inline-flex items-center text-sm font-semibold text-trust">
                Read more <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
