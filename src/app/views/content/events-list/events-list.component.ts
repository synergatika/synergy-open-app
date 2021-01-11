import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

// Services & Models
import { OpenDataService } from '../../../core/services/open-data.service';
import { StaticDataService } from 'src/app/core/services/static-data.service';
import { PostEvent } from '../../../core/models/post_event.model';

@Component({
	selector: 'app-events-list',
	templateUrl: './events-list.component.html',
	styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy {
	@Input() partner_id?: string;

	moved: boolean;
	singlePartner: boolean = false;
	loading: boolean = false;
	type:string;
	private unsubscribe: Subject<any>;

	customOptions: OwlOptions; 

	public posts_events: PostEvent[];

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private router: Router,
		private staticDataService: StaticDataService,
	) {
		this.customOptions = staticDataService.getOwlOprions;
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		if (this.partner_id) {
			this.fetchPartnerPostsEventsData(this.partner_id);
			this.singlePartner = true;
			this.type = 'single';
		} else {
			this.fetchPostsEventsData();
			this.type = 'all';
			console.log(this.type)
		}
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

	fetchPartnerPostsEventsData(partner_id: string) {
		this.openDataService.readPublicPostsEventsByStore(partner_id, `0-0-0`)
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
	mousedown() {
		this.moved = false;
	}

	mousemove() {
		this.moved = true;
	}

	mouseup(partner_id: string, post_event_id: string, type: string) {
		if (this.moved) {
		} else {
			this.router.navigate([`/event/${partner_id}/${post_event_id}/${type}`]);
		}
		this.moved = false;
	}

}
