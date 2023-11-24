import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerApplyComponent } from './influencer-apply.component';

describe('InfluencerApplyComponent', () => {
  let component: InfluencerApplyComponent;
  let fixture: ComponentFixture<InfluencerApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
