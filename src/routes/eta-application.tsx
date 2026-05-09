import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import {
  Plane,
  User,
  BookUser,
  Mail,
  Info,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export const Route = createFileRoute("/eta-application")({
  component: EtaApplicationPage,
  head: () => ({
    meta: [
      { title: "Tourist ETA Application — Sri Lanka Immigration" },
      {
        name: "description",
        content:
          "Apply online for your Sri Lanka Tourist ETA. Complete the secure application form in a few simple steps.",
      },
      { property: "og:title", content: "Tourist ETA Application — Sri Lanka Immigration" },
      {
        property: "og:description",
        content:
          "Apply online for your Sri Lanka Tourist ETA. Complete the secure application form in a few simple steps.",
      },
    ],
  }),
});

const schema = z
  .object({
    etaType: z.string().min(1, "Select an ETA type"),
    purpose: z.string().min(1, "Select purpose of visit"),
    departureCountry: z.string().trim().min(2, "Required").max(80),
    arrivalDate: z.string().min(1, "Select arrival date"),

    surname: z.string().trim().min(1, "Required").max(80),
    givenNames: z.string().trim().min(1, "Required").max(120),
    title: z.string().min(1, "Select title"),
    dob: z.string().min(1, "Select date of birth"),
    gender: z.string().min(1, "Select gender"),
    nationality: z.string().trim().min(2, "Required").max(80),
    countryOfBirth: z.string().trim().min(2, "Required").max(80),
    countryOfAddress: z.string().trim().min(2, "Required").max(80),

    passportNumber: z
      .string()
      .trim()
      .min(5, "Enter a valid passport number")
      .max(20),
    confirmPassportNumber: z.string().trim().min(5).max(20),
    passportIssueDate: z.string().min(1, "Select issue date"),
    passportExpiryDate: z.string().min(1, "Select expiry date"),

    email: z.string().trim().email("Invalid email").max(255),
    mobile: z
      .string()
      .trim()
      .min(6, "Enter a valid number")
      .max(20)
      .regex(/^[+0-9\s-]+$/, "Invalid phone number"),
    address: z.string().trim().min(3, "Required").max(200),
    city: z.string().trim().min(1, "Required").max(80),
    country: z.string().trim().min(2, "Required").max(80),

    dualCitizenship: z.string().max(200).optional(),
    existingVisaStatus: z.string().min(1, "Select an option"),
    declarationTruth: z.literal(true, {
      errorMap: () => ({ message: "You must confirm this declaration" }),
    }),
    declarationCriminal: z.literal(true, {
      errorMap: () => ({ message: "You must confirm this declaration" }),
    }),
    declarationTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept terms and conditions" }),
    }),
  })
  .refine((d) => d.passportNumber === d.confirmPassportNumber, {
    message: "Passport numbers do not match",
    path: ["confirmPassportNumber"],
  })
  .refine((d) => new Date(d.passportExpiryDate) > new Date(d.passportIssueDate), {
    message: "Expiry must be after issue date",
    path: ["passportExpiryDate"],
  });

type FormData = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormData, string>>;

const initial = {
  etaType: "",
  purpose: "",
  departureCountry: "",
  arrivalDate: "",
  surname: "",
  givenNames: "",
  title: "",
  dob: "",
  gender: "",
  nationality: "",
  countryOfBirth: "",
  countryOfAddress: "",
  passportNumber: "",
  confirmPassportNumber: "",
  passportIssueDate: "",
  passportExpiryDate: "",
  email: "",
  mobile: "",
  address: "",
  city: "",
  country: "",
  dualCitizenship: "",
  existingVisaStatus: "",
  declarationTruth: false as boolean,
  declarationCriminal: false as boolean,
  declarationTerms: false as boolean,
};

const sections = [
  { id: "travel", label: "Travel", icon: Plane },
  { id: "personal", label: "Personal", icon: User },
  { id: "passport", label: "Passport", icon: BookUser },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "additional", label: "Additional", icon: Info },
];

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-destructive">{msg}</p>;
}

function EtaApplicationPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState(0);
  const [termsOpen, setTermsOpen] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const accepted = sessionStorage.getItem("eta-terms-accepted") === "1";
    if (!accepted) setTermsOpen(true);
  }, []);

  const acceptTerms = () => {
    sessionStorage.setItem("eta-terms-accepted", "1");
    setTermsOpen(false);
  };
  const set = <K extends keyof typeof initial>(k: K, v: (typeof initial)[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const stepFields: Record<number, (keyof FormData)[]> = useMemo(
    () => ({
      0: ["etaType", "purpose", "departureCountry", "arrivalDate"],
      1: [
        "surname",
        "givenNames",
        "title",
        "dob",
        "gender",
        "nationality",
        "countryOfBirth",
        "countryOfAddress",
      ],
      2: [
        "passportNumber",
        "confirmPassportNumber",
        "passportIssueDate",
        "passportExpiryDate",
      ],
      3: ["email", "mobile", "address", "city", "country"],
      4: [
        "existingVisaStatus",
        "declarationTruth",
        "declarationCriminal",
        "declarationTerms",
      ],
    }),
    [],
  );

  const validateStep = (s: number) => {
    const fields = stepFields[s];
    const partial = schema.safeParse(data);
    const stepErrors: Errors = {};
    if (!partial.success) {
      for (const issue of partial.error.issues) {
        const key = issue.path[0] as keyof FormData;
        if (fields.includes(key) && !stepErrors[key]) {
          stepErrors[key] = issue.message;
        }
      }
    }
    setErrors((e) => ({ ...e, ...stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, sections.length - 1));
    else toast.error("Please complete required fields in this section.");
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
      const all: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormData;
        if (!all[key]) all[key] = issue.message;
      }
      setErrors(all);
      // Jump to first failing step
      for (let i = 0; i < sections.length; i++) {
        if (stepFields[i].some((f) => all[f])) {
          setStep(i);
          break;
        }
      }
      toast.error("Please fix the highlighted fields.");
      return;
    }
    toast.success("Application submitted. Reference: ETA-" + Date.now().toString(36).toUpperCase());
    setTimeout(() => navigate({ to: "/" }), 1200);
  };

  const progress = ((step + 1) / sections.length) * 100;

  return (
    <>
      <PageHeader
        eyebrow="Tourist Visa (ETA)"
        title="Sri Lanka ETA Application"
        description="Complete your Electronic Travel Authorization application. All fields marked are required."
      />

      <section className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        {/* Stepper */}
        <ol className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {sections.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  className={`w-full rounded-xl border p-3 text-left transition-colors ${
                    active
                      ? "border-trust bg-trust/5"
                      : done
                        ? "border-success/40 bg-success/5"
                        : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${
                        active
                          ? "bg-trust text-white"
                          : done
                            ? "bg-success text-white"
                            : "bg-secondary text-foreground"
                      }`}
                    >
                      {done ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Step {i + 1}
                      </div>
                      <div className="truncate text-sm font-semibold">{s.label}</div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-gold transition-all"
            style={{ width: `${progress}%` }}
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
          />
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          {step === 0 && (
            <fieldset className="space-y-6">
              <legend className="font-display text-xl font-semibold">Travel Information</legend>
              <p className="text-sm text-muted-foreground">Tell us about your trip to Sri Lanka.</p>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="etaType">ETA Type *</Label>
                  <Select value={data.etaType} onValueChange={(v) => set("etaType", v)}>
                    <SelectTrigger id="etaType" className="mt-1.5">
                      <SelectValue placeholder="Select ETA type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Entry (30 days)</SelectItem>
                      <SelectItem value="double">Double Entry (30 days)</SelectItem>
                      <SelectItem value="multiple">Multiple Entry (30 days)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError msg={errors.etaType} />
                </div>

                <div>
                  <Label htmlFor="purpose">Purpose of Visit *</Label>
                  <Select value={data.purpose} onValueChange={(v) => set("purpose", v)}>
                    <SelectTrigger id="purpose" className="mt-1.5">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tourism">Tourism / Leisure</SelectItem>
                      <SelectItem value="family">Visiting Family / Friends</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="sports">Sports / Cultural Event</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError msg={errors.purpose} />
                </div>

                <div>
                  <Label htmlFor="departureCountry">Departure Country *</Label>
                  <Input
                    id="departureCountry"
                    className="mt-1.5"
                    value={data.departureCountry}
                    onChange={(e) => set("departureCountry", e.target.value)}
                    placeholder="e.g. United Kingdom"
                  />
                  <FieldError msg={errors.departureCountry} />
                </div>

                <div>
                  <Label htmlFor="arrivalDate">Intended Arrival Date *</Label>
                  <Input
                    id="arrivalDate"
                    type="date"
                    className="mt-1.5"
                    value={data.arrivalDate}
                    onChange={(e) => set("arrivalDate", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <FieldError msg={errors.arrivalDate} />
                </div>
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset className="space-y-6">
              <legend className="font-display text-xl font-semibold">Personal Information</legend>
              <p className="text-sm text-muted-foreground">Enter details exactly as they appear on your passport.</p>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="surname">Surname / Family Name *</Label>
                  <Input
                    id="surname"
                    className="mt-1.5"
                    value={data.surname}
                    onChange={(e) => set("surname", e.target.value)}
                  />
                  <FieldError msg={errors.surname} />
                </div>
                <div>
                  <Label htmlFor="givenNames">Given / Other Names *</Label>
                  <Input
                    id="givenNames"
                    className="mt-1.5"
                    value={data.givenNames}
                    onChange={(e) => set("givenNames", e.target.value)}
                  />
                  <FieldError msg={errors.givenNames} />
                </div>

                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Select value={data.title} onValueChange={(v) => set("title", v)}>
                    <SelectTrigger id="title" className="mt-1.5">
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Mrs">Mrs</SelectItem>
                      <SelectItem value="Ms">Ms</SelectItem>
                      <SelectItem value="Dr">Dr</SelectItem>
                      <SelectItem value="Prof">Prof</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError msg={errors.title} />
                </div>

                <div>
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    className="mt-1.5"
                    value={data.dob}
                    onChange={(e) => set("dob", e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <FieldError msg={errors.dob} />
                </div>

                <div className="md:col-span-2">
                  <Label>Gender *</Label>
                  <RadioGroup
                    className="mt-2 flex flex-wrap gap-4"
                    value={data.gender}
                    onValueChange={(v) => set("gender", v)}
                  >
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g} className="flex items-center gap-2 text-sm">
                        <RadioGroupItem value={g} id={`g-${g}`} />
                        {g}
                      </label>
                    ))}
                  </RadioGroup>
                  <FieldError msg={errors.gender} />
                </div>

                <div>
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Input
                    id="nationality"
                    className="mt-1.5"
                    value={data.nationality}
                    onChange={(e) => set("nationality", e.target.value)}
                  />
                  <FieldError msg={errors.nationality} />
                </div>
                <div>
                  <Label htmlFor="countryOfBirth">Country of Birth *</Label>
                  <Input
                    id="countryOfBirth"
                    className="mt-1.5"
                    value={data.countryOfBirth}
                    onChange={(e) => set("countryOfBirth", e.target.value)}
                  />
                  <FieldError msg={errors.countryOfBirth} />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="countryOfAddress">Country of Address *</Label>
                  <Input
                    id="countryOfAddress"
                    className="mt-1.5"
                    value={data.countryOfAddress}
                    onChange={(e) => set("countryOfAddress", e.target.value)}
                  />
                  <FieldError msg={errors.countryOfAddress} />
                </div>
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset className="space-y-6">
              <legend className="font-display text-xl font-semibold">Passport Details</legend>
              <p className="text-sm text-muted-foreground">Your passport must be valid for at least 6 months from arrival.</p>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="passportNumber">Passport Number *</Label>
                  <Input
                    id="passportNumber"
                    className="mt-1.5 uppercase"
                    value={data.passportNumber}
                    onChange={(e) => set("passportNumber", e.target.value.toUpperCase())}
                  />
                  <FieldError msg={errors.passportNumber} />
                </div>
                <div>
                  <Label htmlFor="confirmPassportNumber">Confirm Passport Number *</Label>
                  <Input
                    id="confirmPassportNumber"
                    className="mt-1.5 uppercase"
                    value={data.confirmPassportNumber}
                    onChange={(e) => set("confirmPassportNumber", e.target.value.toUpperCase())}
                    onPaste={(e) => e.preventDefault()}
                  />
                  <FieldError msg={errors.confirmPassportNumber} />
                </div>
                <div>
                  <Label htmlFor="passportIssueDate">Passport Issue Date *</Label>
                  <Input
                    id="passportIssueDate"
                    type="date"
                    className="mt-1.5"
                    value={data.passportIssueDate}
                    onChange={(e) => set("passportIssueDate", e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <FieldError msg={errors.passportIssueDate} />
                </div>
                <div>
                  <Label htmlFor="passportExpiryDate">Passport Expiry Date *</Label>
                  <Input
                    id="passportExpiryDate"
                    type="date"
                    className="mt-1.5"
                    value={data.passportExpiryDate}
                    onChange={(e) => set("passportExpiryDate", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <FieldError msg={errors.passportExpiryDate} />
                </div>
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <fieldset className="space-y-6">
              <legend className="font-display text-xl font-semibold">Contact Information</legend>
              <p className="text-sm text-muted-foreground">We'll use these details to send your ETA approval.</p>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    className="mt-1.5"
                    value={data.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                  <FieldError msg={errors.email} />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    className="mt-1.5"
                    placeholder="+44 ..."
                    value={data.mobile}
                    onChange={(e) => set("mobile", e.target.value)}
                  />
                  <FieldError msg={errors.mobile} />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    className="mt-1.5"
                    value={data.address}
                    onChange={(e) => set("address", e.target.value)}
                    rows={3}
                  />
                  <FieldError msg={errors.address} />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    className="mt-1.5"
                    value={data.city}
                    onChange={(e) => set("city", e.target.value)}
                  />
                  <FieldError msg={errors.city} />
                </div>
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    className="mt-1.5"
                    value={data.country}
                    onChange={(e) => set("country", e.target.value)}
                  />
                  <FieldError msg={errors.country} />
                </div>
              </div>
            </fieldset>
          )}

          {step === 4 && (
            <fieldset className="space-y-6">
              <legend className="font-display text-xl font-semibold">Additional Information</legend>
              <p className="text-sm text-muted-foreground">Please provide the following declarations to complete your application.</p>

              <div className="space-y-5">
                <div>
                  <Label htmlFor="dualCitizenship">Dual Citizenship Details (if applicable)</Label>
                  <Textarea
                    id="dualCitizenship"
                    className="mt-1.5"
                    placeholder="Country and citizenship details, if any"
                    value={data.dualCitizenship}
                    onChange={(e) => set("dualCitizenship", e.target.value)}
                    rows={3}
                  />
                  <FieldError msg={errors.dualCitizenship} />
                </div>

                <div>
                  <Label>Existing Sri Lanka Visa / Residence Visa Status *</Label>
                  <RadioGroup
                    className="mt-2 grid gap-2"
                    value={data.existingVisaStatus}
                    onValueChange={(v) => set("existingVisaStatus", v)}
                  >
                    {[
                      { v: "none", l: "I do not hold any Sri Lanka visa" },
                      { v: "valid", l: "I currently hold a valid Sri Lanka visa" },
                      { v: "residence", l: "I hold a Sri Lanka residence visa" },
                      { v: "expired", l: "I held a visa previously (now expired)" },
                    ].map((o) => (
                      <label
                        key={o.v}
                        className="flex items-start gap-3 rounded-lg border border-border bg-background p-3 text-sm hover:bg-secondary/50 cursor-pointer"
                      >
                        <RadioGroupItem value={o.v} id={`vs-${o.v}`} className="mt-0.5" />
                        <span>{o.l}</span>
                      </label>
                    ))}
                  </RadioGroup>
                  <FieldError msg={errors.existingVisaStatus} />
                </div>

                <div className="space-y-3 rounded-xl bg-secondary/50 p-4">
                  <h3 className="font-semibold text-sm">Declarations</h3>
                  {[
                    {
                      key: "declarationTruth" as const,
                      label:
                        "I declare that the information provided is true and accurate to the best of my knowledge.",
                    },
                    {
                      key: "declarationCriminal" as const,
                      label:
                        "I declare that I have no criminal convictions or pending charges that would make me inadmissible to Sri Lanka.",
                    },
                    {
                      key: "declarationTerms" as const,
                      label:
                        "I have read and accept the terms, conditions and privacy policy of the Department of Immigration & Emigration.",
                    },
                  ].map((d) => (
                    <div key={d.key}>
                      <label className="flex items-start gap-3 text-sm">
                        <Checkbox
                          id={d.key}
                          checked={data[d.key] as boolean}
                          onCheckedChange={(v) => set(d.key, Boolean(v))}
                          className="mt-0.5"
                        />
                        <span>{d.label}</span>
                      </label>
                      <FieldError msg={errors[d.key]} />
                    </div>
                  ))}
                </div>
              </div>
            </fieldset>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
            <Link to="/visa" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Visa Services
            </Link>
            <div className="flex gap-3">
              {step > 0 && (
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex h-11 items-center rounded-lg border border-border bg-background px-5 text-sm font-semibold hover:bg-secondary"
                >
                  <ArrowLeft className="mr-1.5 h-4 w-4" /> Previous
                </button>
              )}
              {step < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-11 items-center rounded-lg bg-trust px-6 text-sm font-semibold text-white hover:opacity-90"
                >
                  Next <ArrowRight className="ml-1.5 h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex h-11 items-center rounded-lg bg-gold px-6 text-sm font-semibold text-gold-foreground hover:opacity-90"
                >
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
