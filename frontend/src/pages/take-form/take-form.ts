import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonProvider } from '../../providers/lesson/lesson';
import { TopicModalPage } from '../../pages/topic-modal/topic-modal';
import { LocationModalPage } from '../../pages/location-modal/location-modal';

@IonicPage()
@Component({
  selector: 'page-take-form',
  templateUrl: 'take-form.html',
})
export class TakeFormPage {

  takeForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public modalCtrl: ModalController, public lessonProvider: LessonProvider, public alertCtrl: AlertController) {
    // INIT FORM
    this.takeForm =   {
    role: 'student',
    type: 'regular',
    moving: 'move',
    topics: [],
    location: '',
    dates: []
    }

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
      this.takeForm.topics = data;
      console.log(this.takeForm.topics);
    })
    topicModal.present();
  }

  onLocationFocus(){
    const locationModal = this.modalCtrl.create(LocationModalPage, {'give':false}, {showBackdrop: true});
    locationModal.onDidDismiss(data => {
      this.takeForm.location = data.name;
    })
    locationModal.present();
  }

  onDatesSelection($event) {
    // EVENT = LIST DE DATE
    this.takeForm.dates = $event;
  }

  goToResults() {
    if(this.takeForm.location === '' || this.takeForm.topics === []){
      const alert = this.alertCtrl.create({
        title:'Complete the form',
        subTitle:'Please fill the empty fields to continue',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.lessonProvider.postLessonRequest(this.takeForm);
      this.navCtrl.push('ResultsPage', {mode: "take"});
    }
  }

}
