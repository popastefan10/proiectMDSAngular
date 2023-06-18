import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Follower } from "app/models/follower.model";
import { GenericResponse } from "app/models/generic-response.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  constructor(private readonly httpClient: HttpClient) { }

  public getFollowers(id: string): Observable<GenericResponse<Follower[]>> {
    const url = 'api/follow?follows=' + id;
    return this.httpClient.get<GenericResponse<Follower[]>>(url);
  }

  public getFollows(id: string): Observable<GenericResponse<Follower[]>> {
    const url = 'api/follow?followedBy=' + id;
    return this.httpClient.get<GenericResponse<Follower[]>>(url);
  }
}
