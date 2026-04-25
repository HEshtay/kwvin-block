export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getContactPageContent } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Kontakt — Kevin Block",
  description:
    "Nehmen Sie Kontakt mit Kevin Block auf und vereinbaren Sie eine persönliche Beratung.",
};

export default async function KontaktPage() {
  const content = await getContactPageContent();

  return (
    <div className="page-shell">
      <SiteHeader active="kontakt" />

      <main className="page-main">
        <section className="page-header-block page-header-centered">
          <div className="page-header-inner">
            <span className="eyebrow">{content.eyebrow}</span>
            <h1>{content.heading}</h1>
            <p className="page-subtitle">{content.subtitle}</p>
          </div>
        </section>

        <section className="section-block contact-block">
          <div className="contact-card">
            <p className="contact-copy">{content.body}</p>
            <Link
              href={content.emailHref || "mailto:hello@kevinblock.de"}
              className="btn btn-primary"
            >
              {content.emailLabel}
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
