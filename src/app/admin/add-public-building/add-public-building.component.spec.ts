import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPublicBuildingComponent } from './add-public-building.component';


describe('AddPublicBuildingComponent', () => {
  let component: AddPublicBuildingComponent;
  let fixture: ComponentFixture<AddPublicBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPublicBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPublicBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
