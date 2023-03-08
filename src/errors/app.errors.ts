export class ApplicationError extends Error {
  public message: string;

  public code = 0;

  constructor(code: number, message?: string) {
    super();
    this.code = code;
    this.message = message || '';
  }
}

export class BadRequestError extends ApplicationError {
  constructor(message: string) {
    super(400, message);
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(message?: string) {
    super(401, message);
  }
}

export class ForbiddenError extends ApplicationError {
  constructor(message?: string) {
    super(403, message);
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message?: string) {
    super(404, message);
  }
}

export class InternalError extends ApplicationError {
  constructor(message?: string) {
    super(500, message);
  }
}

export class MissingFieldError extends BadRequestError {
  constructor(fieldName: string) {
    super(`${fieldName} is missing`);
  }
}

export class FieldValidationError extends BadRequestError {
  constructor(field: string, customMessage?: string) {
    super(customMessage ? `${field} ${customMessage}` : field);
  }
}
