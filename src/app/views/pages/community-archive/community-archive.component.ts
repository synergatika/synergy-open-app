import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { from, Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

// Services & Models
import { OpenDataService } from '../../../core/services/open-data.service';
import { StaticDataService } from '../../../core/services/static-data.service';
import { Partner } from '../../../core/models/partner.model';

@Component({
	selector: 'app-community-archive',
	templateUrl: './community-archive.component.html',
	styleUrls: ['./community-archive.component.scss']
})
export class CommunityArchiveComponent implements OnInit {
	p: number = 1;
	public partners: Partner[];
	public partnersSafe: Partner[];
	public sectors: any[];
	public selectedSector: string;

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private staticDataService: StaticDataService,
		private router: Router,
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.fetchPartnersData();
		this.fecthPartnerSectors();
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

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
	fecthPartnerSectors() {
		this.sectors = this.staticDataService.getSectorList;
	}
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
