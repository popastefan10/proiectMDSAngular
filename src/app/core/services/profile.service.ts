import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from 'app/models/generic-response.model';
import { ProfileCreate } from 'app/models/profile-create.model';
import { Profile } from 'app/models/profile.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private readonly httpClient: HttpClient) { }

  public create(data: ProfileCreate): Observable<GenericResponse<Partial<Profile>>> {
    const formData = new FormData();

    if (data.metadata.username){
    formData.append('username', data.metadata.username);
    }

    if (data.metadata.name){
      formData.append('name', data.metadata.name);
    }

    if (data.metadata.bio){
      formData.append('bio', data.metadata.bio);
    }

    if (data.media){
      formData.append('media', data.media);
    }

    return this.httpClient.post<GenericResponse<Partial<Profile>>>('/api/profiles', formData, { withCredentials: true });
  }

  public getProfile(id: string): Observable<GenericResponse<Partial<Profile>>> {
    const url: string = '/api/profiles' + '/' + id;
    return this.httpClient.get<GenericResponse<Partial<Profile>>>(url);
  }

  public deleteProfile(): Observable<GenericResponse<Partial<Profile>>> {
    const url: string = '/api/profiles';
    return this.httpClient.delete<GenericResponse<Partial<Profile>>>(url, { withCredentials: true });
  }

  public deleteProfilePicture(): Observable<GenericResponse<Partial<Profile>>> {
    const url: string = '/api/profiles/picture';
    return this.httpClient.delete<GenericResponse<Partial<Profile>>>(url, { withCredentials: true });
  }

  public patch(data: ProfileCreate): Observable<GenericResponse<Partial<Profile>>> {
    const formData = new FormData();

    if (data.metadata.username){
    formData.append('username', data.metadata.username);
    }

    if (data.metadata.name){
      formData.append('name', data.metadata.name);
    }

    if (data.metadata.bio){
      formData.append('bio', data.metadata.bio);
    }

    if (data.media){
      formData.append('media', data.media);
    }

    return this.httpClient.patch<GenericResponse<Partial<Profile>>>('/api/profiles', formData, { withCredentials: true });
  }

}
