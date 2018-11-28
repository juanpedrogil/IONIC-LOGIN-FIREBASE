import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import firebase from 'firebase';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { GooglePlus } from '@ionic-native/google-plus';
//import { AngularFireModule } from 'angularfire2';

firebase.initializeApp({
  apiKey: "AIzaSyDEOTtVamIWgWaoXUlfTdmPQUn_CFwe2T0",
  authDomain: "proyecto-dam-ba80f.firebaseapp.com",
  databaseURL: "https://proyecto-dam-ba80f.firebaseio.com",
  projectId: "proyecto-dam-ba80f",
  storageBucket: "",
  messagingSenderId: "346848882671"
});

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TwitterConnect,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus
  ]
})
export class AppModule {}
