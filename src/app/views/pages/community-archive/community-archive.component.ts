import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';

import { OpenDataService } from '../../../core/services/open-data.service';
import { Merchant } from '../../../core/models/merchant.model';

@Component({
  selector: 'app-community-archive',
  templateUrl: './community-archive.component.html',
  styleUrls: ['./community-archive.component.scss']
})
export class CommunityArchiveComponent implements OnInit {
	p:number = 1;
	loading: boolean = false;
	private unsubscribe: Subject<any>;	
	merchants: Merchant[];
	
	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.fetchMerchantsData();
	}
	
	fetchMerchantsData() {
		this.openDataService.readMerchants()
			.pipe(
				tap(
					data => {
						this.merchants = data;
						console.log(this.merchants)
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

}
