"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { Wordmark } from "@/components/Wordmark";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { business, smsHref, telHref } from "@/lib/business";
import { btnGhost, btnPrimary, container } from "@/lib/ui";

// Four destinations, one page each. Short enough to show in full on desktop.
const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/new-here", label: "New here" },
  { href: "/studio", label: "The studio" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Full-screen sheet: lock scroll, close on Esc, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const sheet = sheetRef.current;
    sheet?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
      if (e.key === "Tab" && sheet) {
        const items = Array.from(sheet.querySelectorAll<HTMLElement>("a,button"));
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 h-[var(--nav-h)] border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-bg/90 backdrop-blur-md" : "border-transparent bg-bg"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1360px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="-ml-1 flex min-h-[44px] items-center rounded-lg px-1" aria-label="Disco Lemonade Studio, home">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            {links.map((a) => {
              const current = pathname === a.href;
              return (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    aria-current={current ? "page" : undefined}
                    className={`inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full px-4 text-[0.9375rem] font-medium transition-colors hover:text-ink ${
                      current ? "text-ink underline decoration-accent decoration-2 underline-offset-8" : "text-muted"
                    }`}
                  >
                    {a.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={smsHref()}
            className="hidden min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full px-2 text-[0.9375rem] font-semibold text-ink hover:text-accent min-[1200px]:inline-flex"
          >
            <MessageCircle className="h-[18px] w-[18px] text-accent" strokeWidth={2} aria-hidden="true" />
            Text {business.phoneDisplay}
          </a>
          <PlanButton className={`${btnPrimary} min-h-[46px] whitespace-nowrap px-6 text-[0.9375rem]`} />
        </div>

        <button
          ref={burgerRef}
          type="button"
          className="-mr-2 inline-flex h-12 w-12 items-center justify-center rounded-full text-ink lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-bg lg:hidden"
        >
          <div className={`${container} flex h-[var(--nav-h)] shrink-0 items-center justify-between`}>
            <Link href="/" onClick={() => setOpen(false)} className="flex min-h-[44px] items-center" aria-label="Disco Lemonade Studio, home">
              <Wordmark />
            </Link>
            <button
              type="button"
              className="-mr-2 inline-flex h-12 w-12 items-center justify-center rounded-full text-ink"
              aria-label="Close menu"
              onClick={() => {
                setOpen(false);
                burgerRef.current?.focus();
              }}
            >
              <X className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile" className={`${container} flex flex-1 flex-col pb-8 pt-4`}>
            <ul className="flex flex-col">
              {links.map((a) => (
                <li key={a.href} className="border-b border-line">
                  <Link
                    href={a.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === a.href ? "page" : undefined}
                    className="display flex min-h-[64px] items-center text-[2rem] font-[700] text-ink"
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
              <li className="border-b border-line">
                <Link href="/contact" onClick={() => setOpen(false)} className="display flex min-h-[64px] items-center text-[2rem] font-[700] text-ink">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-auto flex flex-col gap-3 pt-8">
              <PlanButton className={`${btnPrimary} w-full`} />
              <div className="grid grid-cols-2 gap-3">
                <a href={smsHref()} className={`${btnGhost} px-4`} aria-label={`Text Mickayla at ${business.phoneDisplay}`}>
                  <MessageCircle className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  Text
                </a>
                <a href={telHref} className={`${btnGhost} px-4`} aria-label={`Call Mickayla at ${business.phoneDisplay}`}>
                  <Phone className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  Call
                </a>
              </div>
              <p className="pt-2 text-center text-muted">{business.bookingInstruction.replace("(240)-561-8519", business.phoneDisplay)}</p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
