import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class User {
  [x: string]: any;
  BASE_URL: string = 'http://localhost:3000/api/appUsers';
  _user: any;

  constructor(public http: HttpClient) { }


  login(accountInfo: any) {
    let seq = this.http.post(`${this.BASE_URL}/login`, accountInfo)


    seq.subscribe((res: any) => {
      if (res.status == 'success') {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  signup(accountInfo: any) {
    let seq = this.http.post(this.BASE_URL, accountInfo)

    seq.subscribe((res: any) => {
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}