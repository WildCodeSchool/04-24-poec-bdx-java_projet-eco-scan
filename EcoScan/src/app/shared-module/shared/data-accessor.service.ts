import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/classes/User.class';
import { Promo } from '../models/types/Promo.type';
import { DB_PATH } from './settings';
import { Rubbish } from '../models/types/Rubbish.type';
import { Login } from '../models/types/Login.type';
import { StagedRubbish } from '../models/types/StagedRubbish.type';
import { Bin } from '../models/types/Bin.type';
import { Deposit } from '../models/types/Deposits.type';
import { Brand } from '../models/types/Brand.type';

@Injectable({
  providedIn: 'root'
})
export class DataAccessorService {

  private http = inject(HttpClient);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor() { }
  /*
     Users
  */
  // fetch
  getAllUsers$(): Observable<User[]> {
    return this.http.get<User[]>(`${DB_PATH}/users`);
  }
  getUserByID$(id: string): Observable<User> {
    return this.http.get<User>(`${DB_PATH}/users/${id}`);
  }
  // Create
  addUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${DB_PATH}/users`, newUser, this.httpOptions);
  }
  // Update
  updateUser(updatedUser: User): Observable<User> {
    return this.http.put<User>(`${DB_PATH}/users/${updatedUser.userID}`, updatedUser, this.httpOptions);
  }


  /*
     logins
  */
  // fetch
  getUserLogin$(id: string): Observable<Login> {
    return this.http.get<Login>(`${DB_PATH}/logins/${id}`);
  }
  // Create
  addUserPassword(newLogin: Login): Observable<Login> {
    return this.http.post<Login>(`${DB_PATH}/logins`, newLogin, this.httpOptions);
  }
  // Update
  updateUserPassword(updatedLogin: Login): Observable<Login> {
    return this.http.put<Login>(`${DB_PATH}/logins/${updatedLogin.userID}`, updatedLogin, this.httpOptions);
  }

  /*
     rubbishItems
  */
  // fetch
  getAllRubbish$(): Observable<Rubbish[]> {
    return this.http.get<Rubbish[]>(`${DB_PATH}/rubbishItems`);
  }
  getRubbishByID$(id: string): Observable<Rubbish> {
    return this.http.get<Rubbish>(`${DB_PATH}/rubbishItems/${id}`);
  }

  /*
     stagingArea
  */
  // fetch
  getStagedRubbishByID$(id: string): Observable<StagedRubbish> {
    return this.http.get<StagedRubbish>(`${DB_PATH}/stagingArea/${id}`);
  }
  // Create
  addStagedRubbish(newRubbish: StagedRubbish): Observable<StagedRubbish> {
    return this.http.post<StagedRubbish>(`${DB_PATH}/stagingArea`, newRubbish, this.httpOptions);
  }


  /*
     bins
  */
  // fetch
  getAllBins$(): Observable<Bin[]> {
    return this.http.get<Bin[]>(`${DB_PATH}/bins`);
  }
  getBinByID$(id: string): Observable<Bin> {
    return this.http.get<Bin>(`${DB_PATH}/bins/${id}`);
  }


  /*
     deposits
  */
 // fetch
  getAllDeposits$(): Observable<Deposit[]> {
    return this.http.get<Deposit[]>(`${DB_PATH}/deposits`);
  }
  getDepositByID$(id: string): Observable<Deposit> {
    return this.http.get<Deposit>(`${DB_PATH}/deposits/${id}`);
  }
  // Create
  addDeposit(newDeposit: Deposit): Observable<Deposit> {
    return this.http.post<Deposit>(`${DB_PATH}/deposits`, newDeposit, this.httpOptions);
  }


  /*
     promos
  */
  // fetch
  getAllPromos$(): Observable<Promo[]> {
    return this.http.get<Promo[]>(`${DB_PATH}/promo`);
  }
  getPromoByID$(id: string): Observable<Promo> {
    return this.http.get<Promo>(`${DB_PATH}/promo/${id}`);
  }
  // Create
  addPromo(newPromo: Promo): Observable<Promo> {
    return this.http.post<Promo>(`${DB_PATH}/promo`, newPromo, this.httpOptions);
  }
  // Update
  updatePromo(updatedPromo: Promo): Observable<Promo> {
    return this.http.put<Promo>(`${DB_PATH}/promo/${updatedPromo.promoID}`, updatedPromo, this.httpOptions);
  }


  /*
     brands
  */
  // fetch
  getAllBrands$(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${DB_PATH}/brand`);
  }
  getBrandByID$(id: string): Observable<Brand> {
    return this.http.get<Brand>(`${DB_PATH}/brand/${id}`);
  }

  // Create
  addBrand(newBrand: Brand): Observable<Brand> {
    return this.http.post<Brand>(`${DB_PATH}/brand`, newBrand, this.httpOptions);
  }
  // Update
  updateBrand(updatedBrand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${DB_PATH}/brand/${updatedBrand.brandID}`, updatedBrand, this.httpOptions);
  }

}
