import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonProvider } from '../../providers/lesson/lesson';
import { DiscussionProvider } from '../../providers/discussion/discussion';

/**
 * Generated class for the LessonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lessons',
  templateUrl: 'lessons.html',
})
export class LessonsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public lessonProvider: LessonProvider, public discussionProvider: DiscussionProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonsPage');
    this.lessonProvider.getUserLessons(this.userProvider.user.id)
  }

  activeLessons() {
    return this.lessonProvider.lessons.filter((result) => {return result.lesson.active})
  }

  inactiveLessons() {
    return this.lessonProvider.lessons.filter((result) => {return !result.lesson.active})
  }

}
