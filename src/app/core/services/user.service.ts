import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginType } from 'app/components/login/login.type';
import { GenericResponse } from 'app/models/generic-response.model';
import { SessionUser } from 'app/models/session-user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  public whoAmI(): Observable<GenericResponse<SessionUser>> {
    return this.httpClient.get<GenericResponse<SessionUser>>('/api/whoami');
  }

  public login(data: LoginType): Observable<GenericResponse<SessionUser>> {
    return this.httpClient.post<GenericResponse<SessionUser>>('/api/login', data, { withCredentials: true });
  }

  public logout(): Observable<GenericResponse<void>> {
    return this.httpClient.get<GenericResponse<void>>('/api/logout');
  }
}
