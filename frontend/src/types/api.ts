export interface ApiSuccess<T> {
  data: T;
  status: number;
  ok: true;
}

export interface ApiFailure<T> {
  data: T;
  status: number;
  ok: false;
}

export interface ApiError {
  error: string;
  code?: string;
}

export interface DefaultResponse {
  message: string;
}

export type ApiResponse<T, R = ApiError> = ApiSuccess<T> | ApiFailure<R>;

export type DefaultPromise = Promise<ApiResponse<DefaultResponse>>;

export type ResponsePromise<T> = Promise<ApiResponse<T>>;
