import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Services & Models
import { OpenDataService } from '../../../core/services/open-data.service';
import { StaticDataService } from '../../../core/services/static-data.service';
import { PostEvent } from '../../../core/models/post_event.model';

@Component({
	selector: 'app-event-single',
	templateUrl: './event-single.component.html',
	styleUrls: ['./event-single.component.scss']
})
export class EventSingleComponent implements OnInit, OnDestroy {
	partner_id: string;
	post_event_id: string;
	post_event_type: string;
	public post_event: PostEvent;

	img: string;
	private routeSubscription: any;

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	constructor(
		private route: ActivatedRoute,
		private cdRef: ChangeDetectorRef,
		private titleService: Title,
		private openDataService: OpenDataService,
		private staticDataService :StaticDataService 
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.routeSubscription = this.route.params.subscribe(params => {
			this.partner_id = params['partner_id'];
			this.post_event_id = params['post_event_id'];
			this.post_event_type = params['type'];
			this.fetchEventData(this.partner_id, this.post_event_id, this.post_event_type);
		});
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	fetchEventData(partner_id: string, post_event_id: string, post_event_type: string) {
		this.openDataService.readPublicPostEvent(partner_id, post_event_id, post_event_type)
			.pipe(
				tap(
					data => {
						this.post_event = data;
						this.img = (this.post_event_type == 'post') ? data.post_imageURL : data.event_imageURL;
						this.titleService.setTitle(this.post_event.title+this.staticDataService.getSiteTitle);
					},
					error => {
						console.log("Can't load post event");
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



}
