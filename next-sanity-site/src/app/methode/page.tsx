export const revalidate = 60;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getMethodContent } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Die Methode — Kevin Block",
  description:
    "Die editoriale Methode von Kevin Block: Bewegung, Ernährung und Mindset als kuratierte Architektur der Leistung.",
};

export default async function MethodePage() {
  const { settings, pillars } = await getMethodContent();

  return (
    <div className="page-shell">
      <SiteHeader active="methode" />

      <main className="page-main">
        <section className="page-header-block page-header-centered">
          <div className="page-header-inner">
            <span className="eyebrow">{settings.eyebrow}</span>
            <h1>{settings.heading}</h1>
            <p className="page-subtitle">{settings.subtitle}</p>
            <div className="vertical-divider" aria-hidden="true" />
          </div>
        </section>

        <section className="section-block home-services">
          <div className="section-inner">
            <div className="services-grid pillars-grid">
              {pillars.map((pillar, index) => (
                <article key={pillar._id} className="service-card pillar-card">
                  <div className="pillar-number">
                    {pillar.number || String(index + 1).padStart(2, "0")}
                  </div>
                  <h2 className="pillar-heading">{pillar.name}</h2>
                  <p className="pillar-description">{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block feature-block">
          <div className="section-inner feature-split">
            <figure
              className="editorial-figure"
              aria-label="Die Methode Illustration"
            >
              <Image
                src="/editorial-method-scene.svg"
                alt={
                  settings.imageAlt ||
                  "Monochrome Editorial-Darstellung eines Trainingsraums"
                }
                width={920}
                height={1120}
              />
            </figure>

            <div className="feature-body">
              <blockquote className="feature-quote">
                “{settings.featureQuote}”
              </blockquote>
              <p>{settings.featureBody1}</p>
              <p>{settings.featureBody2}</p>
            </div>
          </div>
        </section>

        <section className="section-block cta-block">
          <div className="cta-inner">
            <h2>{settings.ctaHeading}</h2>
            <div className="hero-actions">
              <Link
                href={settings.ctaButtonHref || "/kontakt"}
                className="btn btn-primary"
              >
                {settings.ctaButtonLabel}
              </Link>
            </div>
            <p className="cta-note small-caps">{settings.ctaNote}</p>
          </div>
        </section>
      </main>

      <SiteFooter brand={settings.footerBrand} />
    </div>
  );
}
