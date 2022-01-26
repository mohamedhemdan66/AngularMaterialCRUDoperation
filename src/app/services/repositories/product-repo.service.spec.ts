import { TestBed } from '@angular/core/testing';

import { ProductRepoService } from './product-repo.service';

describe('ProductRepoService', () => {
  let service: ProductRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
