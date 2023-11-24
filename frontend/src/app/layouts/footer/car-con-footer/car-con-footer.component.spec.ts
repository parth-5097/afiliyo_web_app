import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarConFooterComponent } from './car-con-footer.component';

describe('CarConFooterComponent', () => {
  let component: CarConFooterComponent;
  let fixture: ComponentFixture<CarConFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarConFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarConFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
