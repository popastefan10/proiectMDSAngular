// Keep in sync with backend

import { HttpErrorResponse } from '@angular/common/http';
import { GenericResponse } from 'app/models/generic-response.model';

export const errorCodes = Object.freeze({
  other: 1,
  emailTaken: 2,
  notLoggedIn: 3,
  failedToUpload: 4,
  unAuthorized: 5,
  notFound: 6,
  noContent: 7,
  entityExists: 8
});

export interface CustomError {
  errorCode: number;
  errorMsg: string;
}

export interface ErrorResponse extends HttpErrorResponse {
  error: GenericResponse<undefined>;
}
