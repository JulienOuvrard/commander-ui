import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkChoiceComponent } from './drink-choice.component';

describe('DrinkChoiceComponent', () => {
  let component: DrinkChoiceComponent;
  let fixture: ComponentFixture<DrinkChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
