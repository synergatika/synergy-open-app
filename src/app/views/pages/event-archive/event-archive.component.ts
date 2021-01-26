import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

// Services & Models
import { OpenDataService } from '../../../core/services/open-data.service';
import { PostEvent } from '../../../core/models/post_event.model';

@Component({
	selector: 'app-event-archive',
	templateUrl: './event-archive.component.html',
	styleUrls: ['./event-archive.component.scss']
})
export class EventArchiveComponent implements OnInit {

	p: number = 1;
	public posts_events: PostEvent[];

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private router: Router
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
		this.openDataService.readAllPublicPostsEvents(`0-0-0`)
			.pipe(
				tap(
					data => {
						this.posts_events = data;
					},
					error => {
						console.log("Can't load events");
						console.log(error);
					}),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdRef.markForCheck();
				})
			)
			.subscribe();
	}

	clickPostEvent(partner_id: string, post_event_id: string, type: string){
		this.router.navigate([`/event/${partner_id}/${post_event_id}/${type}`]);
	}

	
}
