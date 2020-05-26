import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OpenDataService } from '../../../core/services/open-data.service';
import { ActivatedRoute } from '@angular/router';
import { MicrocreditCampaign } from '../../../core/models/microcredit-campaign.model';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
// RxJS
import { Observable, of } from 'rxjs';
// Translate
import { TranslateService } from '@ngx-translate/core';
import { StaticDataService } from 'src/app/core/services/static-data.service';
import Swal from 'sweetalert2';
import { PaymentDetails } from 'src/app/core/models/payment-details.model';

@Component({
	selector: 'app-microcredit-single',
	templateUrl: './microcredit-single.component.html',
	styleUrls: ['./microcredit-single.component.scss']
})
export class MicrocreditSingleComponent implements OnInit {

	public paymentsList: any[];
	paymentDetails: PaymentDetails;

	oneClickToken: any;
	tempAmount: number;

	merchId: string;
	campaignId: string;
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
		private staticDataService: StaticDataService,
	) {
		this.paymentsList = this.staticDataService.getPaymentsList;
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.routeSubscription = this.route.params.subscribe(params => {
			this.merchId = params['id'];
			this.campaignId = params['id2'];
			console.log(this.campaignId);
			this.fetchCampaignData(this.merchId, this.campaignId);
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

	addStep() {
		const controls = this.microcreditForm.controls;
		this.tempAmount = controls.amount.value + this.campaign.stepAmount;
		if (this.tempAmount <= this.campaign.maxAllowed) {
			controls['amount'].setValue(this.tempAmount);
		}
	}

	removeStep() {
		const controls = this.microcreditForm.controls;
		this.tempAmount = controls.amount.value - this.campaign.stepAmount;
		if (this.tempAmount >= this.campaign.minAllowed) {
			controls['amount'].setValue(this.tempAmount);
		}
	}

	initRegistrationForm() {
		//const currentMethodsArray = (this.campaign.partner_payment).map(a => a.bic);
		const currentMethodsArray = ([{
			bic: 'PIRBGRAA',
			value: 'Gr;ljsdlfkjsdflksdflkdsjfls',
		}]).map(a => a.bic);
		const validatePaymentList = this.paymentsList.filter(function (el) {
			return currentMethodsArray.includes(el.bic);
		});
		this.paymentsList = validatePaymentList;

		this.microcreditForm = this.fb.group({
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			],
			amount: ['', Validators.compose([
				Validators.required,
				(control: AbstractControl) => Validators.min(this.campaign.minAllowed)(control),
				(control: AbstractControl) => Validators.max((this.campaign.maxAllowed) > 0 ? this.campaign.maxAllowed : this.campaign.maxAmount)(control)
			])
			],
			method: ['', Validators.compose([
				Validators.required,
			])
			]
		});

		const controls = this.microcreditForm.controls;
		controls['amount'].setValue(this.campaign.minAllowed);
		controls['method'].setValue(this.paymentsList[0].bic);
	}

	oneClickSupport(controls) {
		this.openDataService.oneClickSupport(this.campaign.partner_id, this.campaign.campaign_id, this.oneClickToken.oneClickToken,
			controls.amount.value, controls.method.value)
			.pipe(
				tap(
					data => {
						(data);
						this.paymentDetails = data;
						//this.support.how = data.how;

						this.paymentDetails['how'] = (this.paymentDetails.method == 'store') ? { title: '', value: '' } : {
							title: this.paymentsList.filter((el) => {
								return el.bic == this.paymentDetails.method
							})[0].title,
							value: this.campaign.partner_payments.filter((el) => {
								return el.bic == this.paymentDetails.method
							})[0].value
						}
						Swal.fire({
							title: this.translate.instant('SUPPORT.SUCCESS.TITLE'),
							html:
								"<p>{{'SUPPORT.SUCCESS.PAYMENT_ID' | translate}}: {{support.payment_id}}</p> " +
								"<p *ngIf=\"support.method!='store'\">{{'SUPPORT.SUCCESS.INSTRUCTIONS' | translate}}: " +
								"  {{'SUPPORT.PAYMENT.BANK' | translate}} || " +
								"  {{support.how.title | translate}} : {{support.how.value}}</p> " +
								"<p *ngIf=\"support.method=='store'\">{{'SUPPORT.SUCCESS.INSTRUCTIONS' | translate}}: " +
								"  {{'SUPPORT.PAYMENT.STORE' | translate}} </p> ",
							icon: 'success'
						})
					},
					error => {
						let message = 'SUPPORT.ERROR.SUPPORTING';
						if (error.status === 404) message = 'SUPPORT.ERROR.' + error.error.message.split('Not Found: ')[1];
						Swal.fire(
							this.translate.instant('SUPPORT.ERROR.TITLE'),
							this.translate.instant(message),
							'error'
						);
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

	onSubmit() {

		if (this.loading) return;
		this.loading = true;

		const controls = this.microcreditForm.controls;
		/** check form */
		if (this.microcreditForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.loading = false;
			return;
		}
		console.log(controls)
		this.openDataService.oneClickRegistration(controls.email.value)
			.pipe(
				tap(
					data => {
						this.oneClickToken = data;
						console.log(data);
						this.oneClickSupport(controls);
					},
					error => {
						Swal.fire(
							this.translate.instant('SUPPORT.ERROR.REGISTRATION'),
							this.translate.instant(error),
							'error'
						);
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

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
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
