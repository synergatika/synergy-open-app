import { Component, OnInit } from '@angular/core';
import { LoadJsonService } from '../../../core/services/loadjson.service';
import { Router } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.scss']
})
export class CommunityListComponent implements OnInit {
	moved: boolean;
	objectKeys = Object.keys;
	list$: Observable<any>;
	customOptions: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: false,
		pullDrag: false,
		dots: true,
		navSpeed: 700,
		navText: ['', ''],
		responsive: {
		  0: {
			items: 1
		  },
		  940: {
			items: 3
		  }
		},
		margin:30,
		nav: true
	}
	
	constructor(private router: Router, private loadData : LoadJsonService) { }

	ngOnInit() {
		this.loadData.getJSON('coops').subscribe(data => {			
			//console.log('getJSON data');
           // console.log(data);
			this.list$ = of(data);

        });
	}
	
	mousedown() {
	  this.moved = false;
	}
	
	mousemove() {
	  this.moved = true;
	}

	mouseup(data, type) {
		if (this.moved) {
			console.log('moved')
		} else {
			console.log('not moved');
			if(type == "coop") {
				this.router.navigate(['/coop', data]);
				//this.openCoop(data);
			} else {
				//this.openPost(data);
			}
		}
		this.moved = false;
	}

}
