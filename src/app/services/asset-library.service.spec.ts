import { TestBed } from '@angular/core/testing';

import { AssetLibraryService } from './asset-library.service';

describe('AssetLibraryService', () => {
  let service: AssetLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
