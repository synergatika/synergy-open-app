import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private translateService: TranslateService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentLang: string = `${this.translateService.store.currentLang}`;
        request = request.clone({
            setHeaders: {
                "content-language": `${currentLang}-${(currentLang).toUpperCase()}`
            }
        });

        return next.handle(request);
    }
}