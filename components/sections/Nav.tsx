"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";
import { Wordmark } from "@/components/Wordmark";
import { PlanButton } from "@/components/ConsultBuilder/PlanButton";
import { business, smsHref, telHref } from "@/lib/business";
import { btnGhost, btnPrimary, container } from "@/lib/ui";
import { servicePages } from "@/lib/services";

// Four destinations. Services opens a small menu of the four service pages and the hub.
const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/new-here", label: "New here" },
  { href: "/studio", label: "The studio" },
];
const serviceLinks = [
  ...servicePages.map((s) => ({ href: `/services/${s.slug}`, label: s.name })),
  { href: "/services", label: "All services" },
];

/** Desktop Services menu: a disclosure button with a short list of links. Esc and outside click close it. */
function ServicesMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const current = pathname.startsWith("/services");

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    const onFocus = (e: FocusEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  return (
    <li ref={ref} className="relative">
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex min-h-[44px] items-center gap-1 whitespace-nowrap rounded-full px-4 text-[0.9375rem] font-medium transition-colors hover:text-ink ${
          current ? "text-ink underline decoration-accent decoration-2 underline-offset-8" : "text-muted"
        }`}
      >
        Services
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={2.25} aria-hidden="true" />
      </button>
      {open && (
        <ul
          id="services-menu"
          className="absolute left-1/2 top-[calc(100%+10px)] w-[300px] -translate-x-1/2 rounded-[18px] border border-line bg-surface p-2 shadow-soft"
        >
          {serviceLinks.map((l, i) => (
            <li key={l.href} className={i === serviceLinks.length - 1 ? "mt-1 border-t border-line pt-1" : ""}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`flex min-h-[44px] items-center rounded-xl px-4 font-medium hover:bg-surface-2 hover:text-ink ${
                  pathname === l.href ? "text-accent" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

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
      style={{ viewTransitionName: "site-header" }}
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
              if (a.href === "/services") return <ServicesMenu key={a.href} pathname={pathname} />;
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
                    className="display flex min-h-[60px] items-center text-[1.875rem] font-[700] text-ink"
                  >
                    {a.label}
                  </Link>
                  {a.href === "/services" && (
                    <ul className="-mt-1 grid grid-cols-2 gap-x-4 pb-3">
                      {servicePages.map((sp) => (
                        <li key={sp.slug}>
                          <Link
                            href={`/services/${sp.slug}`}
                            onClick={() => setOpen(false)}
                            aria-current={pathname === `/services/${sp.slug}` ? "page" : undefined}
                            className="flex min-h-[44px] items-center text-[0.9375rem] font-medium leading-tight text-muted hover:text-ink"
                          >
                            {sp.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
