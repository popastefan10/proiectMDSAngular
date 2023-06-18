// Keep in sync with backend

import { HttpErrorResponse } from '@angular/common/http';
import { GenericResponse } from 'app/models/generic-response.model';
import { Observable, OperatorFunction, catchError, throwError } from 'rxjs';

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

// Define the generic error handler function
export const handleError = <T>(errorMessage: string = 'Something went wrong'): OperatorFunction<T, T> => {
  return (source: Observable<T>): Observable<T> => {
    return source.pipe(
      catchError((error: ErrorResponse) => {
        console.error(errorMessage, error);
        // You can perform additional error handling or transformation here if needed
        // For example, you can map the error to a custom error object or perform logging

        // Re-throw the error to propagate it to the subscriber
        return throwError(() => error);
      })
    );
  };
};
