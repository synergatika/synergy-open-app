import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  public configAccess: Boolean[] = environment.access;
  public configSubAccess: Boolean[] = environment.subAccess;

  constructor() { }

  ngOnInit() {
  }

}
