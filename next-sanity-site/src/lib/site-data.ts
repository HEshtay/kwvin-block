import { sanityClient } from "@/lib/sanity.client";
import {
  contactPageQuery,
  homePageQuery,
  methodPageQuery,
  methodPillarsQuery,
  programmePageQuery,
  programsQuery,
  servicesQuery,
  siteChromeQuery,
  testimonialsQuery,
  type ContactPageSettings,
  type HomePageSettings,
  type MethodPageSettings,
  type MethodPillar,
  type Program,
  type ProgrammePageSettings,
  type Service,
  type SiteChromeSettings,
  type Testimonial,
} from "@/lib/sanity.queries";

const fallbackServices: Service[] = [
  {
    _id: "fallback-service-1",
    number: "01",
    name: "Metabolische Konditionierung",
    description:
      "Ein wissenschaftlich fundierter Ansatz zur kardiovaskulären Gesundheit, entwickelt zur Optimierung der Sauerstoffnutzung und metabolischen Flexibilität durch variable Intensitäten.",
    order: 1,
  },
  {
    _id: "fallback-service-2",
    number: "02",
    name: "Strukturelle Integrität",
    description:
      "Fokus auf biomechanische Ausrichtung und funktionelle Kraft, um einen Körper zu formen, der ebenso belastbar wie ästhetisch verfeinert ist.",
    order: 2,
  },
  {
    _id: "fallback-service-3",
    number: "03",
    name: "Restorative Biohacking",
    description:
      "Elite-Erholungsprotokolle, die Atemarbeit, Mobilität und Heil-Kalt-Therapie integrieren, um täglich absolute Spitzenleistungen zu gewährleisten.",
    order: 3,
  },
];

const fallbackTestimonials: Testimonial[] = [
  {
    _id: "fallback-testimonial-1",
    quote:
      "Bei Kevin Block geht es nicht nur um Training; es ist eine fundamentale Veränderung darin, wie ich meinen eigenen Körper bewohne. Die Detailtiefe und Sorgfalt sind in dieser Branche beispiellos.",
    author: "Julia Voss, Creative Director",
    order: 1,
  },
  {
    _id: "fallback-testimonial-2",
    quote:
      "Ein klinischer Ansatz, vermittelt mit poetischer Anmut. Meine athletische Leistung war noch nie so konstant und nachhaltig.",
    author: "Clara Sellen, Architektin",
    order: 2,
  },
];

const fallbackPillars: MethodPillar[] = [
  {
    _id: "fallback-pillar-1",
    number: "01",
    name: "Bewegung",
    description:
      "Kinetische Präzision als Fundament der Vitalität. Wir betrachten Training durch das Prisma der Langlebigkeit und biomechanischen Optimierung sowie progressive Belastung, um ein belastbares, funktionales Gerüst aufzubauen.",
    order: 1,
  },
  {
    _id: "fallback-pillar-2",
    number: "02",
    name: "Ernährung",
    description:
      "Energievorsorgung als bewusster Akt der Kuration. Unser metabolischer Rahmen priorisiert hochdichte Mikronährstoffe und nachhaltige Energiesysteme, konzipiert für die anspruchsvollen Anforderungen von Hochleistung.",
    order: 2,
  },
  {
    _id: "fallback-pillar-3",
    number: "03",
    name: "Mindset",
    description:
      "Die kognitive Landschaft, in der Meisterschaft geschmiedet wird. Wir integrieren mentale Trainings- und Regulationssysteme, um sicherzustellen, dass der Athlet gelassen, fokussiert und zutiefst präsent bleibt.",
    order: 3,
  },
];

async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  try {
    const result = await sanityClient.fetch<T>(query);

    if (Array.isArray(result) && result.length === 0) {
      return fallback;
    }

    if (result === null || result === undefined) {
      return fallback;
    }

    return result;
  } catch {
    return fallback;
  }
}

const fallbackHomePageSettings: HomePageSettings = {
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
};

const fallbackSiteChromeSettings: SiteChromeSettings = {
  brand: "Kevin Block",
  navAriaLabel: "Hauptnavigation",
  navItems: [
    { key: "programme", href: "/programme", label: "Programme" },
    { key: "methode", href: "/methode", label: "Die Methode" },
    { key: "about", href: "/methode#ueber-mich", label: "Über mich" },
  ],
  navCtaLabel: "Beratung buchen",
  navCtaHref: "/kontakt",
  footerAriaLabel: "Fußnavigation",
  footerLinks: [
    { href: "/methode", label: "Methode" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  footerCopy: "© 2026 Kevin Block. Alle Rechte vorbehalten.",
};

const fallbackMethodPageSettings: MethodPageSettings = {
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
};

const fallbackContactPageSettings: ContactPageSettings = {
  eyebrow: "Kontakt",
  heading: "Beginnen wir das Gespräch.",
  subtitle:
    "Jede Zusammenarbeit beginnt mit einer stillen, präzisen Analyse Ihrer Ziele. Schreiben Sie mir, und wir definieren den nächsten Schritt gemeinsam.",
  body: "Für Anfragen zu Personal Training, Performance Coaching oder einer individuellen Beratung erreichen Sie mich direkt per E-Mail.",
  emailLabel: "hello@kevinblock.de",
  emailHref: "mailto:hello@kevinblock.de",
};

const fallbackPrograms: Program[] = [
  {
    _id: "fallback-program-1",
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
    _id: "fallback-program-2",
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
    _id: "fallback-program-3",
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

const fallbackProgrammePageSettings: ProgrammePageSettings = {
  heroEyebrow: "Programme",
  heroHeading: "Strukturiert. Individuell. Wirksam.",
  heroSubtitle:
    "Drei Programme — jedes auf ein klares Ziel ausgerichtet. Wähle das, das zu dir passt.",
  ctaHeading: "Nicht sicher, welches Programm passt?",
  ctaButtonLabel: "Kostenlose Beratung buchen",
  ctaButtonHref: "/kontakt",
};

export async function getHomeContent() {
  const [settings, services, testimonials] = await Promise.all([
    safeFetch<HomePageSettings>(homePageQuery, fallbackHomePageSettings),
    safeFetch<Service[]>(servicesQuery, fallbackServices),
    safeFetch<Testimonial[]>(testimonialsQuery, fallbackTestimonials),
  ]);

  return { settings, services, testimonials };
}

export async function getMethodContent() {
  const [settings, pillars] = await Promise.all([
    safeFetch<MethodPageSettings>(methodPageQuery, fallbackMethodPageSettings),
    safeFetch<MethodPillar[]>(methodPillarsQuery, fallbackPillars),
  ]);

  return { settings, pillars };
}

export async function getContactPageContent() {
  return safeFetch<ContactPageSettings>(
    contactPageQuery,
    fallbackContactPageSettings,
  );
}

export async function getSiteChromeContent() {
  return safeFetch<SiteChromeSettings>(
    siteChromeQuery,
    fallbackSiteChromeSettings,
  );
}

export async function getProgrammeContent() {
  const [settings, programs] = await Promise.all([
    safeFetch<ProgrammePageSettings>(
      programmePageQuery,
      fallbackProgrammePageSettings,
    ),
    safeFetch<Program[]>(programsQuery, fallbackPrograms),
  ]);

  return { settings, programs };
}
