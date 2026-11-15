"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { addressLine1, addressLine2, business, directionsUrl, mapEmbedUrl } from "@/lib/business";
import { textLink } from "@/lib/ui";

/**
 * Click-to-load map. A static card (the address and a small drawn pin) until
 * someone asks for the map, so Google Maps never loads, tracks or slows the
 * page unless it is wanted.
 */
export function MapCard({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const [show, setShow] = useState(false);
  const H = headingLevel;
  return (
    <div className="relative flex min-h-[340px] flex-col overflow-hidden rounded-[20px] border border-line bg-surface">
      {show ? (
        <iframe
          title={`Map showing ${business.name} at ${addressLine1}, ${addressLine2}`}
          src={mapEmbedUrl}
          referrerPolicy="no-referrer-when-downgrade"
          className="block min-h-[340px] w-full flex-1 grayscale-[0.6] invert-[0.9] hue-rotate-180"
        />
      ) : (
        <>
          {/* A drawn map: a few quiet roads and her pin. Decorative. */}
          <svg aria-hidden="true" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
            <g fill="none" stroke="#33272B" strokeLinecap="round">
              <path d="M-20 168C60 150 120 120 190 118S320 132 420 96" strokeWidth="10" />
              <path d="M-20 168C60 150 120 120 190 118S320 132 420 96" stroke="#2A2023" strokeWidth="6" />
              <path d="M120 -10C130 60 150 100 190 118S250 200 260 260" strokeWidth="5" />
              <path d="M300 -10C290 40 300 90 330 120" strokeWidth="4" />
              <path d="M-10 60C60 70 90 40 140 30" strokeWidth="3" />
              <path d="M200 260C230 220 300 200 420 210" strokeWidth="3" />
            </g>
          </svg>
          {/* Her pin, kept in the top corner so it never meets the text. */}
          <svg aria-hidden="true" viewBox="0 0 80 80" className="absolute right-6 top-6 h-20 w-20">
            <circle cx="40" cy="44" r="34" fill="#FF3D8B" opacity="0.12" />
            <path d="M40 10c-14 0-24 10-24 23 0 17 24 37 24 37s24-20 24-37c0-13-10-23-24-23z" fill="#FF3D8B" />
            <circle cx="40" cy="33" r="8" fill="#120E10" />
          </svg>
          <div className="relative mt-auto bg-gradient-to-t from-surface via-surface/95 to-transparent p-6 pt-16 sm:p-7 sm:pt-20">
            <H className="display text-h3 font-[800] text-ink">Find the studio</H>
            <address className="mt-2 not-italic text-ink">
              {addressLine1}, {addressLine2}
            </address>
            <p className="text-muted">Point Lookout Rd, Leonardtown, St. Mary&apos;s County.</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              <button
                type="button"
                onClick={() => setShow(true)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-bg px-5 font-semibold text-ink transition-colors hover:border-accent"
              >
                <MapPin className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
                Show the map
              </button>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={textLink}>
                Get directions
              </a>
            </div>
            <p className="mt-2 text-[0.8125rem] text-muted">The map loads from Google Maps when you tap it.</p>
          </div>
        </>
      )}
    </div>
  );
}
