import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  todo = {}
  logForm() {
    console.log(this.todo);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiveFormPage');
  }

  goToResults() {
    this.navCtrl.push('ResultsPage');
  }

}
