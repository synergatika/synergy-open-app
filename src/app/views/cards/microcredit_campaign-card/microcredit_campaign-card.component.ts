import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Models & Interfaces
 */
import { MicrocreditCampaign } from '../../../core/models/microcredit-campaign.model';

@Component({
  selector: 'sng-microcredit_campaign-card',
  templateUrl: './microcredit_campaign-card.component.html',
  styleUrls: ['./microcredit_campaign-card.component.scss']
})
export class MicrocreditCampaignCardComponent implements OnInit {

  /**
   * Imported Variables
   */
  @Input() campaign: MicrocreditCampaign;
  @Input() type: any;

  seconds = 0;

  constructor(
  ) { }

  ngOnInit(): void {

    const now = new Date();
    this.seconds = parseInt(now.getTime().toString());

  }
}
