import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { MessagesProvider } from '../../providers/messages/messages';
import { DiscussionProvider } from '../../providers/discussion/discussion';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  activeDiscussions = [];
  sentMessages = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public messagesProvider: MessagesProvider, public discussionProvider: DiscussionProvider) {
    discussionProvider.getUserDiscussions(this.userProvider.user.id);
    console.log(discussionProvider.discussions)
    for (var message of this.messagesProvider.messages) {
      if (message.messages.length == 1) {
        this.sentMessages.push(message);
      }
      else {
        this.activeDiscussions.push(message);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

}
