import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {
  constructor(public navCtrl: NavController, private userProvider: UserProvider) {
  }

  goToHome() {
    this.navCtrl.setRoot('HomePage');
  }

  goToMessages() {
    if(this.userProvider.user) {
      this.navCtrl.push('MessagesPage');
    } else {
      this.navCtrl.push('LoginPage');
    }
  }
}
