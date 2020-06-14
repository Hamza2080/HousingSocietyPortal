import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePublicBuildingComponent } from './update-public-building.component';

describe('UpdatePublicBuildingComponent', () => {
  let component: UpdatePublicBuildingComponent;
  let fixture: ComponentFixture<UpdatePublicBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePublicBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePublicBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
