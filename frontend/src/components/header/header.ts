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
    this.navCtrl.push('ProfilePage');
  }

  goToLogin() {
    this.navCtrl.push('LoginPage');
  }

}
