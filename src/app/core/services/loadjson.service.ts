// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class LoadJsonService {
  private slug: string = "partners";

  constructor(private http: HttpClient) {
  }

  public getSlug(title): Observable<any> {
    this.slug = title;
    console.log(this.slug);
    return title;
  }

  public getJSON(slug): Observable<any> {
    return this.http.get("./assets/data/" + slug + ".json");
  }



}