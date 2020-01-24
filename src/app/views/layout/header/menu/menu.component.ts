import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
	menu = [
		{
			title: 'Home',
			link: '/',
		},
		{
			title: 'Events',
			link: 'events',
		},
		{
			title: 'Contact',
			link: 'contact',
		},
	];
	constructor() { }

	ngOnInit() {
	}

}
