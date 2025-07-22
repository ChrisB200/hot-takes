// AppError.ts

class AppError extends Error {
  public status: number;
  public code?: string;

  constructor(message: string, status = 500, code?: string) {
    super(message);

    // Set the prototype explicitly for TS to understand inheritance
    Object.setPrototypeOf(this, AppError.prototype);

    this.status = status;
    this.code = code;

    // Maintains proper stack trace (only available on V8 engines)
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export default AppError;
