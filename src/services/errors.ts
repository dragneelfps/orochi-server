export enum AuthErrorType {
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  EMAIL_IN_USE = "EMAIL_IN_USE",
  FIELD_MISSING = "FIELD_MISSING",
}

export default class AuthError extends Error {
  constructor(public type: AuthErrorType) {
    super();
    this.message = type.toString();
  }
}
