import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TakeformPage } from '../takeform/takeform';
import { GiveformPage } from '../giveform/giveform';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToTakeform() {
    this.navCtrl.push("TakeformPage")
  }

  goToGiveform() {
    this.navCtrl.push("GiveformPage")
  }

}
