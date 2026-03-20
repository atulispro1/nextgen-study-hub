import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "3k3t106k",
  dataset: "production",
  apiVersion: "2026-03-13",
  useCdn: false
});