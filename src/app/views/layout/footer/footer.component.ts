import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	public version: string = `${environment.version}`;

	menu = [
		{
			title: 'MENU.About',
			link: 'about',
		},
		{
			title: 'MENU.Partners',
			link: 'partners',
		},
		{
			title: 'MENU.Offers',
			link: 'offers',
		},
		{
			title: 'MENU.Support',
			link: 'support',
		},
		{
			title: 'MENU.News',
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
