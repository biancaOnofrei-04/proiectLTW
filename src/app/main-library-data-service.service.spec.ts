import { TestBed } from '@angular/core/testing';

import { MainLibraryDataServiceService } from './main-library-data-service.service';

describe('MainLibraryDataServiceService', () => {
  let service: MainLibraryDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainLibraryDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
