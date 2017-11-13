import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonProvider } from '../../providers/lesson/lesson';
import { TranslateService } from 'ng2-translate';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  public mode: string;
  public created: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public lessonProvider: LessonProvider, public alertCtrl: AlertController, public translate: TranslateService) {
    this.mode = this.navParams.get('mode');
    this.created = false;
    console.log(this.lessonProvider.results)
  }

  ionViewDidLoad() {
  }

  createLesson() {
    if(!this.userProvider.user){
      const alert = this.alertCtrl.create({
        title:(this.translate.get('ALERT_NOTREGISTERED_TITLE') as any).value,
        subTitle:(this.translate.get('ALERT_NOTREGISTERED_TEXT') as any).value,
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
      this.created = true;
      var message = this.mode === 'take' ? (this.translate.get('ALERT_CREATEAD_TAKE_TEXT') as any).value : (this.translate.get('ALERT_CREATED_GIVE_TEXT') as any).value;
      const alert = this.alertCtrl.create({
        title:(this.translate.get('ALERT_CREATEAD_TITLE') as any).value,
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
    }

  }

}
