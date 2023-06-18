import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginType } from 'app/components/login/login.type';
import { RegisterType } from 'app/components/register/register.type';
import { GenericResponse } from 'app/models/generic-response.model';
import { SessionUser } from 'app/models/session-user.model';
import { handleError } from 'app/shared/utils/error';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly currentUserSubject: BehaviorSubject<SessionUser | undefined> = new BehaviorSubject<
    SessionUser | undefined
  >(undefined);
  public readonly currentUser$: Observable<SessionUser | undefined> = this.currentUserSubject;

  public readonly isLoggedIn$: Observable<boolean> = this.currentUser$.pipe(map((user) => !!user));

  constructor(private readonly httpClient: HttpClient) {
    this.whoAmI()
      .pipe(
        tap((res) => this.currentUserSubject.next(res?.content)),
        handleError()
      )
      .subscribe();
  }

  public whoAmI(): Observable<GenericResponse<SessionUser>> {
    return this.httpClient.get<GenericResponse<SessionUser>>('/api/whoami');
  }

  public login(data: LoginType): Observable<GenericResponse<SessionUser>> {
    return this.httpClient
      .post<GenericResponse<SessionUser>>('/api/login', data, { withCredentials: true })
      .pipe(tap((res) => this.currentUserSubject.next(res.content)));
  }

  public logout(): Observable<GenericResponse<void>> {
    return this.httpClient
      .get<GenericResponse<void>>('/api/logout')
      .pipe(tap(() => this.currentUserSubject.next(undefined)));
  }

  public register(data: RegisterType): Observable<GenericResponse<SessionUser>> {
    return this.httpClient
      .post<GenericResponse<SessionUser>>('api/signup', data, { withCredentials: true })
      .pipe(tap((res) => this.currentUserSubject.next(res.content)));
  }
}
