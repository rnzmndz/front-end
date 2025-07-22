import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;

  constructor() {
    const storedLogin = localStorage.getItem('isLoggedIn');
    this.loggedIn = storedLogin === 'true';
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(): void {
    this.loggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('isLoggedIn');
  }
}
