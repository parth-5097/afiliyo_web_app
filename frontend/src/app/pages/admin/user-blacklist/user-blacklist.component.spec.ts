import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBlacklistComponent } from './user-blacklist.component';

describe('UserBlacklistComponent', () => {
  let component: UserBlacklistComponent;
  let fixture: ComponentFixture<UserBlacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBlacklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
