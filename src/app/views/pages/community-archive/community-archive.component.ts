import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';

// Services & Models
import { OpenDataService } from '../../../core/services/open-data.service';
import { Partner } from '../../../core/models/partner.model';

@Component({
	selector: 'app-community-archive',
	templateUrl: './community-archive.component.html',
	styleUrls: ['./community-archive.component.scss']
})
export class CommunityArchiveComponent implements OnInit {
	p: number = 1;
	public partners: Partner[];

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	constructor(
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService,
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.fetchPartnersData();
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
						this.partners = data;
						console.log(this.partners)
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
}
