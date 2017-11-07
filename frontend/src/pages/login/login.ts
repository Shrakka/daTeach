import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = 'email@email.org';
  password: string = 'password';
  firstname: string = 'John';
  lastname: string = 'Doe';
  birthyear: number = 1990;
  gender: string = 'M';

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logIn() {
    this.userProvider.logIn({'email': this.email, 'password': this.password});
    if(!this.userProvider.user){
      this.navCtrl.pop();
    }
  }

  logInFB() {
    this.userProvider.logInFB();
    if(!this.userProvider.user){
      this.navCtrl.pop();
    }
  }

  goToSignup() {
    this.navCtrl.push('SignupPage');
  }

}
