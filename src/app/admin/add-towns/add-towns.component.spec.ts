import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTownsComponent } from './add-towns.component';

describe('AddTownsComponent', () => {
  let component: AddTownsComponent;
  let fixture: ComponentFixture<AddTownsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTownsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTownsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
