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
      { _key: "home", key: "home", label: "Programme", href: "/programme" },
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
        href: "/ueber-mich",
      },
    ],
    navCtaLabel: "Beratung buchen",
    navCtaHref: "/kontakt",
    footerAriaLabel: "Fußnavigation",
    footerLinks: [
      { _key: "footer-programme", label: "Programme", href: "/programme" },
      { _key: "footer-methode", label: "Methode", href: "/methode" },
      { _key: "footer-kontakt", label: "Kontakt", href: "/kontakt" },
      { _key: "footer-impressum", label: "Impressum", href: "/impressum" },
    ],
    footerCopy: "© 2026 Kevin Block. Alle Rechte vorbehalten.",
    socialLabel: "Follow",
    socialLinks: [
      {
        _key: "social-instagram",
        platform: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/",
      },
      {
        _key: "social-youtube",
        platform: "youtube",
        label: "YouTube",
        href: "https://www.youtube.com/",
      },
    ],
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
    _id: "aboutPage",
    _type: "aboutPage",
    eyebrow: "Über mich",
    heading: "Kevin Block",
    subtitle:
      "Architekt der Performance. Mein Ansatz vereint sportwissenschaftliche Präzision mit der Ästhetik eines ganzheitlichen Lebensstils.",
    journeyLabel: "Hintergrund",
    journeyHeading: "Mein Weg",
    journeyBody1:
      "Geboren in einer Welt des Leistungssports, erkannte ich früh, dass wahre Stärke nicht durch Lautstärke, sondern durch Präzision und Beständigkeit definiert wird. Meine Karriere begann auf dem Spielfeld, doch mein Interesse galt stets der Architektur hinter der menschlichen Leistungsfähigkeit.",
    journeyBody2:
      "Nach Jahren der Arbeit mit Elite-Athleten und führenden Köpfen der Wirtschaft habe ich die Editorial Athlete Methode entwickelt: ein System, das sich vor herkömmlichen Fitness-Trends abwendet und stattdessen auf Langlebigkeit, Ästhetik und kognitive Klarheit setzt.",
    journeyBody3:
      "In meiner Arbeit als Mentor und Coach betrachte ich den Körper nicht als Werkzeug, sondern als ein fein abgestimmtes Ökosystem. Jede Bewegung, jede Mahlzeit und jeder Moment der Regeneration ist ein bewusster Akt der Gestaltung.",
    quote:
      "Die Qualität deines Lebens wird durch die Qualität deiner Bewegungen bestimmt.",
    licensesHeading: "Lizenzen & Qualifikationen",
    licenses: [
      {
        _key: "license-1",
        title: "A-Lizenz Personal Training",
        issuer: "Deutsche Trainer Akademie",
        year: "2023",
      },
      {
        _key: "license-2",
        title: "Ernährungscoach Leistungssport",
        issuer: "Institut für Sporternährung",
        year: "2022",
      },
    ],
    ctaHeading: "Bereit für Ihre Transformation?",
    ctaBody:
      "Exklusivität beginnt mit einem ersten Gespräch. Lassen Sie uns gemeinsam den Grundstein für Ihre neue Performance-Architektur legen.",
    ctaButtonLabel: "Termin vereinbaren",
    ctaButtonHref: "/kontakt",
    footerBrand: "Kevin Block",
  },
  {
    _id: "impressumPage",
    _type: "impressumPage",
    eyebrow: "Rechtliches",
    heading: "Impressum",
    providerName: "Kevin Block",
    providerAddress: "Musterstra\u00dfe 1\n10115 Berlin\nDeutschland",
    emailLabel: "hello@kevinblock.de",
    emailHref: "mailto:hello@kevinblock.de",
    ustIdNr: "DE000000000",
    verantwortlich: "Kevin Block\nMusterstra\u00dfe 1\n10115 Berlin",
    haftungInhalte:
      "Als Diensteanbieter sind wir gem\u00e4\u00df \u00a7 7 Abs. 1 TMG f\u00fcr eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach \u00a7\u00a7 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, \u00fcbermittelte oder gespeicherte fremde Informationen zu \u00fcberwachen oder nach Umst\u00e4nden zu forschen, die auf eine rechtswidrige T\u00e4tigkeit hinweisen.",
    haftungLinks:
      "Unser Angebot enth\u00e4lt Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb k\u00f6nnen wir f\u00fcr diese fremden Inhalte auch keine Gew\u00e4hr \u00fcbernehmen. F\u00fcr die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
    urheberrecht:
      "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielf\u00e4ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung au\u00dferhalb der Grenzen des Urheberrechtes bed\u00fcrfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
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
  {
    _id: "programmePage",
    _type: "programmePage",
    heroEyebrow: "Programme",
    heroHeading: "Strukturiert. Individuell. Wirksam.",
    heroSubtitle:
      "Drei Programme — jedes auf ein klares Ziel ausgerichtet. Wähle das, das zu dir passt.",
    ctaHeading: "Nicht sicher, welches Programm passt?",
    ctaButtonLabel: "Kostenlose Beratung buchen",
    ctaButtonHref: "/kontakt",
  },
];

const programDocs = [
  {
    _id: "program-strength-foundation",
    _type: "program",
    number: "01",
    name: "Strength Foundation",
    description:
      "Aufbau von Grundkraft und Körperstruktur. Ideal für Einsteiger und Wiedereinsteiger, die systematisch Fortschritte erzielen wollen.",
    price: "€ 649",
    duration: "12 Wochen",
    includes: [
      "Individueller Trainingsplan",
      "Ernährungsleitfaden",
      "2× Check-in pro Woche",
      "Video-Analyse der Ausführung",
    ],
    ctaHref: "/kontakt",
    order: 1,
  },
  {
    _id: "program-performance-block",
    _type: "program",
    number: "02",
    name: "Performance Block",
    description:
      "Für Fortgeschrittene, die gezielt an Leistungsgrenzen arbeiten — Athletik, Kondition und mentale Stärke kombiniert.",
    price: "€ 899",
    duration: "12 Wochen",
    includes: [
      "Athletik- und Kraftplan",
      "Ernährungsstrategie",
      "3× Check-in pro Woche",
      "Video-Analyse",
      "Performance-Tracking",
    ],
    ctaHref: "/kontakt",
    order: 2,
  },
  {
    _id: "program-editorial-athlete",
    _type: "program",
    number: "03",
    name: "Editorial Athlete",
    description:
      "Das Rundum-Paket für ambitionierte Klienten, die Körper, Geist und Leistung ganzheitlich entwickeln wollen.",
    price: "€ 1.799",
    duration: "24 Wochen",
    includes: [
      "Vollständige 1:1-Betreuung",
      "Ernährungs- und Lifestyle-Plan",
      "Täglicher Support",
      "Wöchentliche Video-Calls",
      "Video-Analyse",
      "Priority Access",
    ],
    ctaHref: "/kontakt",
    order: 3,
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

async function syncContent() {
  const client = getCliClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: writeToken,
  });

  const tx = client.transaction();

  for (const doc of [
    ...singletonDocs,
    ...serviceDocs,
    ...testimonialDocs,
    ...methodPillarDocs,
    ...programDocs,
  ]) {
    tx.createOrReplace(doc);
  }

  await tx.commit();

  console.log(`[sanity] Synced content to dataset "${dataset}".`);
}

try {
  await syncContent();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);

  console.warn("[sanity] Could not sync content.");
  console.warn(`[sanity] Reason: ${message}`);
  console.warn(
    "[sanity] Set SANITY_API_WRITE_TOKEN (or run `sanity login`) and rerun.",
  );
}
