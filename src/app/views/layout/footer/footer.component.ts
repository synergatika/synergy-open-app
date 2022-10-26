import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { ContentService } from '../../../core/services/content-data.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public version: string = `${environment.version}`;

	public appUrl = environment.appUrl;

	private unsubscribe: Subject<any>;

  menu1 = [
    {
      title: 'MENU.About',
      link: 'about',
    },
		{
			title: 'MENU.HowTo',
			link: 'howto',
		},
		{
			title: 'MENU.Join',
			link: 'join',
		},
    {
      title: 'MENU.Contact',
      link: 'contact',
    },
  ];

	menu2 = [
    {
      title: 'MENU.Partners',
      link: 'partners',
    },
    {
      title: 'MENU.Offers',
      link: 'offers',
    },
    {
      title: 'MENU.Support',
      link: 'support',
    },
    {
      title: 'MENU.News',
      link: 'events',
    },
  ];

  content: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private loadContent: ContentService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.unsubscribe = new Subject();
    this.content = [];
    this.fetchContent('footer');
  }

  fetchContent(page_id) {
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
}
