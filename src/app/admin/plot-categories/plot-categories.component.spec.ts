import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotCategoriesComponent } from './plot-categories.component';

describe('PlotCategoriesComponent', () => {
  let component: PlotCategoriesComponent;
  let fixture: ComponentFixture<PlotCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
