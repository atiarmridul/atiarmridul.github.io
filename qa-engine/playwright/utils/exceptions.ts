export class PageLoadError extends Error {
  constructor(
    message: string,
    readonly url: string,
  ) {
    super(message);
    this.name = 'PageLoadError';
  }
}

export class LocatorHealingError extends Error {
  constructor(
    message: string,
    readonly locatorKey: string,
  ) {
    super(message);
    this.name = 'LocatorHealingError';
  }
}

export class ApiResponseError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly url: string,
  ) {
    super(message);
    this.name = 'ApiResponseError';
  }
}
