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

  public _text: string = '';
  public _date: number = 0;

  // seconds = 0;

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.filterCampaign(this.campaign);
  }

  filterCampaign(campaign: MicrocreditCampaign) {
    // const now = new Date();
    // const seconds = parseInt(now.getTime().toString());
    // if (campaign.startsAt > seconds) {
    //   this._date = campaign.startsAt;
    //   this._text = this.translate.instant('CAMPAIGN.STATUS.EXPECTED');
    //   // this._text = this.translate.instant('CAMPAIGN.STATUS.EXPECTED');
    // } else if ((campaign.expiresAt > seconds) && (seconds > campaign.startsAt)) {
    //   this._date = campaign.expiresAt;
    //   this._text = this.translate.instant('GENERAL.TO');
    //   // this._text = this.translate.instant('GENERAL.TO');
    // } else if (seconds > campaign.expiresAt) {
    //   this._date = campaign.redeemEnds;
    //   this._text = this.translate.instant('CAMPAIGN.STATUS.REDEEM_TO');
    //   // this._text = this.translate.instant('CAMPAIGN.STATUS.REDEEM_TO');
    // }
  }
}
