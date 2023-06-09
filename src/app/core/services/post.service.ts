import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostCreate } from 'app/models/post-create.model';
import { GenericResponse } from 'app/models/generic-response.model';
import { Observable, tap } from 'rxjs';
import { PostMetadata } from 'app/models/post-metadata.model';
import { PostMedia } from 'app/models/post-media.model';
import { Post } from 'app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private readonly httpClient: HttpClient) {}

  public create(data: PostCreate): Observable<GenericResponse<Post>> {
    const formData = new FormData();

    if (data.description) {
      formData.append('description', data.description);
    }

    data.media?.forEach((file) => {
      formData.append('media', file);
    });

    return this.httpClient.post<GenericResponse<Post>>('/api/posts', formData, { withCredentials: true });
  }

  public getSinglePost(id: string): Observable<GenericResponse<Post>> {
    const url: string = '/api/posts' + '/' + id;
    return this.httpClient
      .get<GenericResponse<Post>>(url, { withCredentials: true })
      .pipe(tap((res) => console.log('res', res)));
  }

  public getPostsByUser(userId: string): Observable<GenericResponse<Post[]>> {
    const options = {
      params: new HttpParams().set('userid', userId),
      withCredentials: true
    };

    return this.httpClient.get<GenericResponse<Post[]>>('/api/posts', options);
  }

  public delete(id: string): Observable<GenericResponse<undefined>> {
    const url: string = '/api/posts' + '/' + id;

    return this.httpClient.delete<GenericResponse<undefined>>(url, { withCredentials: true });
  }

  public patch(data: Partial<PostMetadata>): Observable<GenericResponse<Partial<PostMetadata>>> {
    const url: string = '/api/posts' + '/' + data.id;

    return this.httpClient.patch<GenericResponse<PostMetadata>>(url, data, { withCredentials: true });
  }

  public getPostMedia(id: string): Observable<GenericResponse<PostMedia>> {
    const url: string = '/api/posts' + '/' + id + '/' + 'media';
    return this.httpClient.get<GenericResponse<PostMedia>>(url, { withCredentials: true });
  }
}
