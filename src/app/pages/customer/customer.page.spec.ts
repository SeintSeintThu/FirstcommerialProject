import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPage } from './customer.page';

describe('CustomerPage', () => {
  let component: CustomerPage;
  let fixture: ComponentFixture<CustomerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
