import { Injectable } from '@angular/core';
import {
  AuthControllerService,
  AuthRequest,
  TokenResponse,
} from '../../api/auth-client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenResponse?: TokenResponse;
  private loggedIn = false;

  constructor(private authAPI: AuthControllerService) {
    const storedLogin = localStorage.getItem('isLoggedIn');
    this.loggedIn = storedLogin === 'true';
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(loginCredentials: AuthRequest): void {
    this.loggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    this.authAPI
      .login(loginCredentials, 'body', false, {
        httpHeaderAccept: 'application/json',
      })
      .subscribe({
        next: (response: TokenResponse) => {
          this.tokenResponse = response;
          console.log(response);
        },
      });
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('isLoggedIn');
  }
}
