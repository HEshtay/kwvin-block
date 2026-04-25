// src/sanity/schemaTypes/programmePageType.ts
import { defineField, defineType } from "sanity";

export const programmePageType = defineType({
  name: "programmePage",
  title: "Programme-Seite",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "heroHeading",
      title: "Überschrift",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Untertitel",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA-Überschrift",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA-Button Text",
      type: "string",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "ctaButtonHref",
      title: "CTA-Button Link",
      type: "string",
      validation: (rule) => rule.max(200),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Programme-Seite" };
    },
  },
});
