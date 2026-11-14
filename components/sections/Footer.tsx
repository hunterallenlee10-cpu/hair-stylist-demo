import Link from "next/link";
import { Gift, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { Wordmark } from "@/components/Wordmark";
import { addressLine1, addressLine2, business, directionsUrl, services, smsHref, telHref } from "@/lib/business";
import { isLive } from "@/lib/site";
import { container } from "@/lib/ui";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg pb-28 pt-14 lg:pb-12 lg:pt-20">
      <div className={`${container} grid grid-cols-2 gap-x-6 gap-y-12 max-[359px]:grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr_1fr] [&>*]:min-w-0 [&>*:nth-child(-n+2)]:col-span-2 sm:[&>*:nth-child(-n+2)]:col-span-1`}>
        <div>
          <Link href="/" className="inline-flex min-h-[44px] items-center" aria-label="Disco Lemonade Studio, home">
            <Wordmark size="lg" />
          </Link>
          <p className="mt-4 text-muted">{business.tagline}</p>
          <p className="display mt-8 text-[2rem] font-[700] leading-none text-ink">
            <a href={telHref} className="hover:text-accent">
              {business.phoneDisplay}
            </a>
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6">
            <a href={smsHref()} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-ink hover:text-accent">
              <MessageCircle className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
              Text CONSULTATION
            </a>
            <a href={telHref} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-ink hover:text-accent">
              <Phone className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
              Call {business.phoneDisplay}
            </a>
          </div>
        </div>

        <div>
          <h2 className="eyebrow text-muted">Visit</h2>
          <address className="mt-4 not-italic leading-relaxed text-ink">
            {business.name}
            <br />
            {addressLine1}
            <br />
            {addressLine2}
          </address>
          {/* DRAFT: confirm working days and hours */}
          <p className="mt-3 text-muted">{business.hours}</p>
          <p className="mt-1 text-muted">Serving Leonardtown, St. Mary&apos;s County and Southern Maryland.</p>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-[44px] items-center gap-2 font-semibold text-ink hover:text-accent"
          >
            <MapPin className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
            Get directions to the studio
          </a>
        </div>

        <div>
          <h2 className="eyebrow text-muted">Services</h2>
          <ul className="mt-2">
            {services.map((s) => (
              <li key={s.id}>
                <a href={`/services#${s.id}`} className="inline-flex min-h-[40px] items-center text-ink hover:text-accent">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-muted">More</h2>
          <ul className="mt-2">
            {[
              ["/work", "The work"],
              ["/new-here", "New here and FAQ"],
              ["/studio", "The studio"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-[40px] items-center text-ink hover:text-accent">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={business.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 text-ink hover:text-accent"
              >
                <Instagram className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
                Instagram {business.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={business.giftCardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 text-ink hover:text-accent"
              >
                <Gift className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
                Gift cards
              </a>
            </li>
            <li>
              <Link href="/contact" className="inline-flex min-h-[44px] items-center text-ink hover:text-accent">
                Contact the studio
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={`${container} mt-16 border-t border-line pt-8 text-[0.9375rem] text-muted`}>
        <p>© 2026 {business.name}</p>
        {!isLive && <p className="mt-1">Concept preview by Lee Enterprises Unlimited.</p>}
      </div>
    </footer>
  );
}
