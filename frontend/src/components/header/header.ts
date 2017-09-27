import { Component } from '@angular/core';
import { ProfilePage } from '../../pages/profile/profile';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  constructor(public navCtrl: NavController) {
  }

  goToProfile() {
    this.navCtrl.setRoot("ProfilePage");
  }

}
