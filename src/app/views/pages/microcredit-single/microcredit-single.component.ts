import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OpenDataService } from '../../../core/services/open-data.service';
import { ActivatedRoute } from '@angular/router';
import { MicrocreditCampaign } from '../../../core/models/microcredit-campaign.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, of } from 'rxjs';
// Translate
import { TranslateService } from '@ngx-translate/core';
	
@Component({
  selector: 'app-microcredit-single',
  templateUrl: './microcredit-single.component.html',
  styleUrls: ['./microcredit-single.component.scss']
})
export class MicrocreditSingleComponent implements OnInit {
	merchId: string;
	campaignId: string;
	microcredit$: Observable<any>;
	coop$: Observable<any>;
	microcreditForm: FormGroup;
	private routeSubscription: any;
	
	campaign: MicrocreditCampaign;
	loading: boolean = false;
	private unsubscribe: Subject<any>;

	constructor(
		private route: ActivatedRoute,
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
		private translate: TranslateService,	
		private fb: FormBuilder,
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {	
		this.routeSubscription = this.route.params.subscribe(params => {
			this.merchId = params['id'];
			this.campaignId = params['id2'];
			console.log(this.campaignId);
			this.fetchCampaignData(this.merchId,this.campaignId);
			/*this.loadData.getJSON('microcredit').subscribe(data => {			
				this.microcredit$ = of(data[this.microcreditId]);
				this.coopId = data[this.microcreditId]['coop_id'];
				this.loadData.getJSON('coops').subscribe(coops => {			
					this.coop$ = of(coops[this.coopId]);

				});
			});*/
		});
	}
	
	fetchCampaignData(merch_id, campaign_id) {
		this.openDataService.readMicrocreditCampaign(merch_id, campaign_id)
			.pipe(
				tap(
					data => {
						this.campaign = data;
						console.log(this.campaign);
						this.initRegistrationForm();
					},
					error => {
						console.log('error');
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
	
	initRegistrationForm() {
		this.microcreditForm = this.fb.group({
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			]
		});
	}
	
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.microcreditForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}

}
