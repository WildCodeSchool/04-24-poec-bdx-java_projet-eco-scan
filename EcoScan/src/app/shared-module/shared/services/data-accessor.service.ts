import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Promo } from '../../models/types/Promo.type';
import { environment } from '../../../../environments/environment';
import { Rubbish } from '../../models/types/Rubbish.type';
import { AuthResponse } from '../../models/types/Login.type';
import { StagedRubbish } from '../../models/types/StagedRubbish.type';
import { Bin } from '../../models/types/Bin.type';
import { Deposit } from '../../models/types/Deposits.type';
import { Brand } from '../../models/types/Brand.type';
import { GetUser } from '../../models/types/GetUser.type';
import { Type } from '../../models/types/Type.type';
import { Credential } from '../../../host/models/credential.type';
import { UserForm } from '../../../host/models/user.type';
import { SendUser } from '../../models/types/SendUser.type';

@Injectable({
  providedIn: 'root',
})
export class DataAccessorService {
  private httpOptions!: object;

  constructor(private http: HttpClient) { }

  handleFailure(err: HttpErrorResponse): void {
    throw 'Connection to DB failure: ' + err.message;
  }

  /*
     Auth
  */
  authenticateUser$(login: Credential): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.database.path}/auth/authenticate`,
      login
    );
  }

  /*
     register
  */
  // fetch
  getUserLogin$(id: string): Observable<AuthResponse> {
    return this.http
      .get<AuthResponse>(`${environment.database.path}/logins/${id}`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  // Create
  addUserAndLogin$(newLogin: UserForm): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.database.path}/auth/register`,
      newLogin
    );
  }

  /*
     Users
  */
  // fetch
  getAllUsers$(): Observable<GetUser[]> {
    return this.http
      .get<GetUser[]>(`${environment.database.path}/user/get/all`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  getUserByID$(id: number): Observable<GetUser> {
    return this.http
      .get<GetUser>(`${environment.database.path}/user/get/${id}`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  getUserByEmail$(email: string): Observable<GetUser> {
    return this.http
      .get<GetUser>(`${environment.database.path}/user/get/email/${email}`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  // Create
  addUser$(newUser: GetUser): Observable<GetUser> {
    return this.http
      .post<GetUser>(`${environment.database.path}/user/add`, newUser)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  // Update
  updateUser$(updatedUser: GetUser): Observable<GetUser> {
    return this.http
      .put<GetUser>(
        `${environment.database.path}/user/update/${updatedUser.id}`,
        updatedUser
      )
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  updateUsersPoints$(updatedUser: SendUser): Observable<SendUser> {
    return this.http
      .put<SendUser>(
        `${environment.database.path}/user/update/${updatedUser.id}`,
        updatedUser
      )
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }



  /*
     rubbishItems
  */

  getRubbishByID$(id: string): Observable<Rubbish> {
    return this.http
      .get<Rubbish>(`${environment.database.path}/rubbish/get/${id}`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  addRubbish$(newRubbish: Rubbish): Observable<Rubbish> {
    return this.http
      .post<Rubbish>(`${environment.database.path}/rubbish/add`, newRubbish)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }


  /*
     StagedRubbish
  */

  // fetch
  getMystaged$(id: string): Observable<StagedRubbish> {
    return this.http
      .get<StagedRubbish>(`${environment.database.path}/staged/get/${id}`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  /*
     stagingArea
  */
  // fetch
  getStagedRubbishByID$(id: string): Observable<StagedRubbish> {
    return this.http
      .get<StagedRubbish>(`${environment.database.path}/staged/${id}`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  // Create
  addStagedRubbish$(
    newStagedRubbish: StagedRubbish
  ): Observable<StagedRubbish> {
    return this.http
      .post<StagedRubbish>(
        `${environment.database.path}/staged/add/${newStagedRubbish.id}`,
        newStagedRubbish
      )
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  /*
     bins
  */
  // fetch
  getAllBins$(): Observable<Bin[]> {
    return this.http
      .get<Bin[]>(`${environment.database.path}/bin/get/all`, this.httpOptions)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  getBinByID$(id: string): Observable<Bin> {
    return this.http
      .get<Bin>(`${environment.database.path}/bin/get/${id}`, this.httpOptions)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  /*
     deposits
  */
  // fetch
  getAllDeposits$(): Observable<Deposit[]> {
    return this.http
      .get<Deposit[]>(`${environment.database.path}/deposit/get/all`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  getDepositByID$(id: string): Observable<Deposit> {
    return this.http
      .get<Deposit>(`${environment.database.path}/deposit/get/${id}`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  // Create
  addDeposit$(newDeposit: Deposit): Observable<Deposit> {
    return this.http
      .post<Deposit>(`${environment.database.path}/deposit/add`, newDeposit)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  /*
     promos
  */
  // fetch
  getAllPromos$(): Observable<Promo[]> {
    return this.http
      .get<Promo[]>(`${environment.database.path}/promos/get/all`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  getPromoByID$(id: string): Observable<Promo> {
    return this.http
      .get<Promo>(`${environment.database.path}/promos/get/${id}`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  // Create
  addPromo$(newPromo: Promo): Observable<Promo> {
    return this.http
      .post<Promo>(`${environment.database.path}/promos/add`, newPromo)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  // Update
  updatePromo$(updatedPromo: Promo): Observable<Promo> {
    return this.http
      .put<Promo>(
        `${environment.database.path}/promo/update/${updatedPromo.id}`,
        updatedPromo
      )
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  deletePromo(promoToDelete: Promo): Observable<void> {
    return this.http
      .delete<void>(
        `${environment.database.path}/promos/delete/${promoToDelete.id}`
      )
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  /*
    UserPromo
  */
  // post
  addUserPromo$(userId: string, promoId: number): Observable<any> {
    return this.http.post<any>(
      `${environment.database.path}/user-promos/add/promos`,
      {
        userId,
        promoId,
      }
    );
  }

  /*
     brands
  */
  // fetch
  getAllBrands$(): Observable<Brand[]> {
    return this.http
      .get<Brand[]>(`${environment.database.path}/brand/get/all`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  getBrandByID$(id: string): Observable<Brand> {
    return this.http
      .get<Brand>(`${environment.database.path}/brand/get/${id}`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  // Create
  addBrand$(newBrand: Brand): Observable<Brand> {
    return this.http
      .post<Brand>(`${environment.database.path}/brand/add`, newBrand)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  // Update
  updateBrand$(updatedBrand: Brand): Observable<Brand> {
    return this.http
      .put<Brand>(
        `${environment.database.path}/brand/update/${updatedBrand.id}`,
        updatedBrand
      )
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  deleteBrand(brandToDelete: Brand): Observable<void> {
    return this.http
      .delete<void>(
        `${environment.database.path}/brand/delete/${brandToDelete.id}`
      )
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  //types
  getAllTypes$(): Observable<Type[]> {
    return this.http
      .get<Type[]>(`${environment.database.path}/type/get/all`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  addType$(newType: Type): Observable<Type> {
    return this.http
      .post<Type>(`${environment.database.path}/type/add`, newType)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  getType$(inType: Type): Observable<Type> {
    return this.http
      .get<Type>(`${environment.database.path}/type/get/${inType.id}`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  getAllTypeNames$(): Observable<string[]> {
    return this.http
      .get<string[]>(`${environment.database.path}/type/get/unique-types`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  
  // deleteType(typeToDelete: Type): Observable<void> {
  //   return this.http
  //     .delete<void>(
  //       `${environment.database.path}/type/delete/${typeToDelete.id}`
  //     )
  //     .pipe(
  //       catchError((err) => {
  //         throw this.handleFailure(err);
  //       })
  //     );
  // }

}
