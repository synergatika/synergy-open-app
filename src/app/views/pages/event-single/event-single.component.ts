import { Component, OnInit } from '@angular/core';
import { LoadJsonService } from '../../../core/services/loadjson.service';
import { ActivatedRoute } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-event-single',
  templateUrl: './event-single.component.html',
  styleUrls: ['./event-single.component.scss']
})
export class EventSingleComponent implements OnInit {
	eventId: any;
	coopId: any;
	event$: Observable<any>;
	coop$: Observable<any>;
	private routeSubscription: any;
	
	constructor(private route: ActivatedRoute, private loadData : LoadJsonService) { }

	ngOnInit() {
		this.routeSubscription = this.route.params.subscribe(params => {
			this.eventId = params['id'];
			console.log(this.eventId);
			this.loadData.getJSON('events').subscribe(data => {			
				//console.log('getJSON data - single event');
				this.event$ = of(data[this.eventId]);
				this.coopId = data[this.eventId]['coop_id'];
				this.loadData.getJSON('coops').subscribe(coops => {			
					//console.log('getJSON data');
					//console.log(coops[this.coopId]);
					this.coop$ = of(coops[this.coopId]);

				});
			});
		});
	}

}
