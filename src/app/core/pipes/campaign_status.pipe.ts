import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { MicrocreditCampaign } from '../models/microcredit-campaign.model';

@Pipe({
  name: 'campaign_status',
  pure: false,
})
export class CampaignStatusPipe implements PipeTransform {

  constructor(public translate: TranslateService,
  ) {

  }

  transform(campaign: MicrocreditCampaign, args?: string): any {

    const now = new Date();
    const seconds: number = parseInt(now.getTime().toString());

    let _text: string = '', _date: string = '';
    if (campaign.status === 'draft') {
      _text = this.translate.instant('CAMPAIGN.STATUS.DRAFT');
    } else if (campaign.startsAt > seconds) {
      _text = this.translate.instant('CAMPAIGN.STATUS.EXPECTED');
    } else if ((campaign.startsAt < seconds) && (campaign.expiresAt > seconds)) {
      _text = this.translate.instant('GENERAL.TO');
      _date = new DatePipe('en-US').transform(campaign.expiresAt, 'd.M');
    } else if (campaign.expiresAt < seconds) {
      _text = this.translate.instant('CAMPAIGN.STATUS.REDEEM_TO');
      _date = new DatePipe('en-US').transform(campaign.redeemEnds, 'd.M');
    }

    return `${_text} ${_date}`;
  }
}
