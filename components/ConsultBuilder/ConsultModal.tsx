"use client";
// Placeholder until Phase 5.
export default function ConsultModal({ onClose }: { preset: unknown; onClose: () => void }) {
  return (
    <div role="dialog" aria-modal="true" aria-label="Plan My Dream Hair" className="fixed inset-0 z-50 grid place-items-center bg-black/70">
      <button type="button" onClick={onClose} className="rounded-full bg-accent px-6 py-3 text-on-accent">Close</button>
    </div>
  );
}
