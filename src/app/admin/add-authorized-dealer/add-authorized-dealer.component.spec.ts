import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuthorizedDealerComponent } from './add-authorized-dealer.component';

describe('AddAuthorizedDealerComponent', () => {
  let component: AddAuthorizedDealerComponent;
  let fixture: ComponentFixture<AddAuthorizedDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAuthorizedDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAuthorizedDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
