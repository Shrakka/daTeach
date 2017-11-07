import { Component, Input, OnInit } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { LessonProvider } from '../../providers/lesson/lesson';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'lesson-card',
  templateUrl: 'lesson-card.html'
})
export class LessonCardComponent {
  @Input() result;
  author: any;
  users: any;


  constructor(public userProvider: UserProvider, public navCtrl: NavController, public lessonProvider: LessonProvider) {}

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

  desactivate(id) {
    if (this.users.length == 0) {
      this.lessonProvider.lessons = this.lessonProvider.lessons.filter((result) => {return result.lesson._id != id})
      this.lessonProvider.deleteLesson(id);
    }
    else {
      this.lessonProvider.lessons.map((result) => {
        if (result.lesson._id == id) {
          result.lesson.active = false;
        }
      })
      this.lessonProvider.desactivate(id);
    }
  }

}
