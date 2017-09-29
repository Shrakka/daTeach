import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  @Input() title: String;

  constructor(public navCtrl: NavController) {
  }

  goToProfile() {
    this.navCtrl.setRoot('ProfilePage');
  }

}
