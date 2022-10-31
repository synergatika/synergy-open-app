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
	) {	}

	ngOnInit() {
		this.unsubscribe = new Subject();
		this.content = [];
		this.fetchHeroContent('homebanner');
 		this.fetchHeroContent('homebanner_title');
	}

	fetchHeroContent(page_id) {
		this.loadContent.readContentById(page_id)
			.pipe(
				tap(
					data => {
							this.content[page_id] = data;
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
