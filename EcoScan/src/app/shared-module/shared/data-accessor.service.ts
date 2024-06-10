import { Injectable, OnInit, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, map, switchMap, tap } from 'rxjs';
import { User } from '../models/classes/User.class';
import { Promo } from '../models/types/Promo.type';
import { environment } from '../../../environments/environment';
import { Rubbish } from '../models/types/Rubbish.type';
import { AuthResponse } from '../models/types/Login.type';
import { StagedRubbish } from '../models/types/StagedRubbish.type';
import { Bin } from '../models/types/Bin.type';
import { Deposit } from '../models/types/Deposits.type';
import { Brand } from '../models/types/Brand.type';
import { GetUser } from '../../host/models/getUser.type';
import { Type } from '../models/types/Type.type';
import { Credential } from '../../host/models/credential.type';
import { UserForm } from '../../host/models/user.type';

@Injectable({
  providedIn: 'root',
})
export class DataAccessorService {
  private httpOptions!: object;

  constructor(private http: HttpClient) {}

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
  getUserByID$(id: string): Observable<GetUser> {
    return this.http
      .get<GetUser>(`${environment.database.path}/user/get/${id}`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  // Create
  addUser$(newUser: User): Observable<User> {
    return this.http
      .post<User>(`${environment.database.path}/user/add`, newUser)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  // Update
  updateUser$(updatedUser: User): Observable<User> {
    return this.http
      .put<User>(
        `${environment.database.path}/user/update/${updatedUser.getUserID()}`,
        updatedUser
      )
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  // Update
  // updateUserPassword$(updatedLogin: Login): Observable<Login> {
  //   return this.http
  //     .put<Login>(
  //       `${environment.database.path}/logins/${updatedLogin.userID}`,
  //       updatedLogin,
  //       this.httpOptions,
  //     )
  //     .pipe(
  //       catchError((err) => {
  //         throw this.handleFailure(err);
  //       }),
  //     );
  // }

  /*
     rubbishItems
  */
  // fetch
  getAllRubbish$(): Observable<Rubbish[]> {
    return this.http
      .get<Rubbish[]>(`${environment.database.path}/rubbish/get/all`)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  getRubbishByID$(id: string): Observable<Rubbish> {
    return this.http
      .get<Rubbish>(`${environment.database.path}/rubbish/get/${id}`)
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
  addStagedRubbish$(newRubbish: StagedRubbish): Observable<StagedRubbish> {
    return this.http
      .post<StagedRubbish>(
        `${environment.database.path}/staged/add`,
        newRubbish
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
        `${environment.database.path}/promo/update/${updatedPromo.promoID}`,
        updatedPromo
      )
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
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
  getBrandByName$(title: string): Observable<Brand> {
    return this.http
      .get<Brand[]>(`${environment.database.path}/brand/`, this.httpOptions)
      .pipe(
        map(
          (brands: Brand[]) =>
            brands.filter((brand: Brand) => brand.title === title)[0]
        ),
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
        `${environment.database.path}/brand/update/${updatedBrand.brandID}`,
        updatedBrand
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
}
