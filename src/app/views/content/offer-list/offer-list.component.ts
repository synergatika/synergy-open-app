import { Component, OnInit } from '@angular/core';
import { LoadJsonService } from '../../../core/services/loadjson.service';
// RxJS
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
	objectKeys = Object.keys;
	list$: Observable<any>;
	coops$: Observable<any>;

	constructor(private loadData : LoadJsonService) { }

	ngOnInit() {
		this.loadData.getJSON('offers').subscribe(data => {			
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

}
