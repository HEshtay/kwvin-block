import nextEnv from "@next/env";
import { getCliClient } from "sanity/cli";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bvfl9kqv";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-24";
const writeToken =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

const singletonDocs = [
  {
    _id: "siteChrome",
    _type: "siteChrome",
    brand: "Kevin Block",
    navAriaLabel: "Hauptnavigation",
    navItems: [
      { _key: "home", key: "home", label: "Programme", href: "/#leistungen" },
      {
        _key: "methode",
        key: "methode",
        label: "Die Methode",
        href: "/methode",
      },
      {
        _key: "about",
        key: "about",
        label: "Über mich",
        href: "/methode#ueber-mich",
      },
    ],
    navCtaLabel: "Beratung buchen",
    navCtaHref: "/kontakt",
    footerAriaLabel: "Fußnavigation",
    footerLinks: [
      { _key: "footer-methode", label: "Methode", href: "/methode" },
      { _key: "footer-kontakt", label: "Kontakt", href: "/kontakt" },
    ],
    footerCopy: "© 2026 Kevin Block. Alle Rechte vorbehalten.",
  },
  {
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: "Performance Coaching",
    heroHeading: "Die Architektur menschlicher Leistung neu definiert.",
    heroSubtitle:
      "Maßgeschneidertes athletisches Coaching für anspruchsvolle Klienten, die Präzision in jeder Bewegung verlangen.",
    featureBody1:
      "The Editorial Athlete unter der Leitung von Kevin Block repräsentiert die Konvergenz von High-Level-Sportwissenschaft und raffiniertem Lifestyle-Management. Wir glauben, dass das Streben nach körperlicher Exzellenz nicht isoliert von dem ästhetischen und intellektuellen Leben eines Menschen existieren sollte.",
    featureBody2:
      "Unser Prozess beginnt mit einer umfassenden biomechanischen und metabolischen Analyse, gefolgt von der Kuration eines maßgeschneiderten Protokolls, das sich nahtlos in einen anspruchsvollen, globalen Zeitplan integriert.",
    ctaHeading: "Bereit zu beginnen?",
    ctaButtonLabel: "Beratung buchen",
    ctaButtonHref: "/kontakt",
    ctaNote: "Private Aufnahme nur auf Anfrage",
    featureImageAlt: "Monochrome Editorial-Darstellung eines Athleten",
  },
  {
    _id: "methodPage",
    _type: "methodPage",
    eyebrow: "Ansatz",
    heading: "Die Methode",
    subtitle:
      "Eine Studie in der Architektur der Leistung, wo Disziplin auf ästhetische Raffinesse trifft.",
    featureQuote:
      "Leistung ist nicht bloß ein Ergebnis; es ist ein akribisch gestalteter Seinszustand, der sowohl Strenge als auch Anmut erfordert.",
    featureBody1:
      "The Editorial Athlete unter der Leitung von Kevin Block repräsentiert die Konvergenz von High-Level-Sportwissenschaft und raffiniertem Lifestyle-Management. Wir glauben, dass das Streben nach körperlicher Exzellenz nicht isoliert von den ästhetischen und intellektuellen Leben eines Menschen existieren sollte.",
    featureBody2:
      "Unser Prozess beginnt mit einer umfassenden biomechanischen und metabolischen Analyse, gefolgt von der Kuration eines maßgeschneiderten Protokolls, das sich nahtlos in einen anspruchsvollen, globalen Zeitplan integriert.",
    imageAlt: "Monochrome Editorial-Darstellung eines Trainingsraums",
    ctaHeading: "Bereit zu beginnen?",
    ctaButtonLabel: "Konsultation buchen",
    ctaButtonHref: "/kontakt",
    ctaNote: "Private Aufnahme nur auf Anfrage",
    footerBrand: "The Editorial Athlete",
  },
  {
    _id: "contactPage",
    _type: "contactPage",
    eyebrow: "Kontakt",
    heading: "Beginnen wir das Gespräch.",
    subtitle:
      "Jede Zusammenarbeit beginnt mit einer stillen, präzisen Analyse Ihrer Ziele. Schreiben Sie mir, und wir definieren den nächsten Schritt gemeinsam.",
    body: "Für Anfragen zu Personal Training, Performance Coaching oder einer individuellen Beratung erreichen Sie mich direkt per E-Mail.",
    emailLabel: "hello@kevinblock.de",
    emailHref: "mailto:hello@kevinblock.de",
  },
];

const serviceDocs = [
  {
    _id: "service-metabolische-konditionierung",
    _type: "service",
    number: "01",
    name: "Metabolische Konditionierung",
    description:
      "Ein wissenschaftlich fundierter Ansatz zur kardiovaskulären Gesundheit, entwickelt zur Optimierung der Sauerstoffnutzung und metabolischen Flexibilität durch variable Intensitäten.",
    order: 1,
  },
  {
    _id: "service-strukturelle-integritaet",
    _type: "service",
    number: "02",
    name: "Strukturelle Integrität",
    description:
      "Fokus auf biomechanische Ausrichtung und funktionelle Kraft, um einen Körper zu formen, der ebenso belastbar wie ästhetisch verfeinert ist.",
    order: 2,
  },
  {
    _id: "service-restorative-biohacking",
    _type: "service",
    number: "03",
    name: "Restorative Biohacking",
    description:
      "Elite-Erholungsprotokolle, die Atemarbeit, Mobilität und Heil-Kalt-Therapie integrieren, um täglich absolute Spitzenleistungen zu gewährleisten.",
    order: 3,
  },
];

const testimonialDocs = [
  {
    _id: "testimonial-julia-voss",
    _type: "testimonial",
    quote:
      "Bei Kevin Block geht es nicht nur um Training; es ist eine fundamentale Veränderung darin, wie ich meinen eigenen Körper bewohne. Die Detailtiefe und Sorgfalt sind in dieser Branche beispiellos.",
    author: "Julia Voss, Creative Director",
    order: 1,
  },
  {
    _id: "testimonial-clara-sellen",
    _type: "testimonial",
    quote:
      "Ein klinischer Ansatz, vermittelt mit poetischer Anmut. Meine athletische Leistung war noch nie so konstant und nachhaltig.",
    author: "Clara Sellen, Architektin",
    order: 2,
  },
];

const methodPillarDocs = [
  {
    _id: "method-pillar-bewegung",
    _type: "methodPillar",
    number: "01",
    name: "Bewegung",
    description:
      "Kinetische Präzision als Fundament der Vitalität. Wir betrachten Training durch das Prisma der Langlebigkeit und biomechanischen Optimierung sowie progressive Belastung, um ein belastbares, funktionales Gerüst aufzubauen.",
    order: 1,
  },
  {
    _id: "method-pillar-ernaehrung",
    _type: "methodPillar",
    number: "02",
    name: "Ernährung",
    description:
      "Energievorsorgung als bewusster Akt der Kuration. Unser metabolischer Rahmen priorisiert hochdichte Mikronährstoffe und nachhaltige Energiesysteme, konzipiert für die anspruchsvollen Anforderungen von Hochleistung.",
    order: 2,
  },
  {
    _id: "method-pillar-mindset",
    _type: "methodPillar",
    number: "03",
    name: "Mindset",
    description:
      "Die kognitive Landschaft, in der Meisterschaft geschmiedet wird. Wir integrieren mentale Trainings- und Regulationssysteme, um sicherzustellen, dass der Athlet gelassen, fokussiert und zutiefst präsent bleibt.",
    order: 3,
  },
];

async function seedContent() {
  const client = getCliClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: writeToken,
  });

  const tx = client.transaction();

  for (const doc of singletonDocs) {
    tx.createIfNotExists(doc);
  }

  for (const doc of [...serviceDocs, ...testimonialDocs, ...methodPillarDocs]) {
    tx.createIfNotExists(doc);
  }

  await tx.commit();

  console.log(`[sanity] Seeded initial content for dataset "${dataset}".`);
}

try {
  await seedContent();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);

  console.warn("[sanity] Could not seed initial content.");
  console.warn(`[sanity] Reason: ${message}`);
  console.warn(
    "[sanity] Set SANITY_API_WRITE_TOKEN (or run `sanity login`) and rerun startup.",
  );
}
