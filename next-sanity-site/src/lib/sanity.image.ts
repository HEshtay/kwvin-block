import type { SanityImageSource } from "@sanity/image-url";
import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "@/lib/sanity.env";

const builder = createImageUrlBuilder({
  projectId,
  dataset,
});

export function buildImageUrl(source?: SanityImageSource | null) {
  if (!source) {
    return null;
  }

  return builder.image(source);
}
