import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
	menu = [
		{
			title: 'MENU.Home',
			link: '/',
		},
		{
			title: 'MENU.About',
			link: 'about',
		},
		{
			title: 'MENU.Events',
			link: 'events',
		},
		{
			title: 'MENU.Contact',
			link: 'contact',
		},
	];
	
	constructor() { }

	ngOnInit() {
	}

}
