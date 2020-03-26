import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLandLordComponent } from './edit-land-lord.component';

describe('EditLandLordComponent', () => {
  let component: EditLandLordComponent;
  let fixture: ComponentFixture<EditLandLordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLandLordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLandLordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
