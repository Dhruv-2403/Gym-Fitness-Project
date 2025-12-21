const footerLinks = [
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Privacy', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-10 text-white/70">
      <div className="flex w-full flex-col gap-6 px-4 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">FitFusion</p>
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">Elevate every session</p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-wide">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3 text-white/50">
          {[1, 2, 3].map((icon) => (
            <span key={icon} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20">
              ◉
            </span>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-[12px] uppercase tracking-[0.3em] text-white/30">© {new Date().getFullYear()} FitFusion. All rights reserved.</p>
    </footer>
  )
}
