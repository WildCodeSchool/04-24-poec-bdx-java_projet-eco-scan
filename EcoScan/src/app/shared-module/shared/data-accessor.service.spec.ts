import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DataAccessorService } from './data-accessor.service';
import { User } from '../models/classes/User.class';
import { map } from 'rxjs';

describe('DataAccessorService', () => {
  let service: DataAccessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(DataAccessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
