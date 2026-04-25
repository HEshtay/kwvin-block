import { defineField, defineType } from "sanity";

export const impressumPageType = defineType({
  name: "impressumPage",
  title: "Impressum",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Überschrift", type: "string" }),
    defineField({ name: "providerName", title: "Name", type: "string" }),
    defineField({
      name: "providerAddress",
      title: "Adresse",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "emailLabel", title: "E-Mail Label", type: "string" }),
    defineField({ name: "emailHref", title: "E-Mail Link", type: "string" }),
    defineField({ name: "ustIdNr", title: "Umsatzsteuer-ID", type: "string" }),
    defineField({
      name: "verantwortlich",
      title: "Verantwortlich für den Inhalt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "haftungInhalte",
      title: "Haftung für Inhalte",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "haftungLinks",
      title: "Haftung für Links",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "urheberrecht",
      title: "Urheberrecht",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Impressum" };
    },
  },
});
