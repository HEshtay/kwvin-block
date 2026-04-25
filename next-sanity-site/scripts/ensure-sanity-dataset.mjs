import nextEnv from "@next/env";
import { getCliClient } from "sanity/cli";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bvfl9kqv";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-24";

const writeToken =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

async function ensureDatasetExists() {
  const client = getCliClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: writeToken,
  });

  const existingDatasets = await client.datasets.list();
  const alreadyExists = existingDatasets.some((item) => item.name === dataset);

  if (alreadyExists) {
    console.log(`[sanity] Dataset "${dataset}" already exists.`);
    return;
  }

  const aclMode = process.env.SANITY_DATASET_ACL_MODE || "private";
  const isAllowedAclMode =
    aclMode === "public" || aclMode === "private" || aclMode === "custom";

  await client.datasets.create(dataset, {
    aclMode: isAllowedAclMode ? aclMode : "private",
  });

  console.log(
    `[sanity] Created dataset "${dataset}" in project "${projectId}".`,
  );
}

try {
  await ensureDatasetExists();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);

  console.warn("[sanity] Could not auto-create dataset.");
  console.warn(`[sanity] Reason: ${message}`);
  console.warn(
    "[sanity] Run `sanity login` or set SANITY_API_WRITE_TOKEN, then restart `npm run dev`.",
  );
}
