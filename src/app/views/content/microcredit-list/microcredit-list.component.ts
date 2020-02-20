import { Component, OnInit } from '@angular/core';
import { LoadJsonService } from '../../../core/services/loadjson.service';
// RxJS
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-microcredit-list',
  templateUrl: './microcredit-list.component.html',
  styleUrls: ['./microcredit-list.component.scss']
})
export class MicrocreditListComponent implements OnInit {
	objectKeys = Object.keys;
	list$: Observable<any>;
	coops$: Observable<any>;
	
	constructor(private loadData : LoadJsonService) { }

	ngOnInit() {
		this.loadData.getJSON('microcredit').subscribe(data => {			
			//console.log('getJSON data - microcredit');
           // console.log(data);
			this.list$ = of(data);
			this.loadData.getJSON('coops').subscribe(coops => {			
				//console.log('getJSON data - coops of microcredit');
				//console.log(coops);
				this.coops$ = of(coops);
			});

        });
	}

}
