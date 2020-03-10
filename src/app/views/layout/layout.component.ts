import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../core/services/menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private menuService : MenuService) { }

  ngOnInit() {
  }
	
	openNav() {
		this.menuService.openNav();
	}

	closeNav() {
		this.menuService.closeNav();

	} 

}
