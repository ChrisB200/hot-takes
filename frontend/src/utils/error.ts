import type { ApiError, ApiFailure } from "@/types/api";
import axios from "axios";

export function handleError(error: unknown): ApiFailure<ApiError> {
  if (axios.isAxiosError(error)) {
    return {
      data: {
        error: error.response?.data?.error || "Unknown API error",
        code: error.response?.data?.code || "UNKNOWN_ERROR",
      },
      status: error.response?.status || 500,
      ok: false,
    };
  }

  return {
    data: { error: "Unexpected error", code: "INTERNAL_SERVER" },
    status: 500,
    ok: false,
  };
}

export function isApiError(response: any): response is ApiError {
  return response && typeof response.error === "string";
}
