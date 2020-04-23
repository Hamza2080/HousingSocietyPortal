import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPlotDetailModalComponent } from './view-plot-detail-modal.component';


describe('ViewPlotDetailModalComponent', () => {
  let component: ViewPlotDetailModalComponent;
  let fixture: ComponentFixture<ViewPlotDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlotDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlotDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
