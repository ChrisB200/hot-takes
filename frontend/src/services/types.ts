import type { ApiError } from "@/types/api";

export type ServiceSuccess = Promise<"success" | ApiError>;

export type ServiceResult<T> = Promise<T | ApiError>;
