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
  result: any;
  newmessage: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, public userProvider: UserProvider) {
    this.result = this.navParams.get("result")
    console.log(this.result)

    this.getMessages().subscribe(message => {
      this.result.discussion.messages.push(message)
    });
  }

  ionViewDidLoad() {
    this.socket.connect();
  }

  addMessage() {
    this.socket.emit('addMessage', {content: this.newmessage, discussion: this.result.discussion._id, author: this.userProvider.user.id});
    this.newmessage = '';
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
