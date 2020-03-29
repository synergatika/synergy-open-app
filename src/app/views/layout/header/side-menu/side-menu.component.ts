import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuService } from '../../../../core/services/menu.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { menu } from '../../../../core/config/menu';
// Translate
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
	currentRouteUrl: string = '';
	public menu = menu.mobile;
	/*menu = [
		{
			title: 'MENU.HOME',
			link: 'scanner',
			icon: 'home-roof',
		},
		{
			title: 'MENU.OFFERS',
			link: 'm-offers',
			icon: 'muffin',
		},
		{
			title: 'MENU.CAMPAIGNS',
			link: 'm-campaigns',
			icon: 'set-none',
		},
		{
			title: 'MENU.POSTS',
			link: 'm-posts',
			icon: 'file-document',
		},
		{
			title: 'MENU.EVENTS',
			link: 'm-events',
			icon: 'calendar',
		}
	];*/
	constructor(private menuService : MenuService, private router: Router, private translate: TranslateService, private cdr: ChangeDetectorRef) { }

	ngOnInit() {
		this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => {
				this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
				this.cdr.markForCheck();
			});
	}
	
	openNav() {
		this.menuService.openNav();
	}

	closeNav() {
		this.menuService.closeNav();
	}
	
	
	getItemCssClasses(item) {
		let classes = '';
		if (this.currentRouteUrl.indexOf(item) !== -1) {
			classes = 'side-menu-item-active';
		}
		return classes;
	}

}
