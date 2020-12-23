import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
//import { LoadJsonService } from '../../../core/services/loadjson.service';

// Services & Models
import { OpenDataService } from '../../../core/services/open-data.service';
import { StaticDataService } from 'src/app/core/services/static-data.service';
import { Partner } from '../../../core/models/partner.model';
import { GeneralList } from '../../../core/interfaces/general-list.interface';

@Component({
	selector: 'app-community-list',
	templateUrl: './community-list.component.html',
	styleUrls: ['./community-list.component.scss']
})

export class CommunityListComponent implements OnInit, OnDestroy {
	moved: boolean;
	//objectKeys = Object.keys;
	//list$: Observable<any>;
	customOptions: OwlOptions;

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	public partners: Partner[];
	public sectorsList: GeneralList[];
	/*
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
	]*/

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private router: Router,
		private staticDataService: StaticDataService,
		//	private loadData : LoadJsonService
	) {
		this.sectorsList = this.staticDataService.getSectorsList;
		this.customOptions = staticDataService.getOwlOprions;
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.fetchPartnersData();
		/*this.loadData.getJSON('partners').subscribe(data => {			
			this.list$ = of(data);
        });*/
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	translateSector(partner: Partner) {
		console.log("Here")
		console.log(partner);
		console.log()
		console.log(this.sectorsList.filter((el) => {
			return el.value == partner.sector
		}))
		return this.sectorsList.filter((el) => {
			return el.value == partner.sector
		})[0].title;
	}

	shuffleArray(array: Partner[]) {
		var m = array.length, t, i;

		// While there remain elements to shuffle
		while (m) {
			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}

	fetchPartnersData() {
		this.openDataService.readPartners(`0-0-0`)
			.pipe(
				tap(
					data => {
						this.partners = this.shuffleArray(data);
						console.log(this.partners)
					},
					error => {
					}),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdRef.markForCheck();
				})
			)
			.subscribe();
	}

	mousedown() {
		this.moved = false;
	}

	mousemove() {
		this.moved = true;
	}

	mouseup(partner_id: string) {
		if (this.moved) {
			console.log('moved')
		} else {
			console.log('not moved');
			this.router.navigate([`/partner/${partner_id}`]);
		}
		this.moved = false;
	}

}
