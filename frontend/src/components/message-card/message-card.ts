import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the MessageCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-card',
  templateUrl: 'message-card.html'
})
export class MessageCardComponent {
  @Input() result: any;

  constructor(public navCtrl: NavController, public userProvider: UserProvider) {
  }

  goToChat() {
    this.navCtrl.push('ChatPage', {"result": this.result});
  }

}
