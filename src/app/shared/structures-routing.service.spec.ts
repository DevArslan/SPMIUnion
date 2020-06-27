import { TestBed } from '@angular/core/testing';

import { StructuresRoutingService } from './structures-routing.service';

describe('StructuresRoutingService', () => {
  let service: StructuresRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StructuresRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
