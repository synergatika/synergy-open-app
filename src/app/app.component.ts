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
		translate.setDefaultLang('en');
		// the lang to use, if the lang isn't available, it will use the current loader to get them
		translate.use('en');
		this.router.events.pipe(
			filter((event) => event instanceof NavigationEnd),
			map(() => {
				let route = this.activatedRoute;
				while (route.firstChild) route = route.firstChild;
				console.log('route');
				return route;
			}),
			filter((route) => route.outlet === 'primary'),
			mergeMap((route) => route.data),
			map((data) => {
				console.log(data);
				if (data.title) {
					return data.title;
				}
				else {
					return this.router.url.split('/').reduce((acc, frag) => {
						if (acc && frag) { acc += ' / '; }
						console.log(acc, frag)
						return acc + frag;
					});
				}
				//
			})
		).subscribe(val => {
			console.log(val);
			translate.get(val).subscribe((translation: string) => {
				console.log(translation);
				this.titleService.setTitle(translation);
			});

		});

	}
}
