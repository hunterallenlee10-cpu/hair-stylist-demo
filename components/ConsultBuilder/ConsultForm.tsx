"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import { business, smsHref, telHref } from "@/lib/business";
import {
  buildSmsBody,
  dayOptions,
  emptyAnswers,
  hairNowOptions,
  lengthOptions,
  lookOptions,
  thicknessOptions,
  validPhone,
  type ConsultAnswers,
} from "@/lib/consult";
import { btnGhost, btnPrimary } from "@/lib/ui";
import type { ConsultPreset } from "./ConsultContext";

const TOTAL = 5;
const titles = ["What are we doing?", "Where is your hair now?", "Length and thickness.", "A little more.", "Your info."];

const chip =
  "relative inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent";
const chipOn = "border-accent bg-accent text-on-accent";
const chipOff = "border-line bg-bg text-ink hover:border-muted";
const field =
  "mt-2 block w-full rounded-2xl border border-line bg-bg px-4 py-3 text-base text-ink placeholder:text-[#8d807e] focus:border-accent focus:outline-none";

function Chip({
  type,
  name,
  checked,
  onChange,
  children,
}: {
  type: "checkbox" | "radio";
  name: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label className={`${chip} ${checked ? chipOn : chipOff}`}>
      <input type={type} name={name} checked={checked} onChange={onChange} className="sr-only" />
      {checked && <Check className="h-4 w-4" strokeWidth={2.75} aria-hidden="true" />}
      {children}
    </label>
  );
}

export function ConsultForm({
  preset = {},
  titleId,
  headingLevel = "h2",
}: {
  preset?: ConsultPreset;
  titleId?: string;
  headingLevel?: "h2" | "h3";
}) {
  const uid = useId();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [a, setA] = useState<ConsultAnswers>({
    ...emptyAnswers,
    looks: (preset.looks ?? []).filter((l) => (lookOptions as readonly string[]).includes(l)),
    model: !!preset.model,
  });
  const headRef = useRef<HTMLHeadingElement>(null);
  const shown = useRef({ step: 1, done: false });
  const H = headingLevel;

  // Move focus to the new step's heading only when the step actually changes.
  useEffect(() => {
    if (shown.current.step === step && shown.current.done === done) return;
    shown.current = { step, done };
    headRef.current?.focus({ preventScroll: false });
  }, [step, done]);

  const set = <K extends keyof ConsultAnswers>(k: K, v: ConsultAnswers[K]) => {
    setError("");
    setA((prev) => ({ ...prev, [k]: v }));
  };
  const toggleLook = (l: string) =>
    set("looks", a.looks.includes(l) ? a.looks.filter((x) => x !== l) : [...a.looks, l]);

  const check = () => {
    if (step === 1 && !a.looks.length) return "Pick at least one. “Not sure yet” counts.";
    if (step === 2 && !a.hairNow) return "Pick the closest one. There is no wrong answer.";
    if (step === 5 && !validPhone(a.phone))
      return "That phone number looks short. Use 10 digits, like 240 555 0123, so Mickayla can text you back.";
    return "";
  };

  const next = () => {
    const e = check();
    if (e) return setError(e);
    if (step < TOTAL) setStep(step + 1);
    else setDone(true);
  };

  const body = buildSmsBody(a);

  if (done) {
    return (
      <div aria-live="polite">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-accent text-on-accent">
          <Check className="h-8 w-8" strokeWidth={3} aria-hidden="true" />
        </span>
        <H ref={headRef} tabIndex={-1} id={titleId} className="display mt-6 text-[2.25rem] font-[800] leading-[1.02] text-ink outline-none sm:text-[2.75rem]">
          You are one text away.
        </H>
        {/* DRAFT: confirm reply method and timing */}
        <p className="mt-3 text-lg text-muted">Mickayla will reply to plan your consultation.</p>

        <dl className="mt-6 grid gap-3 rounded-2xl border border-line bg-bg p-5 text-[0.9375rem]">
          {[
            ["Looking for", a.looks.join(", ")],
            ["Hair now", [a.hairNow, a.length, a.thickness].filter(Boolean).join(", ")],
            ["Extras", [a.longSession && "Long session is fine", a.model && "Vivid model"].filter(Boolean).join(", ")],
            ["Dream hair", a.dream],
            ["Name", a.name],
            ["Phone", a.phone],
            ["Best days", a.days],
            ["Notes", a.notes],
          ]
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7rem_1fr] gap-3">
                <dt className="text-muted">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
        </dl>

        <p className="mt-6 text-muted">Your message, ready to send:</p>
        <p className="mt-2 rounded-2xl rounded-br-md bg-ink px-4 py-3 text-[0.9375rem] text-bg">{body}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a href={smsHref(body)} className={`${btnPrimary} min-h-[60px] text-lg`}>
            <MessageCircle className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
            Text this to Mickayla
          </a>
          <a href={telHref} className={`${btnGhost} min-h-[60px] text-lg`}>
            <Phone className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
            Call now
          </a>
        </div>
        <p className="mt-4 text-sm text-muted">
          Texts go to {business.phoneDisplay}. You can send inspiration photos in the same thread.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
    >
      <div className="flex items-center justify-between text-sm font-semibold text-muted">
        <span>
          Step <span className="text-accent">{step}</span> of {TOTAL}
        </span>
        <span>Free consultation planner</span>
      </div>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-label="Planner progress"
        aria-valuemin={1}
        aria-valuemax={TOTAL}
        aria-valuenow={step}
      >
        <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${(step / TOTAL) * 100}%` }} />
      </div>

      <div key={step} className="animate-[stepIn_220ms_ease-out]">
        <H ref={headRef} tabIndex={-1} id={titleId} className="display mt-8 text-[2rem] font-[800] leading-[1.05] text-ink outline-none sm:text-[2.5rem]">
          {titles[step - 1]}
        </H>

        {step === 1 && (
          <fieldset className="mt-6">
            <legend className="text-muted">Pick as many as you like.</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {lookOptions.map((l) => (
                <Chip key={l} type="checkbox" name="looks" checked={a.looks.includes(l)} onChange={() => toggleLook(l)}>
                  {l}
                </Chip>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="mt-6">
            <legend className="text-muted">Be honest. It changes the plan, not the welcome.</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {hairNowOptions.map((h) => (
                <Chip key={h.label} type="radio" name="hairNow" checked={a.hairNow === h.label} onChange={() => set("hairNow", h.label)}>
                  {h.label}
                </Chip>
              ))}
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <div className="mt-6 grid gap-8">
            <fieldset>
              <legend className="font-semibold text-ink">Length</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {lengthOptions.map((l) => (
                  <Chip key={l} type="radio" name="length" checked={a.length === l} onChange={() => set("length", l)}>
                    {l}
                  </Chip>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-semibold text-ink">Thickness</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {thicknessOptions.map((t) => (
                  <Chip key={t} type="radio" name="thickness" checked={a.thickness === t} onChange={() => set("thickness", t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 4 && (
          <div className="mt-6 grid gap-5">
            <fieldset>
              <legend className="text-muted">Optional. Tick anything that fits.</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                <Chip type="checkbox" name="longSession" checked={a.longSession} onChange={() => set("longSession", !a.longSession)}>
                  I am happy to sit for a long session
                </Chip>
                <Chip type="checkbox" name="model" checked={a.model} onChange={() => set("model", !a.model)}>
                  I would like to be a vivid model
                </Chip>
              </div>
            </fieldset>
            <div>
              <label htmlFor={`${uid}-dream`} className="font-semibold text-ink">
                Describe your dream hair in a sentence. <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id={`${uid}-dream`}
                className={field}
                value={a.dream}
                maxLength={160}
                onChange={(e) => set("dream", e.target.value)}
                placeholder="Peach to lilac, soft root, nothing brassy"
              />
            </div>
            <p className="text-muted">You can send inspiration photos in the text thread after this.</p>
          </div>
        )}

        {step === 5 && (
          <div className="mt-6 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-name`} className="font-semibold text-ink">
                  Name <span className="font-normal text-muted">(optional)</span>
                </label>
                <input id={`${uid}-name`} className={field} autoComplete="given-name" value={a.name} onChange={(e) => set("name", e.target.value)} />
              </div>
              <div>
                <label htmlFor={`${uid}-phone`} className="font-semibold text-ink">
                  Phone <span className="font-normal text-muted">(required)</span>
                </label>
                <input
                  id={`${uid}-phone`}
                  className={field}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  aria-required="true"
                  aria-invalid={!!error && step === 5}
                  aria-describedby={error ? `${uid}-error` : undefined}
                  value={a.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="(240) 555 0123"
                />
              </div>
            </div>
            <fieldset>
              <legend className="font-semibold text-ink">Best days</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {dayOptions.map((d) => (
                  <Chip key={d} type="radio" name="days" checked={a.days === d} onChange={() => set("days", d)}>
                    {d}
                  </Chip>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor={`${uid}-notes`} className="font-semibold text-ink">
                Notes <span className="font-normal text-muted">(optional)</span>
              </label>
              <textarea id={`${uid}-notes`} rows={3} className={field} value={a.notes} onChange={(e) => set("notes", e.target.value)} />
            </div>
          </div>
        )}
      </div>

      <p id={`${uid}-error`} role="alert" className="mt-5 min-h-[1.5rem] font-semibold text-accent">
        {error}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-5">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => {
              setError("");
              setStep(step - 1);
            }}
            className={`${btnGhost} px-5`}
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
            Back
          </button>
        ) : (
          <span />
        )}
        <button type="submit" className={btnPrimary}>
          {step < TOTAL ? "Next" : "See my plan"}
          <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
