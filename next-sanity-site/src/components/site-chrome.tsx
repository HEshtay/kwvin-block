import Link from "next/link";

import { getSiteChromeContent } from "@/lib/site-data";

type ActivePage = "home" | "methode" | "kontakt" | "programme";

type SiteHeaderProps = {
  active: ActivePage;
  brand?: string;
};

export async function SiteHeader({ active, brand }: Readonly<SiteHeaderProps>) {
  const chrome = await getSiteChromeContent();

  return (
    <header className="site-nav" role="banner">
      <Link href="/" className="site-brand">
        {brand || chrome.brand || "Kevin Block"}
      </Link>

      <nav aria-label={chrome.navAriaLabel || "Hauptnavigation"}>
        <ul className="site-nav-links">
          {(chrome.navItems || []).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={item.key === active ? "active" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="nav-cta-wrap">
        <Link
          href={chrome.navCtaHref || "/kontakt"}
          className="btn btn-primary"
        >
          {chrome.navCtaLabel || "Beratung buchen"}
        </Link>
      </div>
    </header>
  );
}

export async function SiteFooter({ brand }: Readonly<{ brand?: string }>) {
  const chrome = await getSiteChromeContent();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer-inner">
        <Link href="/" className="site-footer-brand">
          {brand || chrome.brand || "Kevin Block"}
        </Link>

        <nav aria-label={chrome.footerAriaLabel || "Fußnavigation"}>
          <ul className="site-footer-links">
            {(chrome.footerLinks || []).map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="site-footer-copy">
        {chrome.footerCopy || "© 2026 Kevin Block. Alle Rechte vorbehalten."}
      </p>
    </footer>
  );
}
