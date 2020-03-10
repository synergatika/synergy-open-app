import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../../core/services/menu.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
	icon: string = './assets/media/images/menu.svg' ;
	
  constructor(private menuService : MenuService) { }

  ngOnInit() {		
  }
	
	openNav() {
		this.menuService.openNav();
	}

}
