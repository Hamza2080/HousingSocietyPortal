import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlotsComponent } from './view-plots.component';

describe('ViewPlotsComponent', () => {
  let component: ViewPlotsComponent;
  let fixture: ComponentFixture<ViewPlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
