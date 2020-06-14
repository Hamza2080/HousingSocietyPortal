import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicBuildingComponent } from './public-building.component';


describe('PublicBuildingComponentComponent', () => {
  let component: PublicBuildingComponent;
  let fixture: ComponentFixture<PublicBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
