import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlotsComponent } from './add-plots.component';

describe('AddPlotsComponent', () => {
  let component: AddPlotsComponent;
  let fixture: ComponentFixture<AddPlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
