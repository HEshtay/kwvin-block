import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getImpressumPageContent } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Impressum — Kevin Block",
  description:
    "Gesetzlich vorgeschriebene Anbieterkennzeichnung gemäß § 5 TMG.",
};

export default async function ImpressumPage() {
  const content = await getImpressumPageContent();

  return (
    <div className="page-shell">
      <SiteHeader active="home" />

      <main className="page-main">
        <section className="page-header-block page-header-centered">
          <div className="page-header-inner">
            <span className="eyebrow">{content.eyebrow}</span>
            <h1>{content.heading}</h1>
          </div>
        </section>

        <section className="section-block">
          <div className="prose-block">
            <h2>Angaben gemäß § 5 TMG</h2>
            <p style={{ whiteSpace: "pre-line" }}>
              {content.providerName}
              {"\n"}
              {content.providerAddress}
            </p>

            <h2>Kontakt</h2>
            <p>
              E-Mail:{" "}
              <a href={content.emailHref || "mailto:hello@kevinblock.de"}>
                {content.emailLabel}
              </a>
            </p>

            {content.ustIdNr && (
              <>
                <h2>Umsatzsteuer-ID</h2>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                  Umsatzsteuergesetz:
                  <br />
                  {content.ustIdNr}
                </p>
              </>
            )}

            {content.verantwortlich && (
              <>
                <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                <p style={{ whiteSpace: "pre-line" }}>
                  {content.verantwortlich}
                </p>
              </>
            )}

            {(content.haftungInhalte || content.haftungLinks) && (
              <h2>Haftungsausschluss</h2>
            )}

            {content.haftungInhalte && (
              <>
                <h3>Haftung für Inhalte</h3>
                <p>{content.haftungInhalte}</p>
              </>
            )}

            {content.haftungLinks && (
              <>
                <h3>Haftung für Links</h3>
                <p>{content.haftungLinks}</p>
              </>
            )}

            {content.urheberrecht && (
              <>
                <h2>Urheberrecht</h2>
                <p>{content.urheberrecht}</p>
              </>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
