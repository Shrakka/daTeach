import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DiscussionProvider } from '../../providers/discussion/discussion';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public discussionProvider: DiscussionProvider) {
    this.discussionProvider.getUserDiscussions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  activeDiscussions() {
    return this.discussionProvider.results.filter((result) => {return result.discussion.messages.length > 1})
  }

  inactiveDiscussions() {
    return this.discussionProvider.results.filter((result) => {return result.discussion.messages.length == 1})
  }

}
