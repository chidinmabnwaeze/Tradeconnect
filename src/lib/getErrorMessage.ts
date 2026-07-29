import { AxiosError } from "axios";

/**
 * Unwraps an API error into a single display-ready string, in priority order:
 * field-level validation errors, then a top-level message, then a network
 * fallback, then a generic fallback. Never returns an object, so it's always
 * safe to render directly in JSX.
 */
export function getErrorMessage(error: unknown): string {
  const fallback = "Something went wrong. Please try again.";

  if (!(error instanceof AxiosError)) {
    return fallback;
  }

  const validationErrors = error.response?.data?.errors as
    | Record<string, string[]>
    | undefined;
  const firstValidationMessage = validationErrors
    ? Object.values(validationErrors)[0]?.[0]
    : undefined;
  if (firstValidationMessage) {
    return firstValidationMessage;
  }

  const message = error.response?.data?.message as string | undefined;
  if (message) {
    return message;
  }

  if (error.request && !error.response) {
    return "Network error — check your connection and try again.";
  }

  return fallback;
}
