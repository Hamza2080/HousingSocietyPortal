import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentPlanComponent } from './add-payment-plan.component';

describe('AddPaymentPlanComponent', () => {
  let component: AddPaymentPlanComponent;
  let fixture: ComponentFixture<AddPaymentPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPaymentPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
