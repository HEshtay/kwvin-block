import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Über mich Seite",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "heading",
      title: "Überschrift",
      type: "string",
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "subtitle",
      title: "Untertitel",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(420),
    }),
    defineField({
      name: "journeyLabel",
      title: "Hintergrund Label",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "journeyHeading",
      title: "Hintergrund Überschrift",
      type: "string",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "journeyBody1",
      title: "Werdegang Absatz 1",
      type: "text",
      rows: 5,
      validation: (rule) => rule.max(700),
    }),
    defineField({
      name: "journeyBody2",
      title: "Werdegang Absatz 2",
      type: "text",
      rows: 5,
      validation: (rule) => rule.max(700),
    }),
    defineField({
      name: "journeyBody3",
      title: "Werdegang Absatz 3",
      type: "text",
      rows: 5,
      validation: (rule) => rule.max(700),
    }),
    defineField({
      name: "quote",
      title: "Zitat",
      type: "text",
      rows: 4,
      validation: (rule) => rule.max(350),
    }),
    defineField({
      name: "licensesHeading",
      title: "Lizenzen Überschrift",
      type: "string",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "licenses",
      title: "Lizenzen",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titel",
              type: "string",
              validation: (rule) => rule.required().max(160),
            }),
            defineField({
              name: "issuer",
              title: "Aussteller",
              type: "string",
              validation: (rule) => rule.max(160),
            }),
            defineField({
              name: "year",
              title: "Jahr",
              type: "string",
              validation: (rule) => rule.max(20),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "issuer",
            },
          },
        },
      ],
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA Überschrift",
      type: "string",
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: "ctaBody",
      title: "CTA Text",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(320),
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
      name: "footerBrand",
      title: "Footer Marke",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Über mich Seite" };
    },
  },
});
