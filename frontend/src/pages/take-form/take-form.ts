import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public modalCtrl: ModalController, public lessonProvider: LessonProvider) {
    this.takeForm =   {
    role: 'student',
    type: 'regular',
    moving: 'move',
    topics: [],
    location: '',
    dates: []
    }

    this.lessonProvider.getTopics();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TakeFormPage');
  }

  goToResults() {
    this.lessonProvider.postLessonRequest(this.takeForm);
    this.navCtrl.push('ResultsPage', {mode: "take"});
  }

  selectedRegular() {

  }

  selectedPunctual() {

  }

  searchTopic($event){
    console.log($event);
  }

  searchLocation($event){
    console.log($event);
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

}