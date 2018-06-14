import { TestBed, inject } from '@angular/core/testing';

import { BuildRunService } from './build-run.service';

describe('BuildRunService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildRunService]
    });
  });

  it('should be created', inject([BuildRunService], (service: BuildRunService) => {
    expect(service).toBeTruthy();
  }));
});
