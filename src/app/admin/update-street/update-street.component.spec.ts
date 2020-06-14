import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateStreetComponent } from './update-street.component';


describe('UpdateStreetComponent', () => {
  let component: UpdateStreetComponent;
  let fixture: ComponentFixture<UpdateStreetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStreetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
