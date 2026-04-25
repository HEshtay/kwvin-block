import { defineField, defineType } from "sanity";

export const methodPageType = defineType({
  name: "methodPage",
  title: "Methodenseite",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
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
    }),
    defineField({
      name: "featureQuote",
      title: "Feature-Zitat",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "featureBody1",
      title: "Feature-Absatz 1",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "featureBody2",
      title: "Feature-Absatz 2",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "imageAlt", title: "Bild Alt-Text", type: "string" }),
    defineField({
      name: "ctaHeading",
      title: "CTA Überschrift",
      type: "string",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA Button Label",
      type: "string",
    }),
    defineField({
      name: "ctaButtonHref",
      title: "CTA Button Link",
      type: "string",
    }),
    defineField({ name: "ctaNote", title: "CTA Hinweis", type: "string" }),
    defineField({ name: "footerBrand", title: "Footer Marke", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Methodenseite" };
    },
  },
});
