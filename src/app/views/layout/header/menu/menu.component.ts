import { Component, OnInit } from '@angular/core';
import { menu } from '../../../../core/config/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	private menu = menu;
	/*menu = [
		{
			title: 'MENU.Home',
			link: '/',
		},
		{
			title: 'MENU.Join',
			link: 'join',
		},
		{
			title: 'MENU.Explore',
			link: 'explore',
		},
		{
			title: 'MENU.Support',
			link: 'support',
		},
		{
			title: 'MENU.Contact',
			link: 'contact',
		},
	];*/
	constructor() { }

	ngOnInit() {
	}

}
