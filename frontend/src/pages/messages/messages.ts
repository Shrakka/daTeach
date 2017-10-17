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

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public messagesProvider: MessagesProvider, public discussionProvider: DiscussionProvider) {
    this.discussionProvider.getUserDiscussions(this.userProvider.user.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

}
