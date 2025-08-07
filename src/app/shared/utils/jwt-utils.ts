import { jwtDecode } from 'jwt-decode';

export interface MyJwtPayload {
  sub: string;
  exp: number;
  iat: number;
  // Add any other fields your JWT includes
}

export interface MyJwtPayload {
    sub: string;
    exp: number;
    iat: number;
    acr: string;
    'allowed-origins': string[];
    aud: string;
    azp: string;
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    iss: string;
    jti: string;
    name: string;
    preferred_username: string;
    realm_access: {
        roles: string[];
    };
    resource_access: {
        account: any; // You can define a more specific type if needed
    };
    scope: string;
    sid: string;
    typ: string;
}

export function decodeJwt(token: string): MyJwtPayload {
    return jwtDecode<MyJwtPayload>(token);
}
