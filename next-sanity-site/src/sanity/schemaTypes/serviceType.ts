import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Services",
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
        subtitle: subtitle ? `Nr. ${subtitle}` : "Service",
      };
    },
  },
});
