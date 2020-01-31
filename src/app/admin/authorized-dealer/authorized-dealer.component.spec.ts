import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedDealerComponent } from './authorized-dealer.component';

describe('AuthorizedDealerComponent', () => {
  let component: AuthorizedDealerComponent;
  let fixture: ComponentFixture<AuthorizedDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizedDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizedDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
