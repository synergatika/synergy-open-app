import { Component, OnInit } from '@angular/core';
import { LoadCommunityService } from '../../../core/services/loadCommunity.service';
import { ActivatedRoute } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-community-single',
  templateUrl: './community-single.component.html',
  styleUrls: ['./community-single.component.scss']
})
export class CommunitySingleComponent implements OnInit {
	objectKeys = Object.keys;
	coopId: any;
	coop$: Observable<any>;
	offers$: Observable<any>;
	private routeSubscription: any;
	displayedColumns: string[] = ['description', 'date_from', 'date_to', 'points'];
	dataSource = [];
	
	constructor(private route: ActivatedRoute, private loadData: LoadCommunityService) { }

	ngOnInit() {
		this.routeSubscription = this.route.params.subscribe(params => {
			this.coopId = params['id'];
			console.log(this.coopId);
			this.loadData.get('coops').subscribe(data => {			
				console.log('getJSON data');
				console.log(data[this.coopId]);
				this.coop$ = of(data[this.coopId]);
				this.loadData.get('offers').subscribe(offers => {
					this.offers$ = of(offers);
					console.log(offers);
					this.dataSource = Object.values(offers);
				});
			});
		});
	}

}
