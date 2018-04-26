import { Component } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/user/user';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };


  constructor(public navCtrl: NavController,
   public user: User,
    public toastCtrl: ToastController,
    //public translateService: TranslateService
  ) {

    // this.translateService.get('LOGIN_ERROR').subscribe((value) => {
    //   this.loginErrorString = value;
    // })
  }

  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(HomePage);
    }
    , (err) => {
      //this.navCtrl.push(HomePage);
     // Unable to log in
      let toast = this.toastCtrl.create({
        message: 'Invalid username or password',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.account.email="";
      this.account.password="";
    }
  )}
}
