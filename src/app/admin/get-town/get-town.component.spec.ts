import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTownComponent } from './get-town.component';

describe('GetTownComponent', () => {
  let component: GetTownComponent;
  let fixture: ComponentFixture<GetTownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetTownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
