import { Component, OnInit } from '@angular/core';
import { LoadJsonService } from '../../../core/services/loadjson.service';
// RxJS
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.scss']
})
export class CommunityListComponent implements OnInit {
	objectKeys = Object.keys;
	list$: Observable<any>;
	
	constructor(private loadData : LoadJsonService) { }

	ngOnInit() {
		this.loadData.getJSON('coops').subscribe(data => {			
			//console.log('getJSON data');
           // console.log(data);
			this.list$ = of(data);

        });
	}

}
