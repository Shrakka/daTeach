import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DiscussionProvider } from '../../providers/discussion/discussion';

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {
  discNumber: number;

  constructor(public navCtrl: NavController, private userProvider: UserProvider, private discussionProvider: DiscussionProvider) {
  }

  ngOnInit() {
    if (this.userProvider.user) {
      this.discussionProvider.getUserDiscussions(this.userProvider.user.id);
      this.discNumber = this.discussionProvider.results.length;
    }
    setInterval(() => {
      if (this.userProvider.user) {
        this.discussionProvider.getUserDiscussions(this.userProvider.user.id);
        this.discNumber = this.discussionProvider.results.length;
      }
    }, 5000);
  }

  goToHome() {
    this.navCtrl.setRoot('HomePage');
  }

  goToMessages() {
    if (this.userProvider.user) {
      this.navCtrl.push('MessagesPage');
    }
    else {
      this.navCtrl.push('LoginPage');
    }
  }

  goToLessons() {
    if (this.userProvider.user) {
      this.navCtrl.push('LessonsPage');
    }
    else {
      this.navCtrl.push('LoginPage');
    }
  }
}
