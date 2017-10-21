import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonProvider } from '../../providers/lesson/lesson';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  mode: string;
  created: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public lessonProvider: LessonProvider, public alertCtrl: AlertController) {
    this.mode = this.navParams.get('mode');
    this.created = false;
  }

  ionViewDidLoad() {
  }

  createLesson() {
    if(!this.userProvider.user){
      const alert = this.alertCtrl.create({
        title:'Not registered yet?',
        subTitle:'To create your personal announce, please sign up or log in.',
        buttons: [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.navCtrl.push('LoginPage');
          }
        }]
      });
      alert.present();
    } else {
      this.lessonProvider.postLesson(this.lessonProvider.request);
    }
    
  }

}
