import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { User } from '../models/classes/User.class';
import { Promo } from '../models/types/Promo.type';
import { DB_PATH } from './settings';
import { Rubbish } from '../models/types/Rubbish.type';
import { Login } from '../models/types/Login.type';
import { StagedRubbish } from '../models/types/StagedRubbish.type';
import { Bin } from '../models/types/Bin.type';
import { Deposit } from '../models/types/Deposits.type';
import { Brand } from '../models/types/Brand.type';
import { GetUser } from '../../host/models/getUser.type';

@Injectable({
  providedIn: 'root',
})
export class DataAccessorService {
  private http = inject(HttpClient);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  handleFailure(err: HttpErrorResponse): void {
    throw 'Connection to DB failure: ' + err.message;
  }

  /*
     Users
  */
  // fetch
  getAllUsers$(): Observable<GetUser[]> {
    return this.http.get<GetUser[]>(`${DB_PATH}/users`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }
  getUserByID$(id: string): Observable<User> {
    return this.http.get<User>(`${DB_PATH}/users/${id}`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }
  // Create
  addUser$(newUser: User): Observable<User> {
    return this.http
      .post<User>(`${DB_PATH}/users`, newUser, this.httpOptions)
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
        `${DB_PATH}/users/${updatedUser.getUserID()}`,
        updatedUser,
        this.httpOptions
      )
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }

  /*
     logins
  */
  // fetch
  getUserLogin$(id: string): Observable<Login> {
    return this.http.get<Login>(`${DB_PATH}/logins/${id}`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }

  // Create
  addUserPassword$(newLogin: Login): Observable<Login> {
    return this.http
      .post<Login>(`${DB_PATH}/logins`, newLogin, this.httpOptions)
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
  // Update
  updateUserPassword$(updatedLogin: Login): Observable<Login> {
    return this.http
      .put<Login>(
        `${DB_PATH}/logins/${updatedLogin.userID}`,
        updatedLogin,
        this.httpOptions
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
  // fetch
  getAllRubbish$(): Observable<Rubbish[]> {
    return this.http.get<Rubbish[]>(`${DB_PATH}/rubbishItems`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }
  getRubbishByID$(id: string): Observable<Rubbish> {
    return this.http.get<Rubbish>(`${DB_PATH}/rubbishItems/${id}`).pipe(
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
    return this.http.get<StagedRubbish>(`${DB_PATH}/stagingArea/${id}`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }
  // Create
  addStagedRubbish$(newRubbish: StagedRubbish): Observable<StagedRubbish> {
    return this.http
      .post<StagedRubbish>(
        `${DB_PATH}/stagingArea`,
        newRubbish,
        this.httpOptions
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
    return this.http.get<Bin[]>(`${DB_PATH}/bins`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }
  getBinByID$(id: string): Observable<Bin> {
    return this.http.get<Bin>(`${DB_PATH}/bins/${id}`).pipe(
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
    return this.http.get<Deposit[]>(`${DB_PATH}/deposits`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }
  getDepositByID$(id: string): Observable<Deposit> {
    return this.http.get<Deposit>(`${DB_PATH}/deposits/${id}`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }
  // Create
  addDeposit$(newDeposit: Deposit): Observable<Deposit> {
    return this.http
      .post<Deposit>(`${DB_PATH}/deposits`, newDeposit, this.httpOptions)
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
    return this.http.get<Promo[]>(`${DB_PATH}/promo`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }
  getPromoByID$(id: string): Observable<Promo> {
    return this.http.get<Promo>(`${DB_PATH}/promo/${id}`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }
  // Create
  addPromo$(newPromo: Promo): Observable<Promo> {
    return this.http
      .post<Promo>(`${DB_PATH}/promo`, newPromo, this.httpOptions)
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
        `${DB_PATH}/promo/${updatedPromo.promoID}`,
        updatedPromo,
        this.httpOptions
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
    return this.http.get<Brand[]>(`${DB_PATH}/brand`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }
  getBrandByID$(id: string): Observable<Brand> {
    return this.http.get<Brand>(`${DB_PATH}/brand/${id}`).pipe(
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }
  getBrandByName$(name: string): Observable<Brand> {
    return this.http.get<Brand[]>(`${DB_PATH}/brand/`).pipe(
      map(
        (brands: Brand[]) =>
          brands.filter((brand: Brand) => brand.brandName === name)[0]
      ),
      catchError((err) => {
        throw this.handleFailure(err);
      })
    );
  }

  // Create
  addBrand$(newBrand: Brand): Observable<Brand> {
    return this.http
      .post<Brand>(`${DB_PATH}/brand`, newBrand, this.httpOptions)
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
        `${DB_PATH}/brand/${updatedBrand.brandID}`,
        updatedBrand,
        this.httpOptions
      )
      .pipe(
        catchError((err) => {
          throw this.handleFailure(err);
        })
      );
  }
}
