import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandApplyComponent } from './brand-apply.component';

describe('BrandApplyComponent', () => {
  let component: BrandApplyComponent;
  let fixture: ComponentFixture<BrandApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
