import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapProvider } from '../map/map';


@Injectable()
export class User {
  BASE_URL: string = 'http://robert-spring-2018-phortonssf.c9users.io:8080/api/appUsers';
  _user: any;

  constructor(public http: HttpClient, public _map: MapProvider) { }


  login(accountInfo: any) {
    let seq = this.http.post(`${this.BASE_URL}/login`, accountInfo)

    seq.subscribe((res: any) => {
      if (res.id) {
        this._loggedIn(res);
      } 
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  signup(accountInfo: any) {
    let seq = this.http.post(this.BASE_URL, accountInfo)

    seq.subscribe((res: any) => {
     
      if (res.id) {
        this._loggedIn(res);
      }
      console.log(res.token);
    }, err => {
      console.error('ERROR', err);
    })
    
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
    this._user = resp;
  }

  updatePreferences(prefArray: string[]) {
    let id = sessionStorage.getItem('userId')
    let token = sessionStorage.getItem('token')
    let seq = this.http.put(`${this.BASE_URL}/${id}/searchPreference?access_token=${token}`, {searchPreference: prefArray})
    
    seq.subscribe(res => {
      console.log(res);
    });
    return seq;

  }

  initPreferences() {
    let id = sessionStorage.getItem('userId')
    let token = sessionStorage.getItem('token')
    let seq = this.http.post(`${this.BASE_URL}/${id}/searchPreference?access_token=${token}`, {searchPreference: ['restaurant']})
    
    seq.subscribe(res => {
      console.log(res);
    });
    return seq;
  }

    getPreferences() {
      let id = sessionStorage.getItem('userId')
      let token = sessionStorage.getItem('token')
      let seq = this.http.get(`${this.BASE_URL}/${id}/searchPreference?access_token=${token}`)
      
      seq.subscribe((res: any) => {
      });
      return seq;
  }

}
