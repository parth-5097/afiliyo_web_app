import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfilioApplyFooterComponent } from './afilio-apply-footer.component';

describe('AfilioApplyFooterComponent', () => {
  let component: AfilioApplyFooterComponent;
  let fixture: ComponentFixture<AfilioApplyFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfilioApplyFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfilioApplyFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
