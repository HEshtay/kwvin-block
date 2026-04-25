import { defineField, defineType } from "sanity";

export const programType = defineType({
  name: "program",
  title: "Programme",
  type: "document",
  fields: [
    defineField({
      name: "number",
      title: "Nummer",
      type: "string",
      description: 'Optional, z. B. "01"',
      validation: (rule) => rule.max(10),
    }),
    defineField({
      name: "name",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required().min(2).max(120),
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(10).max(400),
    }),
    defineField({
      name: "price",
      title: "Preis",
      type: "string",
      description: 'Z. B. "€ 649" oder "Auf Anfrage"',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "duration",
      title: "Dauer",
      type: "string",
      description: 'Z. B. "12 Wochen"',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "includes",
      title: "Leistungen",
      type: "array",
      of: [{ type: "string" }],
      description: "Aufzählungspunkte (Leistungsumfang)",
    }),
    defineField({
      name: "ctaHref",
      title: "Buchungs-Link",
      type: "string",
      description: 'Optional. Standard: "/kontakt"',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
      validation: (rule) => rule.integer().positive(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "number",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `Nr. ${subtitle}` : "Programm",
      };
    },
  },
});
