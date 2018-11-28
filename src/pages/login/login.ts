import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { HomePage } from "../home/home";
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { GooglePlus } from '@ionic-native/google-plus';
import { User } from "../../models/user";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public data: any = {
    url: "",
    nombre: ""
  };
  user = {} as User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private twitter: TwitterConnect,
    public googleplus: GooglePlus) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async loginWhithEmail(user:User) {
    try{
      const result = await firebase.auth().signInWithEmailAndPassword(user.email,user.password);
      console.log(result);
      if(result){
        this.invocarHomePage(user.email,'');
        user.email="";
        user.password="";
      }
    }catch(e){
      alert(JSON.stringify(e));
      //alert('ERROR: Usuario o contraseña incorrectos')
      user.email="";
      user.password="";
    }
  }

  async registerWhithEmail(user:User) {
    try{
      const result = await firebase.auth().createUserWithEmailAndPassword(user.email,user.password);
      console.log(result);
      user.email="";
      user.password="";
    }catch(e){
      alert(JSON.stringify(e));
      //alert('ERROR: El usuario ya existe')
      user.email="";
      user.password="";
    }
    
  }
  
  

  loginWhithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(() => {
      firebase.auth().getRedirectResult().then((result) => {
        //alert(JSON.stringify(result));
        this.invocarHomePage(result.user.displayName, result.user.photoURL);
      }).catch((error) => {
        alert(JSON.stringify(error));
      });
    });

  }


  loginWhithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(() => {
      firebase.auth().getRedirectResult().then((result) => {
        //alert(JSON.stringify(result));
        this.invocarHomePage(result.user.displayName, result.user.photoURL);
      }).catch((error) => {
        alert(JSON.stringify(error));
      });
    });
  }


  loginWhithTwitter() {
    this.twitter.login().then(response => {
      const twitterCredential = firebase.auth.TwitterAuthProvider
        .credential(response.token, response.secret);
      firebase.auth().signInWithCredential(twitterCredential)
        .then(userProfile => {
          this.invocarHomePage(userProfile.displayName, userProfile.photoURL);
        }, error => {
          alert(JSON.stringify(error));
        });
    }, error => {
      alert(JSON.stringify(error));
    });
  }

  //   <meta-data
  //   android:name="io.fabric.ApiKey"
  //   android:value="7a6d2138b314b79f1864dcddb91c81b7727a03a9"
  //ionic plugin add twitter-connect-plugin --variable FABRIC_KEY=7a6d2138b314b79f1864dcddb91c81b7727a03a9
  // />

  //ionic cordova plugin add https://github.com/chroa/twitter-connect-plugin --variable FABRIC_KEY=7a6d2138b314b79f1864dcddb91c81b7727a03a9 --variable TWITTER_KEY=HudtJhfL0ZubkivnzpqPjtKT5 --variable TWITTER_SECRET=z4wCFmVxdsnhXmx1Rtgbe7PFHJRluPCMVUblrlnmLGDWI2pYIP



  public invocarHomePage(nombre: String, urlPhoto: String): void {
    this.data.nombre = nombre;
    this.data.url = urlPhoto;
    this.navCtrl.push(HomePage, this.data);
  }

}
