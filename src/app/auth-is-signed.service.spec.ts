import { TestBed } from '@angular/core/testing';

import { AuthIsSignedService } from './auth-is-signed.service';

describe('AuthIsSignedService', () => {
  let service: AuthIsSignedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthIsSignedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
