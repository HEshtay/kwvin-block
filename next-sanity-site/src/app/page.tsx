export const revalidate = 60;

import Image from "next/image";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getHomeContent } from "@/lib/site-data";

export default async function Home() {
  const { settings, services, testimonials } = await getHomeContent();
  const featuredTestimonial = testimonials[0];

  return (
    <div className="page-shell">
      <SiteHeader active="home" />

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

        <section className="section-block home-services" id="leistungen">
          <div className="section-inner">
            <div className="services-grid pillars-grid">
              {services.map((service, index) => (
                <article key={service._id} className="service-card pillar-card">
                  <div className="service-number pillar-number">
                    {service.number || String(index + 1).padStart(2, "0")}
                  </div>
                  <h2 className="service-heading pillar-heading">
                    {service.name}
                  </h2>
                  <p className="service-description pillar-description">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block feature-block" id="ueber-mich">
          <div className="section-inner feature-split">
            <figure className="editorial-figure" aria-label="Editorial Athlete">
              <Image
                src="/editorial-athlete-hero.svg"
                alt={
                  settings.featureImageAlt ||
                  "Monochrome Editorial-Darstellung eines Athleten"
                }
                width={920}
                height={1120}
                priority
              />
            </figure>

            <div className="feature-body">
              {featuredTestimonial && (
                <blockquote className="feature-quote">
                  &ldquo;{featuredTestimonial.quote}&rdquo;
                </blockquote>
              )}
              {settings.featureBody1 && <p>{settings.featureBody1}</p>}
              {settings.featureBody2 && <p>{settings.featureBody2}</p>}
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
                {settings.ctaButtonLabel || "Beratung buchen"}
              </Link>
            </div>
            {settings.ctaNote && (
              <p className="cta-note small-caps">{settings.ctaNote}</p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
