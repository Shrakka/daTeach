import { Component, Input, OnInit } from '@angular/core';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'lesson-card',
  templateUrl: 'lesson-card.html'
})
export class LessonCardComponent {
  @Input() result;
  author: any;
  users: any;


  constructor(public userProvider: UserProvider) {}

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

}
