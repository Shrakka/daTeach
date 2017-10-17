import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular'; 
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  @Input() title: String;

  constructor(public navCtrl: NavController, private userProvider: UserProvider) {
  }

  goToProfile() {
    if(this.userProvider.user == null) {
      this.navCtrl.push('LoginPage');
    } else {
      this.navCtrl.push('ProfilePage');
    }
  }

  goToLogin() {
    this.navCtrl.push('LoginPage');
  }

}
