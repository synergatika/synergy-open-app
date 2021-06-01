import { Component, OnInit, Input } from '@angular/core';

/**
 * Models & Interfaces
 */
import { Partner } from '../../../core/models/partner.model';
import { GeneralList } from '../../../core/interfaces/general-list.interface';

/**
 * Services
 */
import { StaticDataService } from '../../../core/services/static-data.service';

@Component({
  selector: 'sng-partner-card',
  templateUrl: './partner-card.component.html',
  styleUrls: ['./partner-card.component.scss']
})
export class PartnerCardComponent implements OnInit {

  /**
   * Imported Variables
   */
  @Input() partner: Partner;

//  public sectorsList: GeneralList[];
//  public sector: string;
  constructor(
    private staticDataService: StaticDataService
  ) {
    // this.sectorsList = this.staticDataService.getSectorsList;
  }

  ngOnInit(): void {
    // this.sector = this.sectorsList.filter((el) => {
    //   return el.value == this.partner.sector
    // })[0].title;
  }
}
