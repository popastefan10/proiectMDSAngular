import { CustomError } from 'app/shared/utils/error';

export interface GenericResponse<TResponse> {
  error: CustomError;
  content: TResponse;
}
