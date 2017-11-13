import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonProvider } from '../../providers/lesson/lesson';
import { TopicModalPage } from '../../pages/topic-modal/topic-modal';
import { LocationModalPage } from '../../pages/location-modal/location-modal';
import { TranslateService } from 'ng2-translate';

@IonicPage()
@Component({
  selector: 'page-take-form',
  templateUrl: 'take-form.html',
})
export class TakeFormPage {

  takeForm: any;
  topicsDisplay: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public modalCtrl: ModalController, public lessonProvider: LessonProvider, public alertCtrl: AlertController, public translate: TranslateService) {
    // INIT FORM
    this.takeForm =   {
    role: 'student',
    type: 'regular',
    moving: 'move',
    topics: [],
    location: [],
    dates: []
    }
    this.topicsDisplay = []

    // LOAD PROVIDER
    this.lessonProvider.getTopics();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TakeFormPage');
  }

  selectedRegular() {

  }

  selectedPunctual() {

  }

  setMoving(moving){
    this.takeForm.moving = moving;
    console.log(this.takeForm);
  }

  onTopicFocus(){
    const topicModal = this.modalCtrl.create(TopicModalPage, {'give':false});
    topicModal.onDidDismiss(data => {
      this.takeForm.topics = data.map(obj => obj.key);
      this.topicsDisplay = data.map(obj => obj.name);
      console.log(this.takeForm.topics);
    })
    topicModal.present();
  }

  onLocationFocus(){
    const locationModal = this.modalCtrl.create(LocationModalPage, {'give':false}, {showBackdrop: true});
    locationModal.onDidDismiss(data => {
      this.takeForm.location = data;
      console.log(data)
    })
    locationModal.present();
  }

  onDatesSelection($event) {
    // EVENT = LIST DE DATE
    this.takeForm.dates = $event;
  }

  goToResults() {
    if(this.takeForm.location === '' || this.takeForm.topics.length === 0){
      const alert = this.alertCtrl.create({
        title:(this.translate.get("ALERT_COMPLETE_TITLE") as any).value,
        subTitle:(this.translate.get("ALERT_COMPLETE_TEXT") as any).value,
        buttons: ['OK']
      });
      alert.present();
    } else {
      if(this.takeForm.type === 'punctual' && this.takeForm.dates.length === 0) {
        const alert = this.alertCtrl.create({
          title:(this.translate.get("ALERT_CALENDAR_TITLE") as any).value,
          subTitle:(this.translate.get("ALERT_CALENDAR_TEXT") as any).value,
          buttons: ['OK']
        });
        alert.present();
      } else {
        this.lessonProvider.request = this.takeForm;
        this.lessonProvider.postLessonRequest(this.takeForm);
        this.navCtrl.push('ResultsPage', {mode: "take"});
      }
    }
  }

}
