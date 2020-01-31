import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLandLordComponent } from './view-land-lord.component';

describe('ViewLandLordComponent', () => {
  let component: ViewLandLordComponent;
  let fixture: ComponentFixture<ViewLandLordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLandLordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLandLordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
