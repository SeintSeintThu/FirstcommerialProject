import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreeDeePage } from './threed.page';



describe('ThreeDeeComponent', () => {
  let component: ThreeDeePage;
  let fixture: ComponentFixture<ThreeDeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeDeePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeDeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
