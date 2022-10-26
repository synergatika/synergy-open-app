import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	menu = [
		{
			title: 'MENU.Home',
			link: '/',
		},
		{
			title: 'MENU.HowTo',
			link: 'howto',
		},
		{
			title: 'MENU.Partners',
			link: 'partners',
		},
		{
			title: 'MENU.Support',
			link: 'support',
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
