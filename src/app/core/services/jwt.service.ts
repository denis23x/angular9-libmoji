import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  getToken(): string {
    return window.localStorage.access;
  }

  saveToken(token: string): void {
    window.localStorage.access = token;
  }

  destroyToken(): void {
    window.localStorage.removeItem('access');
  }

}
