import { Component, Input, OnInit } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { LessonProvider } from '../../providers/lesson/lesson';
import { DiscussionProvider } from '../../providers/discussion/discussion';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'lesson-card',
  templateUrl: 'lesson-card.html'
})
export class LessonCardComponent {
  @Input() result;
  author: any;
  users: any;


  constructor(public userProvider: UserProvider, public navCtrl: NavController, public lessonProvider: LessonProvider, private discussionProvider: DiscussionProvider) {}

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
    if (this.hasNotSeen(user)) {
      this.discussionProvider.putDiscussion({discussion: user.discussion._id, user: this.userProvider.user.id, seen: true});
    }
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

  getMessageColor(user: any) {
    if (this.hasNotSeen(user)) {
      return 'secondary';
    }
    return 'dark';
  }

  hasNotSeen(user) {
    return (this.userProvider.user.id === user.discussion.user1 && !user.discussion.seen1) || (this.userProvider.user.id === user.discussion.user2 && !user.discussion.seen2)
  }

  getMessages(user: any) {
    if (user.discussion.messages) {
      return user.discussion.messages[user.discussion.messages.length - 1].content
    }
    else {
      return '';
    }
  }

}
