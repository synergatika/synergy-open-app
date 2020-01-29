// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
// RxJS
import { Observable } from 'rxjs';
import { of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class LoadCommunityService {
	
	constructor(private http: HttpClient) {
    }
	
    public get(id): Observable<any> {
        return this.http.get("./assets/data/" + id + ".json");
    }
	
    public getOffers(id): Observable<any> {
        return this.http.get("./assets/data/" + id + ".json");
    }	
	
}