import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataAccessorService } from '../services/data-accessor.service';
import { Bin } from '../../models/types/Bin.type';

export const mapDependenciesResolver: ResolveFn<Bin[]> = (route, state) => {
  const DBAccessor = inject(DataAccessorService);

  return DBAccessor.getAllBins$();
};
