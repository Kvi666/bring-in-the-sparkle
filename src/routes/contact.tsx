import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Sri Lanka Immigration" },
      { name: "description", content: "Get in touch with the Department of Immigration & Emigration. Find office locations, phone numbers, and email." },
    ],
  }),
});

function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="We're here to help" description="Reach our team for assistance with passports, visas, citizenship and appointments." />

      <section className="mx-auto max-w-7xl px-4 py-16 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          {[
            { i: MapPin, t: "Head Office", v: "Suhurupaya, Subhuthipura Rd, Battaramulla, Sri Lanka" },
            { i: Phone, t: "Phone", v: "+94 11 2 101 500" },
            { i: Mail, t: "Email", v: "controller@immigration.gov.lk" },
            { i: Clock, t: "Hours", v: "Mon–Fri, 8:30 AM – 4:15 PM" },
          ].map(c => (
            <div key={c.t} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-trust"><c.i className="h-5 w-5" /></div>
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{c.t}</div>
                <div className="mt-0.5 text-sm font-medium">{c.v}</div>
              </div>
            </div>
          ))}
        </div>

        <form className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-elevated grid gap-4">
          <h2 className="font-display text-xl font-semibold">Send us a message</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label><span className="text-xs font-semibold">Full name</span>
              <input className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></label>
            <label><span className="text-xs font-semibold">Email</span>
              <input type="email" className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></label>
          </div>
          <label><span className="text-xs font-semibold">Subject</span>
            <input className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></label>
          <label><span className="text-xs font-semibold">Message</span>
            <textarea rows={6} className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></label>
          <button className="mt-2 inline-flex h-11 w-fit items-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground">Send message</button>
        </form>
      </section>
    </>
  );
}
