import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
//import { LoadJsonService } from '../../../core/services/loadjson.service';
import { Subject } from 'rxjs';
import { tap, takeUntil, finalize } from 'rxjs/operators';
// RxJS
import { Observable, of } from 'rxjs';
import { summaryFileName } from '@angular/compiler/src/aot/util';

// Services & Models
import { OpenDataService } from '../../../core/services/open-data.service';
import { Partner } from '../../../core/models/partner.model';

export interface Marker {
	lat: number;
	lng: number;
	img: string;
	name: string;
	address: string;
	label?: string;
	draggable: boolean;
}

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	@Input() partner_id?: string;

	singlePartner: boolean = false;
	//list: any;

	latitude: number = 37.978157;
	longitude: number = 23.731748;
	zoom: number = 12;

	markers: Marker[] = new Array;

	public partner: Partner;
	public partners: Partner[];

	loading: boolean = false;
	private unsubscribe: Subject<any>;

	pin = {
		url: 'assets/media/images/pin.png',
		scaledSize: {
			width: 15,
			height: 15
		}
	};

	mapStyle = [{ "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }, { "visibility": "off" }] }, { "featureType": "administrative.neighborhood", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "visibility": "on" }, { "color": "#e0dfe0" }] }, { "featureType": "landscape", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#a8a9a8" }, { "visibility": "on" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#5b5b5a" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#ffffff" }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "off" }] }];

	constructor(
		//private loadData : LoadJsonService,
		private cdRef: ChangeDetectorRef,
		private openDataService: OpenDataService
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		if (this.partner_id) {
			this.fetchPartnerData(this.partner_id);
			this.singlePartner = true;
		} else {
			this.fetchPartnersData();
		}
		/*this.loadData.getJSON('partners').subscribe(data => {
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

	addressToMap(partner: Partner) {
		return {
			lat: (partner.address) ? parseFloat(partner.address.coordinates[0]) : 0.0,
			lng: (partner.address) ? parseFloat(partner.address.coordinates[1]) : 0.0,
			img: partner.imageURL,
			name: partner.name,
			slug: partner.slug,
			address: (partner.address) ? (partner.address.street + ", " + partner.address.city) : '',
			//label: '0',
			draggable: false
		}
	}

	fetchPartnersData() {
		this.openDataService.readPartners(`0-0-0`)
			.pipe(
				tap(
					data => {
						this.partners = data;
						//let x: marker[];
						// let x;
						// this.markers = [{

						// }]
						// if (this.partners[0].address !== null) {
						// 	this.markers = [this.addressToMap(this.partners[0])];
						// }
						var sumLat: number = 0, sumLong: number = 0, sumPins: number = 0;
						for (var i = 0; i < this.partners.length; i++) {
							if (this.partners[i].address) {
								this.markers.push(this.addressToMap(this.partners[i]));
								sumPins += 1;
								sumLat += (this.partners[i].address) ? parseFloat(this.partners[i].address.coordinates[0]) : 0.0;
								sumLong += (this.partners[i].address) ? parseFloat(this.partners[i].address.coordinates[1]) : 0.0;
							}
						}
						this.latitude = sumLat / sumPins;
						this.longitude = sumLong / sumPins;
						console.log("Markers: " + this.markers, "Lat: " + this.latitude, "Long: " + this.longitude);
						// let y = {
						// 	lat: (this.partners[i].address && this.partners[i].address.coordinates.length > 0) ? parseFloat(this.partners[i].address.coordinates[0]) : 0.0,
						// 	lng: (this.partners[i].address && this.partners[i].address.coordinates.length > 1) ? parseFloat(this.partners[i].address.coordinates[1]) : 0.0,
						// 	img: this.partners[i].imageURL,
						// 	name: this.partners[i].name,
						// 	slug: this.partners[i].slug,
						// 	address: (this.partners[i].address) ? this.partners[i].address.street + ", " + this.partners[i].address.city : '',
						// 	//label: i.toString(),
						// 	draggable: false
						// }
						// //console.log(y);

						//console.log(x);
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

	fetchPartnerData(partner_id: string) {
		this.openDataService.readPartnerInfo(partner_id)
			.pipe(
				tap(
					data => {
						this.partner = data;
						if (this.partner.address) {
							this.markers = [this.addressToMap(this.partner)];
						}
						//let x: marker[];
						// let x;
						// this.markers = [{
						// 	lat: parseFloat(this.partner.address.coordinates[0]),
						// 	lng: parseFloat(this.partner.address.coordinates[1]),
						// 	img: this.partner.imageURL,
						// 	name: this.partner.name,
						// 	address: this.partner.address.street + ", " + this.partner.address.city,
						// 	//label: '0',
						// 	draggable: false
						// }];
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

	getRandomInteger(num: number) {
		return Math.random() / num;
	}

}
