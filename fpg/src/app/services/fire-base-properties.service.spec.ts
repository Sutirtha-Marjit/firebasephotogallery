import { TestBed, inject } from '@angular/core/testing';

import { FireBasePropertiesService } from './fire-base-properties.service';

describe('FireBasePropertiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireBasePropertiesService]
    });
  });

  it('should be created', inject([FireBasePropertiesService], (service: FireBasePropertiesService) => {
    expect(service).toBeTruthy();
  }));
});
