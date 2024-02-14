import { HttpException } from '@nestjs/common';

type HttpErrorOptions = {
  message?: string;
  statusCode?: number;
};

export class HttpError {
  readonly code: string;
  readonly message?: string;
  readonly statusCode: number;

  constructor(code: string, options?: HttpErrorOptions) {
    this.code = code;
    this.message = options?.message;
    this.statusCode = options?.statusCode ?? 400;

    throw new HttpException(
      { code, message: this.message, statusCode: this.statusCode },
      this.statusCode,
    );
  }
}
