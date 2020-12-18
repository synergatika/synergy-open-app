import { Component, OnInit, Input } from '@angular/core';
import { Offer } from '../../../model';

@Component({
  selector: 'sng-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {
  @Input() offer: Offer;
  @Input() type: string;

  seconds = 0;

  constructor() { }

  ngOnInit(): void {
    const now = new Date();
    this.seconds = parseInt(now.getTime().toString());
  }

}
