import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { ContentService } from '../../../core/services/content-data.service';
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
	public currentLang: string;
	content: any;

	constructor(
		private cdRef: ChangeDetectorRef, 
		private loadContent: ContentService, 
		public translate: TranslateService
	) {
		/*translate.onLangChange.subscribe(lang => {
			this.browserLang = lang;
		})*/
	}

	ngOnInit() {
		this.unsubscribe = new Subject();
		this.fetchHeroContent('homebanner');
	}

	fetchHeroContent(page_id) {
		console.log(page_id);
		this.loadContent.readContentById(page_id)
			.pipe(
				tap(
					data => {
						this.content = data;
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
