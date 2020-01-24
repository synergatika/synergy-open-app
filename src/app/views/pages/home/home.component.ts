import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	latitude = 38.262431;
	longitude = 23.686613;

	constructor() { }

	ngOnInit() {
	}

}
