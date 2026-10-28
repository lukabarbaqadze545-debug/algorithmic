export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M16 2l2.9 10.1L29 15l-10.1 2.9L16 28l-2.9-10.1L3 15l10.1-2.9z" />
    </svg>
  )
}
