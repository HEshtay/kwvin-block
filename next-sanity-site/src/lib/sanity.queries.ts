import groq from "groq";

export type Service = {
  _id: string;
  name: string;
  number?: string;
  description?: string;
  order?: number;
};

export type Testimonial = {
  _id: string;
  quote: string;
  author?: string;
  order?: number;
};

export type MethodPillar = {
  _id: string;
  name: string;
  number?: string;
  description?: string;
  order?: number;
};

export const servicesQuery = groq`
  *[_type in ["service", "services"]] | order(coalesce(order, 999) asc) {
    _id,
    name,
    number,
    description,
    order
  }
`;

export const testimonialsQuery = groq`
  *[_type in ["testimonial", "testimonials"]] | order(coalesce(order, 999) asc) {
    _id,
    quote,
    author,
    order
  }
`;

export const methodPillarsQuery = groq`
  *[_type == "methodPillar"] | order(coalesce(order, 999) asc) {
    _id,
    name,
    number,
    description,
    order
  }
`;

export type HomePageSettings = {
  heroEyebrow?: string;
  heroHeading?: string;
  heroSubtitle?: string;
  featureBody1?: string;
  featureBody2?: string;
  ctaHeading?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
  ctaNote?: string;
  featureImageAlt?: string;
};

export type SiteLink = {
  key?: string;
  label: string;
  href: string;
};

export type SocialLink = {
  platform: "instagram" | "youtube";
  label: string;
  href: string;
};

export type SiteChromeSettings = {
  brand?: string;
  navAriaLabel?: string;
  navItems?: SiteLink[];
  navCtaLabel?: string;
  navCtaHref?: string;
  footerAriaLabel?: string;
  footerLinks?: SiteLink[];
  footerCopy?: string;
  socialLabel?: string;
  socialLinks?: SocialLink[];
};

export type MethodPageSettings = {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  featureQuote?: string;
  featureBody1?: string;
  featureBody2?: string;
  imageAlt?: string;
  ctaHeading?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
  ctaNote?: string;
  footerBrand?: string;
};

export type ContactPageSettings = {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  body?: string;
  emailLabel?: string;
  emailHref?: string;
};

export type AboutLicense = {
  title: string;
  issuer?: string;
  year?: string;
};

export type AboutPageSettings = {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  journeyLabel?: string;
  journeyHeading?: string;
  journeyBody1?: string;
  journeyBody2?: string;
  journeyBody3?: string;
  quote?: string;
  licensesHeading?: string;
  licenses?: AboutLicense[];
  ctaHeading?: string;
  ctaBody?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
  footerBrand?: string;
};

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroEyebrow,
    heroHeading,
    heroSubtitle,
    featureBody1,
    featureBody2,
    ctaHeading,
    ctaButtonLabel,
    ctaButtonHref,
    ctaNote,
    featureImageAlt
  }
`;

export const siteChromeQuery = groq`
  *[_type == "siteChrome"][0] {
    brand,
    navAriaLabel,
    navItems[]{
      key,
      label,
      href
    },
    navCtaLabel,
    navCtaHref,
    footerAriaLabel,
    footerLinks[]{
      label,
      href
    },
    footerCopy,
    socialLabel,
    socialLinks[]{
      platform,
      label,
      href
    }
  }
`;

export const methodPageQuery = groq`
  *[_type == "methodPage"][0] {
    eyebrow,
    heading,
    subtitle,
    featureQuote,
    featureBody1,
    featureBody2,
    imageAlt,
    ctaHeading,
    ctaButtonLabel,
    ctaButtonHref,
    ctaNote,
    footerBrand
  }
`;

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    eyebrow,
    heading,
    subtitle,
    body,
    emailLabel,
    emailHref
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    eyebrow,
    heading,
    subtitle,
    journeyLabel,
    journeyHeading,
    journeyBody1,
    journeyBody2,
    journeyBody3,
    quote,
    licensesHeading,
    licenses[]{
      title,
      issuer,
      year
    },
    ctaHeading,
    ctaBody,
    ctaButtonLabel,
    ctaButtonHref,
    footerBrand
  }
`;

export type Program = {
  _id: string;
  number?: string;
  name: string;
  description?: string;
  price?: string;
  duration?: string;
  includes?: string[];
  ctaHref?: string;
  order?: number;
};

export type ProgrammePageSettings = {
  heroEyebrow?: string;
  heroHeading?: string;
  heroSubtitle?: string;
  ctaHeading?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
};

export const programsQuery = groq`
  *[_type == "program"] | order(coalesce(order, 999) asc) {
    _id,
    name,
    number,
    description,
    price,
    duration,
    includes,
    ctaHref,
    order
  }
`;

export const programmePageQuery = groq`
  *[_type == "programmePage"][0] {
    heroEyebrow,
    heroHeading,
    heroSubtitle,
    ctaHeading,
    ctaButtonLabel,
    ctaButtonHref
  }
`;

export type ImpressumPageSettings = {
  eyebrow?: string;
  heading?: string;
  providerName?: string;
  providerAddress?: string;
  emailLabel?: string;
  emailHref?: string;
  ustIdNr?: string;
  verantwortlich?: string;
  haftungInhalte?: string;
  haftungLinks?: string;
  urheberrecht?: string;
};

export const impressumPageQuery = groq`
  *[_type == "impressumPage"][0] {
    eyebrow,
    heading,
    providerName,
    providerAddress,
    emailLabel,
    emailHref,
    ustIdNr,
    verantwortlich,
    haftungInhalte,
    haftungLinks,
    urheberrecht
  }
`;
