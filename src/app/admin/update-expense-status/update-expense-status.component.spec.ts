import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExpenseStatusComponent } from './update-expense-status.component';

describe('UpdateExpenseStatusComponent', () => {
  let component: UpdateExpenseStatusComponent;
  let fixture: ComponentFixture<UpdateExpenseStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateExpenseStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExpenseStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
