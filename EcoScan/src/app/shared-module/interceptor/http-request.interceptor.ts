import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  constructor(private lsService: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const idToken = this.lsService.getToken();

    if (idToken) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + idToken),
      });
      return this.mapStream(cloned, next);
    } else {
      return this.mapStream(request, next);
    }
  }

  mapStream(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((incomingRequest) => {
        console.log(incomingRequest);
        // j'intercepte les requêtes que mon serveur me renvoie en statut 200 (Statut : succès)
        if (incomingRequest instanceof HttpResponse) {
          // this.authS.setHttpSuccessSubject$(incomingRequest);
        }
      }),
      // J'intercepte les requêtes que mon serveur me renvoit en statut 400 (pbl côté client) ou 500 (pbl côté serveur)
      // Les plus courantes sont :
      // HTTP Error 401 — Unauthorized
      // HTTP Error 400 — Bad Request
      // HTTP Error 404 — Page Not Found
      // HTTP Error 403 — Forbidden Error
      // HTTP Error 500 — Internal Error
      // HTTP Error 503 — Service Unavailable
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        // this.authS.setHttpErrorSubject$(err);
        return throwError(() => new Error('Une erreur est survenue'));
      })
    );
  }
}
