import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPerticularItemComponent } from './view-perticular-item.component';

describe('ViewPerticularItemComponent', () => {
  let component: ViewPerticularItemComponent;
  let fixture: ComponentFixture<ViewPerticularItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPerticularItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPerticularItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
