import { defineField, defineType } from "sanity";

export const siteChromeType = defineType({
  name: "siteChrome",
  title: "Site Chrome",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Marke",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "navAriaLabel",
      title: "ARIA Label Navigation",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "navItems",
      title: "Navigationspunkte",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "key",
              title: "Schlüssel",
              type: "string",
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              validation: (rule) => rule.required().max(200),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "navCtaLabel",
      title: "Navigation CTA Label",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "navCtaHref",
      title: "Navigation CTA Link",
      type: "string",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "footerAriaLabel",
      title: "ARIA Label Footer-Navigation",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              validation: (rule) => rule.required().max(200),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "footerCopy",
      title: "Footer Copyright",
      type: "string",
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: "socialLabel",
      title: "Social Bereich Label",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Plattform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                ],
                layout: "radio",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "url",
              validation: (rule) =>
                rule.required().uri({
                  scheme: ["http", "https"],
                }),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "platform",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Chrome" };
    },
  },
});
