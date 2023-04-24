import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostCreate } from 'app/components/post/post.create';
import { GenericResponse } from 'app/models/generic-response.model';
import { Post } from 'app/models/post.model';
// import { join } from 'path';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private readonly httpClient: HttpClient) {

  }

  public create(data: PostCreate): Observable<GenericResponse<Partial<Post>>> {

    let formData = new FormData();

    if (data.description) {
      formData.append('description', data.description);
    }

    if (data.media) {
      [...data.media].forEach(file => {
        formData.append('media', file);
      });
    }

    return this.httpClient.post<GenericResponse<Partial<Post>>>('/api/posts', formData, { withCredentials: true });
  }

  public getSinglePost(id: string): Observable<GenericResponse<Partial<Post>>> {

    // let url: string = join('/api/posts', id);
    let url: string = '/api/posts' + '/' + id;
    return this.httpClient.get<GenericResponse<Partial<Post>>>(url, { withCredentials: true });
  }

  public getPostsByUser(userId: string): Observable<GenericResponse<Partial<Post>>> {

    const options = {
       params: new HttpParams().set('userid', userId),
       withCredentials: true,
    };

    return this.httpClient.get<GenericResponse<Partial<Post>>>('/api/posts', options);
  }

  public delete(id: string): Observable<GenericResponse<Partial<Post>>> {

    // let url: string = join('/api/posts', id);
    let url: string = '/api/posts' + '/' + id;
    return this.httpClient.delete<GenericResponse<Partial<Post>>>(url, { withCredentials: true });
  }

  public patch(data: Partial<Post>): Observable<GenericResponse<Partial<Post>>> {

    // let url: string = join('/api/posts', id);
    let url: string = '/api/posts' + '/' + data.id;
    return this.httpClient.patch<GenericResponse<Partial<Post>>>(url, data, { withCredentials: true });
  }

  public getPostMedia(id: string): Observable<GenericResponse<Partial<Post>>> {

    // let url: string = join('/api/posts', id);
    let url: string = '/api/posts' + '/' + id + '/' + 'media';
    return this.httpClient.get<GenericResponse<Partial<Post>>>(url, { withCredentials: true });
  }

}
