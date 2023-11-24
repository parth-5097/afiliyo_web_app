import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarConHFLayoutComponent } from './car-con-hf-layout.component';

describe('CarConHFLayoutComponent', () => {
  let component: CarConHFLayoutComponent;
  let fixture: ComponentFixture<CarConHFLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarConHFLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarConHFLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
