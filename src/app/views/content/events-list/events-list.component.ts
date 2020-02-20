import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';

import { OpenDataService } from '../../../core/services/open-data.service';
import { PostEvent } from '../../../core/models/post_event.model';

import { LoadJsonService } from '../../../core/services/loadjson.service';
// RxJS
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy {
	objectKeys = Object.keys;
	list$: Observable<any>;
	coops$: Observable<any>;
	loading: boolean = false;
	private unsubscribe: Subject<any>;

	posts_events: PostEvent[];

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private loadData : LoadJsonService
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.fetchPostsEventsData();
		this.loadData.getJSON('events').subscribe(data => {			
			//console.log('getJSON data - offers');
		   // console.log(data);
			this.list$ = of(data);
			this.loadData.getJSON('coops').subscribe(coops => {			
				//console.log('getJSON data - coops of offers');
				//console.log(coops);
				this.coops$ = of(coops);
			});

		});
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
}
