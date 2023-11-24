import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorSliderComponent } from './calculator-slider.component';

describe('CalculatorSliderComponent', () => {
  let component: CalculatorSliderComponent;
  let fixture: ComponentFixture<CalculatorSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
