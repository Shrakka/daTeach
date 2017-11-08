import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  email: string = 'email@email.org';
  password: string = 'password';
  firstname: string = 'John';
  lastname: string = 'Doe';
  birthyear: number = 1990;
  gender: string = 'M';

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp() {
    this.userProvider.signUp({'email': this.email, 'password': this.password, 'firstname': this.firstname, 'lastname': this.lastname, 'birthyear': this.birthyear, 'gender': this.gender});
    if(!this.userProvider.user){
      this.navCtrl.pop();
    }
  }

}