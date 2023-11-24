import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfilioSidebarComponent } from './afilio-sidebar.component';

describe('AfilioSidebarComponent', () => {
  let component: AfilioSidebarComponent;
  let fixture: ComponentFixture<AfilioSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfilioSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfilioSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
