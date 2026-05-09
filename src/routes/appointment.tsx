import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Check, ChevronRight, MapPin, Calendar, Clock } from "lucide-react";

export const Route = createFileRoute("/appointment")({
  component: AppointmentPage,
  head: () => ({
    meta: [
      { title: "Book an Appointment — Sri Lanka Immigration" },
      { name: "description", content: "Schedule your visit to any Department of Immigration & Emigration office. Skip queues and save time." },
    ],
  }),
});

const services = ["Passport — New", "Passport — Renewal", "Passport — One-Day", "Visa Extension", "Dual Citizenship", "Other inquiry"];
const offices = ["Head Office — Battaramulla", "Kandy Regional Office", "Matara Regional Office", "Vavuniya Regional Office", "Kurunegala Regional Office"];
const slots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:30"];

function AppointmentPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ service: "", office: "", date: "", slot: "", name: "", email: "", phone: "" });

  const next = () => setStep(s => Math.min(4, s+1));
  const back = () => setStep(s => Math.max(1, s-1));

  return (
    <>
      <PageHeader
        eyebrow="Make Appointment"
        title="Book your visit in 4 simple steps"
        description="Reserve a guaranteed time slot at any of our regional offices."
      />

      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        {/* Stepper */}
        <ol className="mb-10 flex items-center gap-2 text-xs">
          {["Service","Location","Date & time","Confirm"].map((s,i) => {
            const n = i+1;
            const done = step > n;
            const current = step === n;
            return (
              <li key={s} className="flex items-center gap-2">
                <span className={`grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold transition
                  ${done ? "bg-success text-white" : current ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                  {done ? <Check className="h-3.5 w-3.5" /> : n}
                </span>
                <span className={`font-medium ${current || done ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                {n<4 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground mx-1" />}
              </li>
            );
          })}
        </ol>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-elevated">
          {step === 1 && (
            <div>
              <h2 className="font-display text-xl font-semibold">Choose a service</h2>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {services.map(s => (
                  <button key={s} onClick={() => setData(d => ({...d, service: s}))}
                    className={`text-left rounded-xl border px-4 py-3 text-sm transition
                      ${data.service===s ? "border-trust bg-secondary ring-trust" : "border-border hover:border-trust/40"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-xl font-semibold">Pick a location</h2>
              <div className="mt-6 grid gap-2">
                {offices.map(o => (
                  <button key={o} onClick={() => setData(d => ({...d, office: o}))}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition
                      ${data.office===o ? "border-trust bg-secondary" : "border-border hover:border-trust/40"}`}>
                    <MapPin className="h-4 w-4 text-trust" /> {o}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display text-xl font-semibold">Date & time</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> Date</span>
                  <input type="date" value={data.date} onChange={e => setData(d => ({...d, date: e.target.value}))}
                    className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </label>
                <div>
                  <span className="text-xs font-semibold flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> Time slot</span>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {slots.map(s => (
                      <button key={s} onClick={() => setData(d => ({...d, slot: s}))}
                        className={`h-11 rounded-lg border text-sm font-medium transition
                          ${data.slot===s ? "border-trust bg-secondary" : "border-border hover:border-trust/40"}`}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-display text-xl font-semibold">Your details</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { k: "name" as const, l: "Full name", t: "text" },
                  { k: "email" as const, l: "Email", t: "email" },
                  { k: "phone" as const, l: "Phone", t: "tel" },
                ].map(f => (
                  <label key={f.k} className={f.k === "name" ? "sm:col-span-2" : ""}>
                    <span className="text-xs font-semibold">{f.l}</span>
                    <input type={f.t} required value={data[f.k]} onChange={e => setData(d => ({...d, [f.k]: e.target.value}))}
                      className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </label>
                ))}
              </div>
              <dl className="mt-6 rounded-xl bg-secondary p-4 text-sm">
                <div className="flex justify-between py-1"><dt className="text-muted-foreground">Service</dt><dd className="font-semibold">{data.service || "—"}</dd></div>
                <div className="flex justify-between py-1"><dt className="text-muted-foreground">Office</dt><dd className="font-semibold">{data.office || "—"}</dd></div>
                <div className="flex justify-between py-1"><dt className="text-muted-foreground">Date / Time</dt><dd className="font-semibold">{data.date || "—"} {data.slot}</dd></div>
              </dl>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button onClick={back} disabled={step===1}
              className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-semibold disabled:opacity-40">
              Back
            </button>
            {step < 4 ? (
              <button onClick={next}
                className="inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground">
                Continue
              </button>
            ) : (
              <button className="inline-flex h-10 items-center rounded-lg bg-gold px-5 text-sm font-semibold text-gold-foreground">
                Confirm appointment
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
