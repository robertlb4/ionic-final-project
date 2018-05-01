import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import  { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
 
import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { LoginPageModule } from '../pages/login/login.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { SignupPageModule } from '../pages/signup/signup.module';

import { User } from '../providers/user/user';

import { MapProvider } from '../providers/map/map';

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HomePageModule,
    LoginPageModule,
    TabsPageModule,
    SignupPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    User,
    MapProvider
  ]
})
export class AppModule {}
