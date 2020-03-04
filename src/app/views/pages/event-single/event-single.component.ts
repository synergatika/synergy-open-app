import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OpenDataService } from '../../../core/services/open-data.service';
import { ActivatedRoute } from '@angular/router';
import { PostEvent } from '../../../core/models/post_event.model';

@Component({
  selector: 'app-event-single',
  templateUrl: './event-single.component.html',
  styleUrls: ['./event-single.component.scss']
})
export class EventSingleComponent implements OnInit {
	eventId: string;
	merchId: string;
	eventType: string;
	loading: boolean = false;
	private unsubscribe: Subject<any>;
	postEvent: PostEvent;
	img: string;
	private routeSubscription: any;
	
	constructor(
		private route: ActivatedRoute,
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.routeSubscription = this.route.params.subscribe(params => {
			this.merchId = params['id'];
			console.log(this.eventId);
			this.eventId = params['id2'];
			this.eventType = params['type'];
			console.log(this.merchId);
			console.log(this.eventType);
			this.fetchEventData(this.merchId,this.eventId,this.eventType);
		});
	}
	
	fetchEventData(merch_id, event_id, event_type) {
		this.openDataService.readPublicPostEvent(merch_id, event_id, event_type)
			.pipe(
				tap(
					data => {
						this.postEvent = data;
						console.log(this.postEvent);
						if(this.eventType=="post") {
							this.img = data.post_imageURL;
						}
						else {
							this.img = data.event_imageURL;
						}
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
	
	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

}
