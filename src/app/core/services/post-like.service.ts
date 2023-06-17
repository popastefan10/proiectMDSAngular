import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountResponse } from 'app/models/count-respone.model';
import { GenericResponse } from 'app/models/generic-response.model';
import { PostLike } from 'app/models/post-like.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostLikeService {
  constructor(private readonly httpClient: HttpClient) {}

  public create(postId: string): Observable<GenericResponse<PostLike>> {
    return this.httpClient.post<GenericResponse<PostLike>>(`/api/posts/likes`, { postId }, { withCredentials: true });
  }

  public getPostLikes(postId: string): Observable<GenericResponse<PostLike[]>> {
    return this.httpClient.get<GenericResponse<PostLike[]>>(`/api/posts/${postId}/likes`, { withCredentials: true });
  }

  public getPostLikesCount(postId: string): Observable<GenericResponse<CountResponse>> {
    return this.httpClient.get<GenericResponse<CountResponse>>(`/api/posts/${postId}/likes/count`, {
      withCredentials: true
    });
  }

  public delete(postId: string): Observable<GenericResponse<undefined>> {
    return this.httpClient.delete<GenericResponse<undefined>>(`/api/posts/${postId}/likes`, { withCredentials: true });
  }
}
