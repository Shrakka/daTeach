import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { UserProvider } from '../../providers/user/user';
import { DiscussionProvider } from '../../providers/discussion/discussion';
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
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, public userProvider: UserProvider, private discussionProvider: DiscussionProvider) {
    this.result = this.navParams.get("result")
    console.log(this.result)

    this.getMessages().subscribe(message => {
      this.result.discussion.messages.push(message);
      setTimeout(function() {
        this.discussionProvider.putDiscussion({discussion: this.result.discussion._id, user: this.userProvider.user.id, seen: true});
      }.bind(this), 100);
      console.log("message received");
     // this.scrollToBottom();
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    });
  }

  ionViewDidLoad() {
    this.socket.connect();
    this.scrollToBottom();
  }

  addMessage() {
    if (this.newmessage !== '') {
      this.socket.emit('addMessage', {content: this.newmessage, discussion: this.result.discussion._id, author: this.userProvider.user.id});
      this.newmessage = '';
    }
    this.discussionProvider.putDiscussion({discussion: this.result.discussion._id, user: this.result.user.id, seen: false});
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        if (data.discussion === this.result.discussion._id) {
          observer.next({author: data.author, content: data.content});
        }
      });
    })
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }
}
