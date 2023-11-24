import { TestBed } from '@angular/core/testing';

import { AdminRouteService } from './admin-route.service';

describe('AdminRouteService', () => {
  let service: AdminRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
