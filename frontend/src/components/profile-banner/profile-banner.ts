import { Component, Input } from '@angular/core';
import { LessonProvider } from '../../providers/lesson/lesson';
import { UserProvider } from '../../providers/user/user'

@Component({
  selector: 'profile-banner',
  templateUrl: 'profile-banner.html'
})

export class ProfileBannerComponent {
  constructor(public userProvider: UserProvider, public lessonProvider: LessonProvider) {
  }

  getColor() {
    return this.lessonProvider.request.role === 'student' ? 'primary' : 'secondary'
  }
}
