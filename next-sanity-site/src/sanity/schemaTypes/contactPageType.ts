import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Kontaktseite",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Überschrift", type: "string" }),
    defineField({
      name: "subtitle",
      title: "Untertitel",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "body", title: "Text", type: "text", rows: 3 }),
    defineField({ name: "emailLabel", title: "E-Mail Label", type: "string" }),
    defineField({ name: "emailHref", title: "E-Mail Link", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Kontaktseite" };
    },
  },
});
