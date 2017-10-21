import { Component, Input, OnInit } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'lesson-card',
  templateUrl: 'lesson-card.html'
})
export class LessonCardComponent {
  @Input() result;
  author: any;
  users: any;


  constructor(public userProvider: UserProvider, public navCtrl: NavController) {}

  ngOnInit() {
    this.users = []
    if (this.userProvider.user.id === this.result.lesson.author.id) {
      this.result.users.map((user) => {
        if (user.id === this.result.lesson.author.id) {
          this.author = user
        }
        else {
          this.users.push(user)
        }
      })
    }
    else {
      this.users.push(this.userProvider.user)
      this.result.users.map((user) => {
        if (user.id === this.result.lesson.author.id) {
          this.author = user
        }
      })
    }
  }

  goToChat(user) {
    var result = {user: user, discussion: user.discussion}
    this.navCtrl.push('ChatPage', {"result": result});
  }

}
