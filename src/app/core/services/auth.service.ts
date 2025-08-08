import { Injectable } from '@angular/core';
import {
  AuthControllerService,
  AuthRequest,
  TokenResponse,
} from '../../api/auth-client';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;

  constructor(
    private authAPI: AuthControllerService,
    private tokenService: TokenService
  ) {
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
            this.loggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            this.tokenService.setToken(response);
            console.log(this.loggedIn);
            resolve(true);
          },
          error: (err) => {
            console.log('Log in Failed ', err);
            resolve(false);
          },
        });
    });
  }

  getRoles() {
    this.authAPI.getUserMyRoles().subscribe({
      next: response => {
        console.log(response);
      }
    })
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
  }
}
