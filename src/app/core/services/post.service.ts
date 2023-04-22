import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostCreate } from 'app/components/post/post.create';
import { GenericResponse } from 'app/models/generic-response.model';
import { Post } from 'app/models/post.model';
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
}
