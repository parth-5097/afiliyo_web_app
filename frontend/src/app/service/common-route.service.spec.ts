import { TestBed } from '@angular/core/testing';

import { CommonRouteService } from './common-route.service';

describe('CommonRouteService', () => {
  let service: CommonRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
