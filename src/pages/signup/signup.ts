import { Component } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/user/user';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
 
  account: { name: string, email: string, password: string } = {
    name: '',
    email: '',
    password: ''
  };



  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    //public translateService: TranslateService
  ) {

    // this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
    //   this.signupErrorString = value;
    // })
  }

  doSignup() {
    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(HomePage);
    }, (err) => {
      console.log(err);
      //this.navCtrl.push(HomePage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: err.error.error.message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      for(let p in this.account) {
        this.account[p] = '';
      };
    });
  }
}
