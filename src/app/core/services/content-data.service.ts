import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

/**
 * Environments
 */
import { environment } from '../../../environments/environment';
import { Sector } from '../models/sector.model';
import { Observable } from 'rxjs';
import { Content } from '../models/content.model';


@Injectable({
  providedIn: 'root'
})

//This service is used to get static data
export class ContentService {

  constructor(
    private http: HttpClient
  ) { }


  readContentById(content_id: string): Observable<Content> {
    return this.http.get<any>(`${environment.apiUrl}/content/${content_id}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readSectors(): Observable<Sector[]> {
    return this.http.get<any>(`${environment.apiUrl}/content/sectors`)
      .pipe(map(response => {
        return response.data;
      }));
  }
}
