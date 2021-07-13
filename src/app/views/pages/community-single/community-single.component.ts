import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { LoadCommunityService } from '../../../core/services/loadCommunity.service';
import { ActivatedRoute } from '@angular/router';
//import { OwlOptions } from 'ngx-owl-carousel-o';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

// Services & Models
import { OpenDataService } from '../../../core/services/open-data.service';
import { StaticDataService } from '../../../core/services/static-data.service';
//import { StaticDataService } from 'src/app/core/services/static-data.service';
import { Partner } from '../../../core/models/partner.model';
import { PaymentList } from '../../../core/interfaces/payment-list.interface';
import { ContactList } from '../../../core/interfaces/contact-list.interface';

import { GeneralList } from '../../../core/interfaces/general-list.interface';

@Component({
	selector: 'app-community-single',
	templateUrl: './community-single.component.html',
	styleUrls: ['./community-single.component.scss']
})
export class CommunitySingleComponent implements OnInit {

	public configAccess: Boolean[] = environment.access;
	public configSubAccess: Boolean[] = environment.subAccess;

	public contactsList: ContactList[] = [];
	private routeSubscription: any;


	partner_id: string;
	public partner: Partner;
	public sectorsList: GeneralList[];
	public sector: string;

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private route: ActivatedRoute,
		private titleService: Title,
		//	private loadData: LoadCommunityService,
		private staticDataService: StaticDataService
	) {
		this.sectorsList = this.staticDataService.getSectorsList;
		this.contactsList = this.staticDataService.getContactsList;
		//	this.customOptions = staticDataService.getOwlOprions;
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.routeSubscription = this.route.params.subscribe(params => {
			this.partner_id = params['partner_id'];
			this.fetchPartnerData(this.partner_id);
		});
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	translateSector(partner: Partner) {
		return this.sectorsList.filter((el) => {
			return el.value == partner.sector
		})[0].title;
	}

	fetchPartnerData(partner_id: string) {
		this.openDataService.readPartnerInfo(partner_id)
			.pipe(
				tap(
					data => {
						this.partner = data;
						/**begin:Social Media*/
						const currentContactsArray = (this.partner.contacts).map(a => a.slug);
						const validateContactsList = this.contactsList.filter(function (el) {
							return currentContactsArray.includes(el.slug);
						});
						this.contactsList = validateContactsList.map(o => { return { ...o, value: (this.partner.contacts).filter(ob => { return ob.slug === o.slug })[0].value } });
						/**end:Social Media*/
						this.titleService.setTitle(this.partner.name + this.staticDataService.getSiteTitle);
						//Set sector
						// console.log(this.sectorsList)
						// this.sector = this.sectorsList.filter((el) => {
						// 	return el.value == this.partner.sector
						// })[0].title;
					},
					error => {
						console.log("Can't load Partner");
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
}
