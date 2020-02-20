import { Component, OnInit } from '@angular/core';
import { LoadJsonService } from '../../../core/services/loadjson.service';
import { ActivatedRoute } from '@angular/router';
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
	microcreditId: any;
	coopId: any;
	microcredit$: Observable<any>;
	coop$: Observable<any>;
	microcreditForm: FormGroup;
	private routeSubscription: any;
	
	constructor(private route: ActivatedRoute, private loadData : LoadJsonService, private translate: TranslateService,private fb: FormBuilder,) { }

	ngOnInit() {
		this.initRegistrationForm();
		
		this.routeSubscription = this.route.params.subscribe(params => {
			this.microcreditId = params['id'];
			console.log(this.microcreditId);
			this.loadData.getJSON('microcredit').subscribe(data => {			
				//console.log('getJSON data - single microcredit');
				//console.log(data[this.microcreditId]);
				this.microcredit$ = of(data[this.microcreditId]);
				this.coopId = data[this.microcreditId]['coop_id'];
				this.loadData.getJSON('coops').subscribe(coops => {			
					//console.log('getJSON data');
					//console.log(coops[this.coopId]);
					this.coop$ = of(coops[this.coopId]);

				});
			});
		});
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
