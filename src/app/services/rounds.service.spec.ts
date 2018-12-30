import { TestBed } from '@angular/core/testing';

import { RoundsService } from './rounds.service';

describe('RoundsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoundsService = TestBed.get(RoundsService);
    expect(service).toBeTruthy();
  });
});
