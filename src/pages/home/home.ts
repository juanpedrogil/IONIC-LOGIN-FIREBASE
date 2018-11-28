import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public data:any={
    url:"",
    nombre:""
  }
  constructor(public navCtrl: NavController,public navParams:NavParams) {
    this.data=navParams.data;
  }
  public logout():void{
    firebase.auth().signOut();
    this.navCtrl.setRoot(LoginPage)
  }

}
