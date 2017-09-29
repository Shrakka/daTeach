import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {
  constructor(public navCtrl: NavController) {
  }

  goToHome() {
    this.navCtrl.setRoot('HomePage');
  }

  goToMessages() {
    this.navCtrl.setRoot('MessagesPage');
  }
}
