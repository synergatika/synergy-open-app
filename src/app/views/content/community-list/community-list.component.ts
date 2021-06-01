import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
	customOptions: OwlOptions;


	loading: boolean = false;
	private unsubscribe: Subject<any>;

	public partners: Partner[];
	public sectorsList: GeneralList[];

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private router: Router,
		private staticDataService: StaticDataService,
	) {
	//	this.sectorsList = this.staticDataService.getSectorsList;
		this.customOptions = staticDataService.getOwlOprions;
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		//Get Partners
		this.fetchPartnersData();
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	translateSector(partner: Partner) {
		// console.log("Here")
		// console.log(partner);
		// console.log()
		// console.log(this.sectorsList.filter((el) => {
		// 	return el.value == partner.sector
		// }))
		// return this.sectorsList.filter((el) => {
		// 	return el.value == partner.sector
		// })[0].title;
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
					},
					error => {
						console.log("Can not load partners");
						console.log(error);
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

	//On click partner
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
