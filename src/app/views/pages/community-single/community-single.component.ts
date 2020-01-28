import { Component, OnInit } from '@angular/core';
import { LoadJsonService } from '../../../core/services/loadjson.service';
import { ActivatedRoute } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-community-single',
  templateUrl: './community-single.component.html',
  styleUrls: ['./community-single.component.scss']
})
export class CommunitySingleComponent implements OnInit {
	coopId: any;
	coop$: Observable<any>;
	private routeSubscription: any;
	
	constructor(private route: ActivatedRoute, private loadData : LoadJsonService) { }

	ngOnInit() {
		this.routeSubscription = this.route.params.subscribe(params => {
			this.coopId = params['id'];
			console.log(this.coopId);
			this.loadData.getJSON('coops').subscribe(data => {			
				console.log('getJSON data');
				console.log(data[this.coopId]);
				this.coop$ = of(data[this.coopId]);

			});
		});
	}

}
