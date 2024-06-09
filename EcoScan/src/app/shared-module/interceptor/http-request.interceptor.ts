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
import { MessageService } from 'primeng/api';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
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
        if (incomingReq && request.body) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: incomingRequest.body.message,
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
        return throwError(() => new Error('Une erreur est survenue'));
      })
    );
  }
}
