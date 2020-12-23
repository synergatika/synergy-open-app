import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

// Services & Models
import { OpenDataService } from '../../../core/services/open-data.service';
import { StaticDataService } from 'src/app/core/services/static-data.service';
import { MicrocreditCampaign } from '../../../core/models/microcredit-campaign.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-microcredit-list',
	templateUrl: './microcredit-list.component.html',
	styleUrls: ['./microcredit-list.component.scss']
})
export class MicrocreditListComponent implements OnInit {
	@Input() partner_id?: string;
	singlePartner: boolean = false;
	moved: boolean;
	customOptions: OwlOptions;

	public _text: string = '';
	public _date: number = 0;

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	public campaigns: MicrocreditCampaign[];

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private translate: TranslateService,
		private router: Router,
		private staticDataService: StaticDataService,
	) {
		this.customOptions = staticDataService.getOwlOprions;
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		if (this.partner_id) {
			this.fetchPartnerCampaignsData(this.partner_id);
			this.singlePartner = true;
		} else {
			this.fetchCampaignsData();
		}
	}

	shuffleArray(array: MicrocreditCampaign[]) {
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

	filterCampaign(campaign: MicrocreditCampaign) {
		const now = new Date();
		const seconds = parseInt(now.getTime().toString());

		if (campaign.startsAt > seconds) {
			this._date = campaign.startsAt;
			return this.translate.instant('CAMPAIGN.STATUS.EXPECTED');
			// this._text = this.translate.instant('CAMPAIGN.STATUS.EXPECTED');
		} else if ((campaign.expiresAt > seconds) && (seconds > campaign.startsAt)) {
			this._date = campaign.expiresAt;
			return this.translate.instant('GENERAL.TO');
			// this._text = this.translate.instant('GENERAL.TO');
		} else if (seconds > campaign.expiresAt) {
			this._date = campaign.redeemEnds;
			return this.translate.instant('CAMPAIGN.STATUS.REDEEM_TO');
			// this._text = this.translate.instant('CAMPAIGN.STATUS.REDEEM_TO');
		}
	}

	fetchCampaignsData() {
		this.openDataService.readAllPublicMicrocreditCampaigns(`0-0-1`)
			.pipe(
				tap(
					data => {
						this.campaigns = this.shuffleArray(data);
						console.log(this.campaigns)
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

	fetchPartnerCampaignsData(partner_id: string) {
		this.openDataService.readAllMicrocreditCampaignsByStore(partner_id, `0-0-1`)
			.pipe(
				tap(
					data => {
						this.campaigns = data;
						console.log(this.campaigns)
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

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	mousedown() {
		this.moved = false;
	}

	mousemove() {
		this.moved = true;
	}

	mouseup(partner_id: string, campaign_id: string) {
		if (this.moved) {
			console.log('moved')
		} else {
			console.log('not moved');
			console.log(partner_id);
			this.router.navigate([`/microcredit/${partner_id}/${campaign_id}`]);
		}
		this.moved = false;
	}

}
