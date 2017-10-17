import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

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
  @Input() discussion: any;

  constructor(public navCtrl: NavController) {
  }

  goToChat() {
    this.navCtrl.push('ChatPage', {"discussion": this.discussion});
  }

}
