import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonProvider } from '../../providers/lesson/lesson';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  mode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public lessonProvider: LessonProvider) {
    this.mode = this.navParams.get('mode');
  }

  ionViewDidLoad() {
  }

  createLesson() {
    this.lessonProvider.postLesson(this.lessonProvider.request);
  }

}
