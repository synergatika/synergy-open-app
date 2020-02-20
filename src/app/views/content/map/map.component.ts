import { Component, OnInit } from '@angular/core';
import { LoadJsonService } from '../../../core/services/loadjson.service';
// RxJS
import { Observable, of } from 'rxjs';

export interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	list: any;
	latitude = 38.262431;
	longitude = 23.686613;
  
	constructor(private loadData : LoadJsonService) { }

	ngOnInit() {
		this.loadData.getJSON('coops').subscribe(data => {
			Object.keys(data).map((key, index) => {
				data[key]['lat'] = 38.1608 + this.getRandomInteger(4);
				data[key]['long'] = 23.2159 + this.getRandomInteger(2);
				data[key]['draggable'] = false;
			});
			this.list = Object.values(data);
			console.log(this.list);
		});
	  
	}
	
	getRandomInteger(num) {
		return Math.random()/num;
	}

}
