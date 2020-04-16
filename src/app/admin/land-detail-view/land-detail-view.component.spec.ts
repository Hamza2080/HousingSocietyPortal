import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LandDetailViewComponent } from './land-detail-view.component';


describe('LandDetailViewComponent', () => {
  let component: LandDetailViewComponent;
  let fixture: ComponentFixture<LandDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
