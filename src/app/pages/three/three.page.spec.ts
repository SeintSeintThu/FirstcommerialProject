import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreePage } from './three.page';

describe('ThreeComponent', () => {
  let component: ThreePage;
  let fixture: ComponentFixture<ThreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
