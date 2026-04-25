import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Zitat",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().min(10).max(600),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "string",
      validation: (rule) => rule.max(160),
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
      title: "author",
      subtitle: "quote",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Ohne Autor",
        subtitle,
      };
    },
  },
});
