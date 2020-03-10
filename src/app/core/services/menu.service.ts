// Core
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

	constructor() {}

	openNav() {
		document.getElementById("mySidenav").classList.add("menu-active");
		//document.getElementById("main").classList.add("main-menu-active");
		document.getElementById("menu_overlay").classList.add("overlay-show");		
	}
	
	closeNav() {
		document.getElementById("mySidenav").classList.remove("menu-active");
		//document.getElementById("main").classList.remove("main-menu-active");
		document.getElementById("menu_overlay").classList.remove("overlay-show");
	}
	
	toggleNav() {
		document.getElementById("mySidenav").classList.toggle("menu-toggled");
		//document.getElementById("main").classList.toggle("main-menu-toggled");		
	}
	
}
