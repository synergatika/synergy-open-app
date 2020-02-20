import { Component, OnInit } from '@angular/core';
import { LoadJsonService } from '../../../core/services/loadjson.service';
import { ActivatedRoute } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-offer-single',
  templateUrl: './offer-single.component.html',
  styleUrls: ['./offer-single.component.scss']
})
export class OfferSingleComponent implements OnInit {
	offerId: any;
	coopId: any;
	offer$: Observable<any>;
	coop$: Observable<any>;
	private routeSubscription: any;
	
	constructor(private route: ActivatedRoute, private loadData : LoadJsonService) { }

	ngOnInit() {
		this.routeSubscription = this.route.params.subscribe(params => {
			this.offerId = params['id'];
			console.log(this.offerId);
			this.loadData.getJSON('offers').subscribe(data => {			
				//console.log('getJSON data - single offer');
				//console.log(data[this.offerId]);
				this.offer$ = of(data[this.offerId]);
				this.coopId = data[this.offerId]['coop_id'];
				this.loadData.getJSON('coops').subscribe(coops => {			
					//console.log('getJSON data');
					//console.log(coops[this.coopId]);
					this.coop$ = of(coops[this.coopId]);

				});
			});
		});
	}

}
