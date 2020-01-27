import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLandMeasuringComponent } from './add-land-measuring.component';

describe('AddLandMeasuringComponent', () => {
  let component: AddLandMeasuringComponent;
  let fixture: ComponentFixture<AddLandMeasuringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLandMeasuringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLandMeasuringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
