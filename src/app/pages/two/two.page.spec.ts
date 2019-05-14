import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoPage } from './two.page';

describe('TwoComponent', () => {
  let component: TwoPage;
  let fixture: ComponentFixture<TwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
