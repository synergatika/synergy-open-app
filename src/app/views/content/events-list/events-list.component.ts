import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';

import { OpenDataService } from '../../../core/services/open-data.service';
import { PostEvent } from '../../../core/models/post_event.model';

import { LoadJsonService } from '../../../core/services/loadjson.service';
// RxJS
import { Observable, of } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy {
	@Input() merchId?: string;
	singleMerchant: boolean = false;
	loading: boolean = false;
	private unsubscribe: Subject<any>;
	customOptions: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: false,
		pullDrag: false,
		dots: true,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
		  0: {
			items: 1
		  },
		  940: {
			items: 3
		  }
		},
		margin:80,
		nav: true
	}
	posts_events: PostEvent[];

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private loadData : LoadJsonService
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {	
		if(this.merchId) {
			console.log('single');
			this.fetchMerchantPostsEventsData(this.merchId);
			this.singleMerchant = true;
		} else {
			console.log('single not');
			this.fetchPostsEventsData();
		}
	}

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  fetchPostsEventsData() {
    this.openDataService.readAllPublicPostsEvents()
      .pipe(
        tap(
          data => {
            this.posts_events = data;
            console.log(this.posts_events)
          },
          error => {
          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }
  fetchMerchantPostsEventsData(id) {
    this.openDataService.readPublicPostsEventsByStore(id)
      .pipe(
        tap(
          data => {
            this.posts_events = data;
            console.log(this.posts_events)
          },
          error => {
          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }
}
