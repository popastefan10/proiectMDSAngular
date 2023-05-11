import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from 'app/models/generic-response.model';
import { Post } from 'app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private readonly httpClient: HttpClient) { }

  public getFeed() {
    return this.httpClient.get<GenericResponse<Post[]>>('/api/feed', { withCredentials: true });
  }
}
