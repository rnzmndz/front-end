import { Injectable } from '@angular/core';
import { TokenResponse } from '../../api/auth-client';
import { decodeJwt, MyJwtPayload } from '../../shared/utils/jwt-utils';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  tokenResponse?: TokenResponse;
  decodedToken?: MyJwtPayload;

  constructor() {}

  setToken(token: TokenResponse | undefined) {
    if (!token?.access_token) {
      console.warn('No access token found in response.');
      return;
    }
    this.tokenResponse = token;
    localStorage.setItem('token', token.access_token);
  }

  decodeToken() {
    if (this.tokenResponse?.access_token) {
      const accessToken = this.tokenResponse.access_token;
      this.decodedToken = decodeJwt(accessToken);
    }
  }

  getTokenRoles() {
    this.decodeToken();
    console.log(this.decodedToken?.realm_access.roles);
    const roles = this.decodedToken;
    localStorage.setItem(
      'roles',
      JSON.stringify(this.decodedToken?.realm_access.roles)
    );
  }
}
