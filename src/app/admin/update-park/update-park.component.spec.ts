import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateParkComponent } from './update-park.component';


describe('UpdateParkComponent', () => {
  let component: UpdateParkComponent;
  let fixture: ComponentFixture<UpdateParkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateParkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
