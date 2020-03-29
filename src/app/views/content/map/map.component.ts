import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
//import { LoadJsonService } from '../../../core/services/loadjson.service';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
// RxJS
import { Observable, of } from 'rxjs';
import { OpenDataService } from '../../../core/services/open-data.service';
import { Merchant } from '../../../core/models/merchant.model';

export interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	@Input() merchId?: string;
	singleMerchant: boolean = false;
	list: any;
	latitude: number = 37.978157;
	longitude: number = 23.731748;
	zoom: number = 12;
	markers;
	loading: boolean = false;
	private unsubscribe: Subject<any>;
	pin = {
		url: 'assets/media/images/pin.png',
		scaledSize: {
			width: 15,
			height: 15
		}
	};
	merchants: Merchant[];
	merchant: Merchant;
	mapStyle = [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"},{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"color":"#e0dfe0"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#a8a9a8"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#5b5b5a"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]}];
	
	constructor(
		//private loadData : LoadJsonService,
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		if(this.merchId) {
			this.fetchMerchantData(this.merchId);
			this.singleMerchant = true;
		} else {
			this.fetchMerchantsData();
		}
		/*this.loadData.getJSON('coops').subscribe(data => {
			Object.keys(data).map((key, index) => {
				data[key]['lat'] = 38.1608 + this.getRandomInteger(4);
				data[key]['long'] = 23.2159 + this.getRandomInteger(2);
				data[key]['draggable'] = false;
			});
			this.list = Object.values(data);
			//console.log(this.list);
		});*/
	  
	}
	
	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	fetchMerchantsData() {
		this.openDataService.readMerchants()
			.pipe(
				tap(
					data => {
						this.merchants = data;
						//let x: marker[];
						let x;
						this.markers = [{
							lat: parseFloat(this.merchants[0].address.coordinates[0]),
							lng: parseFloat(this.merchants[0].address.coordinates[1]),
							img: this.merchants[0].imageURL,
							name: this.merchants[0].name,
							slug: this.merchants[0].slug,
							address: this.merchants[0].address.street + ", " + this.merchants[0].address.city,
							//label: '0',
							draggable: false
						}]
						for (var i = 1; i < this.merchants.length; i++) {
							let y = {
								lat: parseFloat(this.merchants[i].address.coordinates[0]),
								lng: parseFloat(this.merchants[i].address.coordinates[1]),
								img: this.merchants[i].imageURL,
								name: this.merchants[i].name,
								slug: this.merchants[i].slug,
								address: this.merchants[i].address.street + ", " + this.merchants[i].address.city,
								//label: i.toString(),
								draggable: false
							}
							//console.log(y);
							this.markers.push(y);
						}
						//console.log(x);
						console.log(this.markers);
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
	
	fetchMerchantData(id) {
		this.openDataService.readMerchantInfo(id)
			.pipe(
				tap(
					data => {
						this.merchant = data;
						//let x: marker[];
						let x;
						this.markers = [{
							lat: parseFloat(this.merchant.address.coordinates[0]),
							lng: parseFloat(this.merchant.address.coordinates[1]),
							img: this.merchant.imageURL,
							name: this.merchant.name,
							address: this.merchant.address.street + ", " + this.merchant.address.city,
							//label: '0',
							draggable: false
						}];
						this.latitude = this.markers[0]['lat'];
						this.longitude = this.markers[0]['lng'];
						this.zoom = 15;
						//console.log(x);
						//console.log(this.markers);
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
	
	getRandomInteger(num) {
		return Math.random()/num;
	}

}
