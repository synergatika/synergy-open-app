import { AsyncPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Sector } from '../models/sector.model';
import { ContentService } from '../services/content-data.service';

@Pipe({
  name: 'sector_filter',
  pure: false,
})
export class SectorFilterPipe implements PipeTransform {

  private sectors: Sector[];

  constructor(
    public translate: TranslateService,
    private contentService: ContentService
  ) {
    this.contentService.readSectors().subscribe((data) => {
      this.sectors = data;
    })
  }

  transform(sector_id: string, args?: Sector[]): any {
    const lang = this.translate.currentLang;

    if (this.sectors) {
      const sector: Sector = this.sectors.filter((o) => { return o._id == sector_id })[0];
      if (sector) return sector[`${lang}_title`];
      else return '';
    } else {
      return '';
    }

  }
}
