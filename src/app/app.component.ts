import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'synergy-open-app';

	constructor(private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute, translate: TranslateService) {
		// this language will be used as a fallback when a translation isn't found in the current language
		translate.setDefaultLang('el');
		// the lang to use, if the lang isn't available, it will use the current loader to get them
		translate.use('el');
		this.router.events.pipe(
			filter((event) => event instanceof NavigationEnd),
			map(() => {
				let route = this.activatedRoute;
				while (route.firstChild) route = route.firstChild;
				return route;
			}),
			filter((route) => route.outlet === 'primary'),
			mergeMap((route) => route.data),
			map((data) => {
				if (data.title) {
					return data.title;
				}
				else {
					return this.router.url.split('/').reduce((acc, frag) => {
						if (acc && frag) { acc += ' / '; }
						return acc + frag;
					});
				}
				//
			})
		).subscribe(val => {
			translate.get(val).subscribe((translation: string) => {
				this.titleService.setTitle(translation+' | Εμπορική Κοινότητα Συνεργατικών');
			});

		});

	}
}
