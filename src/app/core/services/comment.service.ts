import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from 'app/models/generic-response.model';
import { Observable } from 'rxjs';
import { Comment } from '../../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private readonly httpClient: HttpClient) { 

  }

  public create(data: Partial<Comment>): Observable<GenericResponse<Partial<Comment>>> {

    return this.httpClient.post<GenericResponse<Partial<Comment>>>('/api/comments', data, { withCredentials: true });
  }

  public get(id: string): Observable<GenericResponse<Partial<Comment>>> {

    let url: string = '/api/comments' + '/' + id;
    return this.httpClient.get<GenericResponse<Partial<Comment>>>(url, { withCredentials: true });
  }

  public patch(data: Partial<Comment>): Observable<GenericResponse<Partial<Comment>>> {

    let url: string = '/api/comments' + '/' + data.id;
    return this.httpClient.patch<GenericResponse<Partial<Comment>>>(url, data, { withCredentials: true });
  }

  public getCommentReplies(id: string): Observable<GenericResponse<Partial<Comment>[]>> {

    let url: string = '/api/comments' + '/' + id + '/' + 'replies';
    return this.httpClient.get<GenericResponse<Partial<Comment>[]>>(url, { withCredentials: true });
  }

  public getPostReplies(id: string): Observable<GenericResponse<Partial<Comment>[]>> {
    let url: string = '/api/posts' + '/' + id + '/' + 'comments';
    return this.httpClient.get<GenericResponse<Partial<Comment>[]>>(url, { withCredentials: true });
  }
}
