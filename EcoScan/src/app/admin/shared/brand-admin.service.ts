import { Injectable, inject } from '@angular/core';
import { DataAccessorService } from '../../shared-module/shared/services/data-accessor.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Brand } from '../../shared-module/models/types/Brand.type';

@Injectable({
  providedIn: 'root',
})
export class BrandAdminService {
  private DBAccessor = inject(DataAccessorService);
  public brandListSubject$: BehaviorSubject<Brand[]> = new BehaviorSubject<Brand[]>([]);
  brandList$ = this.brandListSubject$.asObservable();

  constructor() {
    this.updateBrandList();
  }

  getBrandList$(): Observable<Brand[]> {
    return this.brandList$;
  }

  addBrand(newBrand: Brand): void {
    this.DBAccessor.addBrand$(newBrand).subscribe(
      brand => {
        this.updateBrandList()
      }
    );
  }

  getBrands$(): Observable<Brand[]> {
    return this.DBAccessor.getAllBrands$();
  }

  updateBrandList(): void {
    this.DBAccessor.getAllBrands$().subscribe(
      brands => this.brandListSubject$.next(brands)
    );
  }

  deleteBrand(brand: Brand): void {
    this.DBAccessor.deleteBrand(brand).subscribe(
      newBrand => {
        this.updateBrandList();
      }
    );
  }


}
