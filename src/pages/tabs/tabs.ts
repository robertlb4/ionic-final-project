import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { User } from '../../providers/user/user';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  listRoot = 'ListPage'
  homeRoot = HomePage
  settingsRoot = 'SettingsPage'


  constructor(public navCtrl: NavController, public _user: User) {}
  
  ionViewDidLoad() {
    let token = sessionStorage.getItem('token');
    if (!token) this.navCtrl.setRoot(LoginPage);
  }
}


