import Link from "next/link";

import type { SocialLink } from "@/lib/sanity.queries";
import { getSiteChromeContent } from "@/lib/site-data";

type ActivePage = "home" | "methode" | "kontakt" | "programme" | "about";

type SiteHeaderProps = {
  active: ActivePage;
  brand?: string;
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M21 12c0 2.4-.2 4-.47 4.86a2.8 2.8 0 0 1-1.67 1.67C18 18.8 16.4 19 12 19s-6-.2-6.86-.47a2.8 2.8 0 0 1-1.67-1.67C3.2 16 3 14.4 3 12s.2-4 .47-4.86a2.8 2.8 0 0 1 1.67-1.67C6 5.2 7.6 5 12 5s6 .2 6.86.47a2.8 2.8 0 0 1 1.67 1.67C20.8 8 21 9.6 21 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M10 8.8v6.4l5.6-3.2L10 8.8Z" fill="currentColor" />
    </svg>
  );
}

function SocialIcon({
  platform,
}: Readonly<{ platform: SocialLink["platform"] }>) {
  if (platform === "youtube") {
    return <YouTubeIcon />;
  }

  return <InstagramIcon />;
}

function SocialLinks({
  links,
  label,
  className,
  showText = false,
}: Readonly<{
  links: SocialLink[];
  label?: string;
  className: string;
  showText?: boolean;
}>) {
  return (
    <nav aria-label={label || "Social Media"} className={className}>
      <ul>
        {links.map((item) => (
          <li key={`${item.platform}-${item.href}`}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="social-link"
            >
              <span className="social-icon-wrap">
                <SocialIcon platform={item.platform} />
              </span>
              {showText && (
                <span className="small-caps social-link-text">
                  {item.label}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

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

export async function GlobalSocialRail() {
  const chrome = await getSiteChromeContent();
  const socialLinks = chrome.socialLinks || [];

  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <aside className="social-rail" aria-label={chrome.socialLabel || "Follow"}>
      <span className="small-caps social-rail-label">
        {chrome.socialLabel || "Follow"}
      </span>
      <SocialLinks
        links={socialLinks}
        label={chrome.socialLabel}
        className="social-rail-links"
      />
    </aside>
  );
}

export async function SiteFooter({ brand }: Readonly<{ brand?: string }>) {
  const chrome = await getSiteChromeContent();
  const socialLinks = chrome.socialLinks || [];

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer-inner">
        <div className="site-footer-brand-stack">
          <Link href="/" className="site-footer-brand">
            {brand || chrome.brand || "Kevin Block"}
          </Link>

          {socialLinks.length > 0 && (
            <SocialLinks
              links={socialLinks}
              label={chrome.socialLabel}
              className="site-footer-social"
              showText
            />
          )}
        </div>

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
