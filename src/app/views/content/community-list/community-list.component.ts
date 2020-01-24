import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.scss']
})
export class CommunityListComponent implements OnInit {
	list = [
		{
			name: 'Commonspace',
			img: './assets/media/images/uploaded/commonspace.webp',
			sector: 'Recreation and Culture',
			subscription_date: 'Jan 5, 2020',
			email: 'nfo@commonspace.gr',
			phone: '2103606333',
			address: 'Akakiou 1 - 3 & Ipeirou 60, 10439, Athens'
		},
		{
			name: 'Syn Allois',
			img: './assets/media/images/uploaded/synallois.jpg',
			sector: 'Food',
			subscription_date: 'Jan 1, 2020',
			email: 'info@synallois.org',
			phone: '2103606333',
			address: 'Nileos 35, 11851, Athens'
		},
		{
			name: 'Sociality',
			img: './assets/media/images/uploaded/sociallity.png',
			sector: 'Durables (Technology)',
			subscription_date: 'Jan 15, 2020',
			email: 'contact@sociality.gr',
			phone: '2103606333',
			address: 'Solonos 136, 10677, Athens'
		},
	]
	
	constructor() { }

	ngOnInit() {
	}

}
