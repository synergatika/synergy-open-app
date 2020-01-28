import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferSingleComponent } from './offer-single.component';

describe('OfferSingleComponent', () => {
  let component: OfferSingleComponent;
  let fixture: ComponentFixture<OfferSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
