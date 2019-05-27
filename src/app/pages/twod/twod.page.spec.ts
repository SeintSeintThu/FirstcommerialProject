import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TwoDeePage } from './twod.page';



describe('TwoDeeComponent', () => {
  let component: TwoDeePage;
  let fixture: ComponentFixture<TwoDeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoDeePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoDeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
