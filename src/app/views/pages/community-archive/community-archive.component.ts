import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

// Services & Models
import { OpenDataService } from '../../../core/services/open-data.service';
import { StaticDataService } from '../../../core/services/static-data.service';
import { Partner } from '../../../core/models/partner.model';
import { GeneralList } from '../../../core/interfaces/general-list.interface';
import { ContentService } from 'src/app/core/services/content-data.service';
import { Sector } from 'src/app/core/models/sector.model';

@Component({
	selector: 'app-community-archive',
	templateUrl: './community-archive.component.html',
	styleUrls: ['./community-archive.component.scss']
})
export class CommunityArchiveComponent implements OnInit {
	p: number = 1;
	public partners: Partner[];
	public partnersSafe: Partner[];
	// public sectorsList: GeneralList[];
	public sectorsList$: Observable<Sector[]>;
	public selectedSector: string;

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	constructor(
		private cdRef: ChangeDetectorRef,
		private router: Router,
		private openDataService: OpenDataService,
		private staticDataService: StaticDataService,
		private contentService: ContentService
	) {
		// this.sectorsList = this.staticDataService.getSectorsList;
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.sectorsList$ = this.contentService.readSectors();
		setTimeout(() => { this.selectedSector = 'All' });
		this.fetchPartnersData();
		// this.fecthPartnerSectors();
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	// translateSector(partner: Partner) {
	// 	return this.sectorsList.filter((el) => {
	// 		return el.value == partner.sector
	// 	})[0].title;
	// }

	fetchPartnersData() {
		this.openDataService.readPartners(`0-0-0`)
			.pipe(
				tap(
					data => {
						this.partnersSafe = data;
						this.partners = data;
					},
					error => {
						console.log("Can't load partners");
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

	clickPartner(partner_slug: string) {
		this.router.navigate([`/partner/${partner_slug}`]);
	}

	//Filters
	filterName(value) {
		if (!value) {
			this.partners = this.partnersSafe;
		} // when nothing has typed
		this.partners = this.partnersSafe.filter(
			item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
		)
	}
	// fecthPartnerSectors() {
	// 	this.sectorsList = this.staticDataService.getSectorsList;
	// }
	sectorChange() {
		if (this.selectedSector == "All" || this.selectedSector == undefined) {
			this.partners = this.partnersSafe;
		} else {
			this.partners = this.partnersSafe.filter(
				item => item.sector == this.selectedSector
			)
		}
	}


}
