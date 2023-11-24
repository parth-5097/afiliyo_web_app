import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPerticularPostComponent } from './view-perticular-post.component';

describe('ViewPerticularPostComponent', () => {
  let component: ViewPerticularPostComponent;
  let fixture: ComponentFixture<ViewPerticularPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPerticularPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPerticularPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
