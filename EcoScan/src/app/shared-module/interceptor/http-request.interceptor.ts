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
import { LocalStorageService } from '../shared/services/local-storage.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  blacklist: string[] = environment.blacklists.toasts;
  constructor(
    private lsService: LocalStorageService,
    private messageService: MessageService
  ) {}

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
        const incomingReq = incomingRequest instanceof HttpResponse;
        if (incomingReq && request.body &&
          !(this.blacklist.some(element => request.url.includes(element)))) {
            let message = this.determineMessage(request);
            this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: message ? message : incomingRequest.body.message,
          });
        }
      }),

      catchError((err: HttpErrorResponse) => {
        if (err.error.Error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: err.error.Error,
          });
        }
        return throwError(() => new Error('Une erreur est survenue: ' + err.error.Error));
      })
    );
  }

  determineMessage(request: HttpRequest<unknown>): string{
    let url = request.url;
    if (url.includes("deposit/add")){
      return "Déchets jetés";
    }
    if (url.includes("user-promos/add/promos")){
      return "Promotion achetée";
    }
    if (url.includes("staged/add")){
      return "Ajouté aux déchets stockés";
    }
    if (url.includes("promos/add")){
        return "Promo crée";
    }
    if (url.includes("brand/add")){
      return "Marque crée";
    }
    if (url.includes("type/add")){
      return "Type crée";
    }
    return "";
  }

}
