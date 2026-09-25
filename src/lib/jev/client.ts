import "server-only";

import { TypeSafeClient } from "@typesafe-ai/sdk";

let client: TypeSafeClient | undefined;

/**
 * Jev is enabled only when an API key is present on the server. The key is
 * never sent to the browser; all calls go through Server Actions.
 */
export function isJevConfigured() {
  return Boolean(process.env.TYPESAFE_API_KEY?.trim());
}

export function getJevClient() {
  if (!isJevConfigured()) {
    return null;
  }

  client ??= new TypeSafeClient({
    timeout: 10_000,
    retry: { maxRetries: 1 },
  });

  return client;
}
