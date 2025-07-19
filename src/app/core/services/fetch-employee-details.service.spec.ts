import { TestBed } from '@angular/core/testing';

import { FetchEmployeeDetailsService } from './fetch-employee-details.service';

describe('FetchEmployeeDetailsService', () => {
  let service: FetchEmployeeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchEmployeeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
