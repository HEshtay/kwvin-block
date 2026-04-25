import { defineConfig } from "sanity";
import type { StructureResolver } from "sanity/structure";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/lib/sanity.env";
import { schemaTypes } from "./src/sanity/schemaTypes";

const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhalt")
    .items([
      S.listItem()
        .title("Site Chrome")
        .id("siteChrome")
        .child(S.document().schemaType("siteChrome").documentId("siteChrome")),
      S.listItem()
        .title("Startseite")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Methodenseite")
        .id("methodPage")
        .child(S.document().schemaType("methodPage").documentId("methodPage")),
      S.listItem()
        .title("Kontaktseite")
        .id("contactPage")
        .child(
          S.document().schemaType("contactPage").documentId("contactPage"),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            "siteChrome",
            "homePage",
            "methodPage",
            "contactPage",
          ].includes(item.getId() || ""),
      ),
    ]);

export default defineConfig({
  name: "default",
  title: "Kevin Block Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (item) =>
            ![
              "media.tag",
              "siteChrome",
              "homePage",
              "methodPage",
              "contactPage",
            ].includes(item.templateId),
        );
      }

      return prev;
    },
  },
  form: {
    image: {
      assetSources: (previousAssetSources) => previousAssetSources,
    },
  },
  scheduledPublishing: {
    enabled: false,
  },
  version: apiVersion,
});
