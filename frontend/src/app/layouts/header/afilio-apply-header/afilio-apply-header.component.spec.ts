import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfilioApplyHeaderComponent } from './afilio-apply-header.component';

describe('AfilioApplyHeaderComponent', () => {
  let component: AfilioApplyHeaderComponent;
  let fixture: ComponentFixture<AfilioApplyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfilioApplyHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfilioApplyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
