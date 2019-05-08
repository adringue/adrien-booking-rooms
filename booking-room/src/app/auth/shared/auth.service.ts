import { Observable } from 'rxjs/internal/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwt = new JwtHelperService();
import * as moment from 'moment';
// lets create a type for our decodedToken
class DecodedToken {
  exp = 0;
  username = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private decodedToken: DecodedToken;
  constructor(private http: HttpClient) {
    // bei refreshing the page , decodedToken is not defined, lets fix

    this.decodedToken = JSON.parse(localStorage.getItem('token_decoded')) || new DecodedToken();
  }


  private saveToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('booking-auth', token);
    localStorage.setItem('booking-auth-decoded', JSON.stringify(this.decodedToken));

    return token;
  }
  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public register(userData: any): Observable<any> {
    return this.http.post('api/v1/users/register', userData);
  }

  public login(userData: any): Observable<any> {
    return this.http.post('api/v1/users/auth', userData).map(
      (token: string) => {
        return this.saveToken(token);
      }
    );
  }
  public logout() {
    localStorage.removeItem('booking-auth');
    localStorage.removeItem('booking-auth-decoded');
    this.decodedToken = new DecodedToken();

  }
   public isAuthenticated(): boolean {
     return moment().isBefore(this.getExpiration());
   }
   public getAuthToken(): string {
  return localStorage.getItem('booking-auth');
   }
   public getUsername(): string {
     return this.decodedToken.username;
   }
}
