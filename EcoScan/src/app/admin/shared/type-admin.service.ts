import { Injectable, inject } from '@angular/core';
import { DataAccessorService } from '../../shared-module/shared/data-accessor.service';
import { Type } from '../../shared-module/models/types/Type.type';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeAdminService {

  private DBAccessor = inject(DataAccessorService);
  public typeListSubject$: BehaviorSubject<Type[]> = new BehaviorSubject<Type[]>([]);
  typeList$ = this.typeListSubject$.asObservable();

  constructor() {
    this.updateTypeList();
  }

  getTypeList$(): Observable<Type[]> {
    return this.typeList$;
  }

  addType(newType: Type): void {
    this.DBAccessor.addType$(newType).subscribe(
      type => {
        this.updateTypeList()
      }
    );
  }

  updateTypeList(): void {
    this.DBAccessor.getAllTypes$().subscribe(
      types => this.typeListSubject$.next(types)
    );
  }

  // deleteType(type: Type): void {
  //   this.DBAccessor.deleteType(type).subscribe(
  //     newType => {
  //       this.updateTypeList();
  //     }
  //   );
  // }

}
