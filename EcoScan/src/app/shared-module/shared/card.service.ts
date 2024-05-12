import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Promo } from '../models/types/Promo.type';

@Injectable({
  providedIn: 'root'
})

export class CardService {

  // je crée mon service, smart et dumb component ✅
  // je type les données qui vont affluer ✅
  // je m'occupe de la logique métier qu'il va y avoir dans
  // mon service, importer httpClient et faire méthodes ✅
  // j'envoie mon service dans mon smart component (injection)
  // je m'occupe de l'affichage coté html
  // je crée un input coté enfant (dumb component)
  // j'affiche coté enfant
  // je joui

  private http = inject(HttpClient)

  BASE_URL: string = "http://localhost:3000"

  getPromos$(): Observable<Promo[]> { 
   return this.http.get<Promo[]>(`${this.BASE_URL}/promo`).pipe(
    map((promo => promo)),
   )

  }

}