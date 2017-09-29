import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the GiveFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-give-form',
  templateUrl: 'give-form.html',
})
export class GiveFormPage {
  formValue = {
    lessonType: "regular",
    move: 'move'
  };


  submitForm() {
    console.log(this.formValue);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiveFormPage');
  }

  goToResults() {
    this.navCtrl.push('ResultsPage');
  }

  selectedRegular() {

  }

  selectedPunctual() {
    
  }

}
