// src/app/programme/page.tsx
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getProgrammeContent } from "@/lib/site-data";

export default async function ProgrammePage() {
  const { settings, programs } = await getProgrammeContent();

  return (
    <div className="page-shell">
      <SiteHeader active="programme" />

      <main className="page-main">
        <section className="page-header-block page-header-centered">
          <div className="page-header-inner">
            {settings.heroEyebrow && (
              <span className="eyebrow">{settings.heroEyebrow}</span>
            )}
            <h1>{settings.heroHeading}</h1>
            {settings.heroSubtitle && (
              <p className="page-subtitle">{settings.heroSubtitle}</p>
            )}
            <div className="vertical-divider" aria-hidden="true" />
          </div>
        </section>

        <section className="section-block programme-section">
          <div className="section-inner">
            <div className="programme-list">
              {programs.map((program, index) => (
                <article key={program._id} className="programme-item">
                  <div className="programme-left">
                    <div className="programme-number">
                      {program.number || String(index + 1).padStart(2, "0")}
                    </div>
                    <h2 className="programme-name">{program.name}</h2>
                    {program.description && (
                      <p className="programme-desc">{program.description}</p>
                    )}
                  </div>

                  <div className="programme-detail">
                    {(program.price || program.duration) && (
                      <div className="detail-meta">
                        {program.price && (
                          <span className="detail-price">{program.price}</span>
                        )}
                        {program.duration && (
                          <span className="detail-duration">
                            {program.duration}
                          </span>
                        )}
                      </div>
                    )}

                    {program.includes && program.includes.length > 0 && (
                      <ul className="detail-includes">
                        {program.includes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={program.ctaHref || "/kontakt"}
                      className="btn btn-secondary"
                    >
                      Jetzt buchen
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block cta-block cta-block-dark">
          <div className="cta-inner">
            <h2>{settings.ctaHeading}</h2>
            <div className="hero-actions">
              <Link
                href={settings.ctaButtonHref || "/kontakt"}
                className="btn btn-inverted"
              >
                {settings.ctaButtonLabel || "Kostenlose Beratung buchen"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
