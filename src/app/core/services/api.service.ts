import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { JwtService } from './jwt.service';
import { SnackbarService } from './snackbar.service';

@Injectable()
export class ApiService {
  private api = environment.api_url;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private notificationService: SnackbarService
  ) { }

  formatErrors(response: any) {
    this.notificationService.error('Ошибка сервера', response.error.error);
    return throwError(response.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(this.api + path, { params }).pipe(catchError(error => this.formatErrors(error)));
  }

  patch(path: string, body: object): Observable<any> {
    return this.http.patch(this.api + path, JSON.stringify(body)).pipe(catchError(error => this.formatErrors(error)));
  }

  post(path: string, body: object): Observable<any> {
    return this.http.post(this.api + path, JSON.stringify(body)).pipe(catchError(error => this.formatErrors(error)));
  }

  delete(path): Observable<any> {
    return this.http.delete(this.api + path).pipe(catchError(error => this.formatErrors(error)));
  }
}
