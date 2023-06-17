import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentLike } from 'app/models/comment-like.model';
import { CountResponse } from 'app/models/count-respone.model';
import { GenericResponse } from 'app/models/generic-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentLikeService {
  constructor(private readonly httpClient: HttpClient) {}

  public create(commentId: string): Observable<GenericResponse<CommentLike>> {
    return this.httpClient.post<GenericResponse<CommentLike>>(
      `/api/comments/likes`,
      { commentId },
      { withCredentials: true }
    );
  }

  public getCommentLikes(commentId: string): Observable<GenericResponse<CommentLike[]>> {
    return this.httpClient.get<GenericResponse<CommentLike[]>>(`/api/comments/${commentId}/likes`, {
      withCredentials: true
    });
  }

  public getCommentLikesCount(commentId: string): Observable<GenericResponse<CountResponse>> {
    return this.httpClient.get<GenericResponse<CountResponse>>(`/api/comments/${commentId}/likes/count`, {
      withCredentials: true
    });
  }

  public delete(commentId: string): Observable<GenericResponse<undefined>> {
    return this.httpClient.delete<GenericResponse<undefined>>(`/api/comments/${commentId}/likes`, {
      withCredentials: true
    });
  }
}
