import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {

  public configAccess: Boolean[] = environment.access;
  public configSubAccess: Boolean[] = environment.subAccess;

  constructor() { }

  ngOnInit() {
  }

}
