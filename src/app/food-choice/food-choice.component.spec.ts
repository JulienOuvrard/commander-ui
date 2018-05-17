import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodChoiceComponent } from './food-choice.component';

describe('FoodChoiceComponent', () => {
  let component: FoodChoiceComponent;
  let fixture: ComponentFixture<FoodChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
