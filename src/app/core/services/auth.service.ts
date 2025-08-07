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

  login(loginCredentials: AuthRequest): Promise<boolean> {
    this.logout();
    return new Promise((resolve) => {
      this.authAPI
        .login(loginCredentials, 'body', false, {
          httpHeaderAccept: 'application/json',
        })
        .subscribe({
          next: (response: TokenResponse) => {
            this.tokenResponse = response;
            this.loggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            if (this.tokenResponse?.access_token) {
              localStorage.setItem('token', this.tokenResponse.access_token);
            }
            console.log(this.loggedIn);
            resolve(true);
          },
          error: (err) => {
            console.log('Log in Failed ', err);
            console.log(this.tokenResponse);
            resolve(false);
          },
        });
    });
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
  }
}
