import { apiVersion, dataset, projectId } from "@/lib/sanity.env";
import { createClient } from "next-sanity";

const readToken = process.env.SANITY_API_READ_TOKEN;
const hasUsableReadToken =
  typeof readToken === "string" &&
  readToken.length > 0 &&
  !readToken.includes("your_sanity_");

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !hasUsableReadToken,
  token: hasUsableReadToken ? readToken : undefined,
});
