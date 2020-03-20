import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
// RxJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadWpContentService {
	resolveUrl = "https://wp.synergatika.gr/wp-json/wp/v2/";
	
  constructor(private http: HttpClient) { }	

	getContent(pageId): Observable<any> {
		return this.http.get<any>(this.resolveUrl + "./pages/"+ pageId).pipe(map(response => {
			return response.content.rendered;
		}));
	}
		
}
