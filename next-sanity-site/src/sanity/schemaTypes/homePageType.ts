import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Startseite",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Überschrift",
      type: "string",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Untertitel",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "featureBody1",
      title: "Feature-Bereich Absatz 1",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "featureBody2",
      title: "Feature-Bereich Absatz 2",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA Überschrift",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA Button Label",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "ctaButtonHref",
      title: "CTA Button Link",
      type: "string",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "ctaNote",
      title: "CTA Hinweis",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "featureImageAlt",
      title: "Feature Bild Alt-Text",
      type: "string",
      validation: (rule) => rule.max(200),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Startseite" };
    },
  },
});
