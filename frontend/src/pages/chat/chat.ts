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
<<<<<<< HEAD
    this.socket.emit('addMessage', 'messagecontent', '59db4e8df8eed51ce8b293c8', '59da932e005ac447dd9dbb82');
||||||| merged common ancestors
    this.socket.emit('addMessage', 'messagecontent', '59db4e8df8eed51ce8b293c8', '59da932e005ac447dd9dbb82');
=======
    this.socket.emit('addMessage', {content: 'content', discussion: '59dcb5808295b8311804e3d0', author: '59dcb239af1cc72c4a2d8733'});
>>>>>>> 17908c28d2ba02115ca382fee08246d9a0f45782
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
