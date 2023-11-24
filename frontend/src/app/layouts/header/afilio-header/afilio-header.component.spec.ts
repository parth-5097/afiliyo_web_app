import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfilioHeaderComponent } from './afilio-header.component';

describe('AfilioHeaderComponent', () => {
  let component: AfilioHeaderComponent;
  let fixture: ComponentFixture<AfilioHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfilioHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfilioHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
