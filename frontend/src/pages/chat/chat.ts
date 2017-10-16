import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { UserProvider } from '../../providers/user/user';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {
  messages: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, public userProvider: UserProvider) {
    this.messages = this.navParams.get("message")

    this.getMessages().subscribe(message => {
      console.log(message)
    });
  }

  ionViewDidLoad() {
    this.socket.connect();
  }

  addMessage() {
    this.socket.emit('addMessage', {content: 'content', discussion: '59dcb5808295b8311804e3d0', author: '59dcb239af1cc72c4a2d8733'});
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
}
