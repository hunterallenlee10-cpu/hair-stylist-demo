"use client";

import { useEffect, useState, type Ref } from "react";
import { Check, Copy, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { business, smsHref } from "@/lib/business";
import { type ConsultAnswers } from "@/lib/consult";
import { btnGhost, btnPrimary } from "@/lib/ui";
import { RatherTalk } from "./RatherTalk";

/**
 * The planner's honest last step. A summary, then one button that names the
 * real action: "Text my request to Mickayla" opens her messages with a text
 * that starts with CONSULTATION. The success line only appears after that tap.
 * On a desktop (no phone to text from), "Copy my request" leads instead, with
 * the number written out and an Instagram DM as the other way in.
 */
export function SendStep({
  a,
  body,
  headRef,
  titleId,
  H,
  onEdit,
}: {
  a: ConsultAnswers;
  body: string;
  headRef: Ref<HTMLHeadingElement>;
  titleId?: string;
  H: "h2" | "h3";
  onEdit: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const set = () => setDesktop(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(body);
    } catch {
      // Older browsers: select the message so it can be copied by hand.
      const el = document.getElementById("consult-message");
      if (el) window.getSelection()?.selectAllChildren(el);
    }
    setCopied(true);
  };

  const rows: Array<[string, string]> = [
    ["Looking for", a.looks.join(", ")],
    ["Hair now", [a.hairNow, a.length, a.thickness].filter(Boolean).join(", ")],
    ["Extras", [a.longSession && "Long session is fine", a.model && "Vivid model"].filter(Boolean).join(", ")],
    ["Dream hair", a.dream],
    ["Name", a.name],
    ["Best days", a.days],
  ];

  const textBtn = (
    <a href={smsHref(body)} onClick={() => setSent(true)} className={`${desktop ? btnGhost : btnPrimary} min-h-[60px] w-full text-lg`}>
      <MessageCircle className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
      Text my request to Mickayla
    </a>
  );
  const copyBtn = (
    <button type="button" onClick={copy} className={`${desktop ? btnPrimary : btnGhost} min-h-[60px] w-full text-lg`}>
      {copied ? <Check className="h-5 w-5" strokeWidth={2.75} aria-hidden="true" /> : <Copy className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />}
      {copied ? "Copied" : "Copy my request"}
    </button>
  );

  return (
    <div>
      <p className="text-sm font-semibold text-muted">
        Last step: <span className="text-accent">send it</span>
      </p>
      <H ref={headRef} tabIndex={-1} id={titleId} className="display mt-3 text-h2 font-[800] text-ink outline-none">
        You are one text away.
      </H>
      <p className="mt-3 text-lead text-muted">Here is your request. Nothing is sent until you send it.</p>

      <dl className="mt-6 grid gap-3 rounded-2xl border border-line bg-bg p-5 text-[0.9375rem]">
        {rows
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <div key={k} className="grid grid-cols-[7rem_1fr] gap-3">
              <dt className="text-muted">{k}</dt>
              <dd className="text-ink">{v}</dd>
            </div>
          ))}
      </dl>
      <button type="button" onClick={onEdit} className="mt-2 inline-flex min-h-[44px] items-center font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
        Change my answers
      </button>

      <p className="mt-4 text-muted">The message, starting with CONSULTATION:</p>
      <p id="consult-message" className="mt-2 rounded-2xl rounded-br-md bg-ink px-4 py-3 text-[0.9375rem] text-bg">
        {body}
      </p>

      <div className="mt-6 grid gap-3">
        {desktop ? (
          <>
            {copyBtn}
            <p className="text-center text-muted">
              Then text it to <span className="font-semibold text-ink">{business.phoneDisplay}</span> from your phone.
            </p>
            {textBtn}
          </>
        ) : (
          <>
            {textBtn}
            {copyBtn}
          </>
        )}
        <a
          href={business.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
        >
          <InstagramIcon className="h-[18px] w-[18px] text-accent" />
          Or send it as an Instagram DM to {business.instagramHandle}
        </a>
      </div>

      <div aria-live="polite" className="mt-4 min-h-[1.75rem]">
        {sent && (
          <p className="flex items-center justify-center gap-2 font-semibold text-success">
            <Check className="h-5 w-5" strokeWidth={2.75} aria-hidden="true" />
            Sent? She will reply to plan your consultation.
          </p>
        )}
        {copied && !sent && <p className="text-center font-semibold text-success">Copied. Paste it into a text or a DM.</p>}
      </div>

      <RatherTalk />
    </div>
  );
}
