import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { LoadWpContentService } from '../../../core/services/load-wp-content.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-home-hero',
	templateUrl: './home-hero.component.html',
	styleUrls: ['./home-hero.component.scss']
})
export class HomeHeroComponent implements OnInit {

	public appUrl = environment.appUrl;

	private unsubscribe: Subject<any>;
	public browserLang: string;
	content: any;

	constructor(private cdRef: ChangeDetectorRef, private loadContent: LoadWpContentService, private translate: TranslateService) {
		translate.onLangChange.subscribe(lang => {
			this.browserLang = lang;
		})
	}

	ngOnInit() {
		this.unsubscribe = new Subject();
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			console.log(event.lang);
			if (event.lang == 'en') {
				this.fetchHeroContent(21);
			} else {
				this.fetchHeroContent(18);
			}
			this.browserLang = event.lang
		});
	}

	fetchHeroContent(page_id) {
		this.loadContent.getContent(page_id)
			.pipe(
				tap(
					data => {
						this.content = data;
						//console.log(this.content);
					},
					error => {
					}),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.cdRef.markForCheck();
				})
			)
			.subscribe();
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

}
