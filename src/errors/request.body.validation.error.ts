import { FieldValidationError, ValidationError } from "express-validator";

class RequestBodyValidationError extends Error {
  bodyFieldName?: string;
  statusCode: number;

  constructor(err?: ValidationError, message?: string) {
    super((err as FieldValidationError)?.msg || message || "Validation failed");
    this.name = "RequestBodyValidationError";
    this.statusCode = 400;
    if (err && err.type === "field") {
      this.bodyFieldName = (err as FieldValidationError).path;
    }
  }
}

export { RequestBodyValidationError };
