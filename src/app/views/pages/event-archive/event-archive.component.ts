import { Component, OnInit } from '@angular/core';
import { LoadJsonService } from '../../../core/services/loadjson.service';
// RxJS
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-event-archive',
  templateUrl: './event-archive.component.html',
  styleUrls: ['./event-archive.component.scss']
})
export class EventArchiveComponent implements OnInit {
	objectKeys = Object.keys;
	list$: Observable<any>;
	coops$: Observable<any>;
	
	constructor(private loadData : LoadJsonService) { }

	ngOnInit() {
		this.loadData.getJSON('events').subscribe(data => {			
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
