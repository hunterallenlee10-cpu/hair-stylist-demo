export function WavyDivider({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`wavy-divider mx-auto w-full max-w-[1360px] ${className}`} />;
}
