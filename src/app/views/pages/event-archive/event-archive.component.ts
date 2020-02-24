import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';

import { OpenDataService } from '../../../core/services/open-data.service';
import { PostEvent } from '../../../core/models/post_event.model';
// RxJS
import { Observable, of } from 'rxjs';
//import { LoadEventsService } from '../../../core/services/loadEvents.service';

@Component({
  selector: 'app-event-archive',
  templateUrl: './event-archive.component.html',
  styleUrls: ['./event-archive.component.scss']
})
export class EventArchiveComponent implements OnInit {
	p:number = 1;
	objectKeys = Object.keys;
	list$: Observable<any>;
	coops$: Observable<any>;
	loading: boolean = false;
	private unsubscribe: Subject<any>;
	posts_events: PostEvent[];
	
	constructor (
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
	) {
		this.unsubscribe = new Subject();
		}

	ngOnInit() {
		this.fetchPostsEventsData();
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
