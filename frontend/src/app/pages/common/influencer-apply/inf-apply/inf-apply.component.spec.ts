import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfApplyComponent } from './inf-apply.component';

describe('InfApplyComponent', () => {
  let component: InfApplyComponent;
  let fixture: ComponentFixture<InfApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
