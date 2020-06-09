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

import {
	IPayPalConfig,
	ICreateOrderRequest
} from 'ngx-paypal';

@Component({
	selector: 'app-microcredit-single',
	templateUrl: './microcredit-single.component.html',
	styleUrls: ['./microcredit-single.component.scss']
})
export class MicrocreditSingleComponent implements OnInit {

	public paymentsList: any[];
	paymentDetails: PaymentDetails;

	oneClickToken: any;
	showPaypalButton: boolean = false;
	showAddStep: boolean = true;
	showSubStep: boolean = true;

	public step: boolean = false;
	tempAmount: number = 0;

	merchId: string;
	campaignId: string;
	registrationForm: FormGroup;
	supportingForm: FormGroup;
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

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}


	fetchCampaignData(merch_id: string, campaign_id: string) {
		this.openDataService.readMicrocreditCampaign(merch_id, campaign_id)
			.pipe(
				tap(
					data => {
						this.campaign = data;
						console.log(this.campaign);
						this.initRegistrationForm();
						this.initSupportingForm();
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

	initRegistrationForm() {
		this.registrationForm = this.fb.group({
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			],
		});
	}

	initSupportingForm() {
		const currentMethodsArray = (this.campaign.partner_payments).map(a => a.bic);
		const validatePaymentList = this.paymentsList.filter(function (el) {
			return currentMethodsArray.includes(el.bic);
		});
		this.paymentsList = validatePaymentList;

		this.supportingForm = this.fb.group({
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

		const controls = this.supportingForm.controls;
		controls['amount'].setValue(this.campaign.minAllowed);
		this.showSubStep = false;
		controls['method'].setValue(this.paymentsList[0].bic);
		this.tempAmount = this.campaign.minAllowed;
		this.onPaymentChange(this.paymentsList[0].bic)
	}

	oneClickSupport(controls: { [x: string]: AbstractControl; amount?: any; method?: any; }) {
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
						Swal.fire(
							this.translate.instant('SUPPORT.SUCCESS.TITLE'),
							this.translate.instant('SUPPORT.SUCCESS.PAYMENT_ID') + ": " + this.paymentDetails.payment_id + "\n\n" +
							this.translate.instant('SUPPORT.SUCCESS.INSTRUCTIONS') + ": " + this.translate.instant('SUPPORT.BANK') + "\n" + " || " +
							this.translate.instant(this.paymentDetails.how['title']) + ": " + this.paymentDetails.how['value'],

							// "<p>{{ 'SUPPORT.SUCCESS.PAYMENT_ID' | translate }}: {{paymentDetails.payment_id}}</p> " +
							// "<p *ngIf=\"paymentDetails.method!='store'\">{{ 'SUPPORT.SUCCESS.INSTRUCTIONS' | translate }}: " +
							// "  {{ 'SUPPORT.PAYMENT.BANK' | translate }} || " +
							// "  {{paymentDetails.how.title | translate}} : {{paymentDetails.how.value}}</p> " +
							// "<p *ngIf=\"paymentDetails.method=='store'\">{{ 'SUPPORT.SUCCESS.INSTRUCTIONS' | translate }}: " +
							// "  {{ 'SUPPORT.PAYMENT.STORE' | translate }} </p> ",
							'success'
						)
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

	onSubmitRegistration() {
		if (this.loading) return;
		this.loading = true;

		const controls = this.registrationForm.controls;
		/** check form */
		if (this.registrationForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.loading = false;
			return;
		}

		this.step = true;
		this.loading = false;
	}

	onSubmitSupporting() {

		if (this.loading) return;
		this.loading = true;

		const controls = this.supportingForm.controls;
		/** check form */
		if (this.supportingForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.loading = false;
			return;
		}

		this.openDataService.oneClickRegistration(this.registrationForm.controls.email.value)
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

	onChangeAmount(action: boolean) {
		const controls = this.supportingForm.controls;
		this.tempAmount = (action) ? (controls.amount.value + this.campaign.stepAmount) : (controls.amount.value - this.campaign.stepAmount);

		this.showAddStep = (this.tempAmount >= this.campaign.maxAllowed) ? false : true;
		this.showSubStep = (this.tempAmount <= this.campaign.minAllowed) ? false : true;

		controls['amount'].setValue(this.tempAmount);
		this.onPaymentChange(controls.method.value)
	}

	// addStep() {
	// 	const controls = this.supportingForm.controls;
	// 	this.tempAmount = controls.amount.value + this.campaign.stepAmount;
	// 	if (this.tempAmount <= this.campaign.maxAllowed) {
	// 		controls['amount'].setValue(this.tempAmount);
	// 	}
	// 	this.onPaymentChange(controls.method.value)
	// }

	// subStep() {
	// 	const controls = this.supportingForm.controls;
	// 	this.tempAmount = controls.amount.value - this.campaign.stepAmount;
	// 	if (this.tempAmount >= this.campaign.minAllowed) {
	// 		controls['amount'].setValue(this.tempAmount);
	// 	}
	// 	this.onPaymentChange(controls.method.value)
	// }

	onPreviousStep() {
		this.step = false;
	}

	onPaymentChange(payment: string) {
		if (payment === 'PAYPAL') {
			this.showPaypalButton = true;
			this.initConfig(this.tempAmount, this.campaign.partner_payments.filter((el) => {
				return el.bic == payment
			})[0].value);
		} else {
			this.showPaypalButton = false;
		}
	}

	public payPalConfig?: IPayPalConfig;

	private initConfig(amount: number, payee: string): void {

		const controls = this.supportingForm.controls;
		if (this.supportingForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		const paymentDetails = {
			amount: amount.toString(),
			payee: payee
		}
		console.log(paymentDetails);
		this.payPalConfig = {
			currency: 'EUR',
			clientId: 'AZTnZ-SdPrcXmAIWdQHEtOuCk1u8Y9CSAerEDxwkokKydC68Si2MdDk1kKzBkij0T1R8C78896SeCEKV',
			createOrderOnClient: (data) => <ICreateOrderRequest>{
				intent: 'CAPTURE',
				purchase_units: [
					{
						amount: {
							currency_code: 'EUR',
							value: paymentDetails.amount,
							breakdown: {
								item_total: {
									currency_code: 'EUR',
									value: paymentDetails.amount,
								}
							}
						},
						payee: {
							merchant_id: 'JCE5DLUCP5L38',
							//		email_address: paymentDetails.payee//'partner@synergy.io'
						},
						items: [
							{
								name: this.campaign.title,
								quantity: '1',
								category: 'DIGITAL_GOODS',
								unit_amount: {
									currency_code: 'EUR',
									value: paymentDetails.amount,
								},
							}
						]
					}
				]
			},
			advanced: {
				commit: 'true'
			},
			style: {
				label: 'paypal',
				layout: 'horizontal',
				size: 'responsive',
			},
			onApprove: (data, actions) => {
				console.log('onApprove - transaction was approved, but not authorized', data, actions);
				actions.order.get().then((details: any) => {
					console.log('onApprove - you can get full order details inside onApprove: ', details);
				});
			},
			onClientAuthorization: (data) => {
				console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
				this.onSubmitSupporting();
				//	this.showSuccess = true;
			},
			onCancel: (data, actions) => {
				console.log('OnCancel', data, actions);
			},
			onError: err => {
				console.log('OnError', err);
			},
			onClick: (data, actions) => {

				console.log('onClick', data, actions);


			},
		};
	}




	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isRegistrationControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registrationForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}

	/**
 * Checking control validation
 *
 * @param controlName: string => Equals to formControlName
 * @param validationType: string => Equals to valitors name
 */
	isSupportingControlHasError(controlName: string, validationType: string): boolean {
		const control = this.supportingForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}

}
