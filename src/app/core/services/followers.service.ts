import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from 'app/models/generic-response.model';
import { Followers } from 'app/models/followers.model';

@Injectable({
   providedIn: 'root'
})
export class FollowersService {
   constructor(private readonly httpClient: HttpClient) { }

   public getFollowers(id: string): Observable<GenericResponse<Partial<Followers>>> {
      const url: string = '/api/followers' + '/' + id;
      return this.httpClient.get<GenericResponse<Partial<Followers>>>(url);
   }
}