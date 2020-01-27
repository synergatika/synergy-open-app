import { Component, OnInit } from '@angular/core';

export interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
	latitude = 38.262431;
	longitude = 23.686613;
	markers: marker[] = [
	  {
		  lat: 38.673858,
		  lng: 23.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 38.373858,
		  lng: 23.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 38.723858,
		  lng: 23.015982,
		  label: 'C',
		  draggable: true
	  }
  ]

	constructor() { }

	ngOnInit() {
	}

}
