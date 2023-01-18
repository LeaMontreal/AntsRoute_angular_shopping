import { TestBed } from '@angular/core/testing';

import { AntsRouteFormServiceService } from './ants-route-form-service.service';

describe('AntsRouteFormServiceService', () => {
  let service: AntsRouteFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntsRouteFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
