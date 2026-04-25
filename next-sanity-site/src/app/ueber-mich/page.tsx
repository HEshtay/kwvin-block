import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getAboutPageContent } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Über mich — Kevin Block",
  description:
    "Erfahren Sie mehr über den Werdegang, die Philosophie und die Qualifikationen von Kevin Block.",
};

export default async function UeberMichPage() {
  const settings = await getAboutPageContent();
  const licenses = settings.licenses || [];

  return (
    <div className="page-shell">
      <SiteHeader active="about" />

      <main className="page-main">
        <section className="section-block about-hero-block">
          <div className="section-inner about-hero-grid">
            <div className="about-hero-copy">
              <span className="eyebrow">{settings.eyebrow}</span>
              <h1>{settings.heading}</h1>
              <p>{settings.subtitle}</p>
              <div className="about-hero-divider" aria-hidden="true" />
            </div>

            <figure
              className="editorial-figure about-hero-figure"
              aria-label="Porträt Kevin Block"
            >
              <Image
                src="/editorial-athlete-hero.svg"
                alt="Monochromes Porträt von Kevin Block"
                width={920}
                height={1120}
                priority
              />
            </figure>
          </div>
        </section>

        <section className="section-block about-journey-block">
          <div className="section-inner">
            <div className="about-journey-copy">
              <span className="eyebrow">{settings.journeyLabel}</span>
              <h2>{settings.journeyHeading}</h2>
              {settings.journeyBody1 && <p>{settings.journeyBody1}</p>}
              {settings.journeyBody2 && <p>{settings.journeyBody2}</p>}
              {settings.journeyBody3 && <p>{settings.journeyBody3}</p>}
            </div>
          </div>
        </section>

        {licenses.length > 0 && (
          <section className="section-block about-licenses-block">
            <div className="section-inner">
              <div className="about-licenses-header">
                <span className="eyebrow">Qualifikation</span>
                <h2>{settings.licensesHeading}</h2>
              </div>

              <div className="about-licenses-grid">
                {licenses.map((license) => (
                  <article
                    key={`${license.title}-${license.issuer || ""}-${license.year || ""}`}
                    className="about-license-card"
                  >
                    <h3>{license.title}</h3>
                    {(license.issuer || license.year) && (
                      <p className="small-caps">
                        {[license.issuer, license.year].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {settings.quote && (
          <section className="section-block about-quote-block">
            <div className="section-inner about-quote-inner">
              <blockquote className="about-quote">“{settings.quote}”</blockquote>
            </div>
          </section>
        )}

        <section className="about-image-strip" aria-label="Trainingsstudio Impression" />

        <section className="section-block cta-block">
          <div className="cta-inner">
            <h2>{settings.ctaHeading}</h2>
            <p>{settings.ctaBody}</p>
            <div className="hero-actions">
              <Link
                href={settings.ctaButtonHref || "/kontakt"}
                className="btn btn-primary"
              >
                {settings.ctaButtonLabel}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter brand={settings.footerBrand} />
    </div>
  );
}
