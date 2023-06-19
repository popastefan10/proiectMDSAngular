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

  public follow(id: string) {
    const url = 'api/follow';
    return this.httpClient.post<GenericResponse<Follower>>(url, { follows: id });
  }

  public unfollow(userId: string) {
    //followerRouter.delete('/follow/:userId', authenticationController.isAuthenticated, followerController.delete);

    const url = 'api/follow/' + userId;
    return this.httpClient.delete<GenericResponse<Follower>>(url);
  }
}
