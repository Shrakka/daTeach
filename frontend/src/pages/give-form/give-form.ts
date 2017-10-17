import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonProvider } from '../../providers/lesson/lesson';
import { TopicModalPage } from '../../pages/topic-modal/topic-modal';
import { LocationModalPage } from '../../pages/location-modal/location-modal';

@IonicPage()
@Component({
  selector: 'page-give-form',
  templateUrl: 'give-form.html',
})
export class GiveFormPage {

  formValue = {
    role: 'teacher',
    type: 'regular',
    moving: 'move',
    topics: [],
    location: '',
    dates: []
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public modalCtrl: ModalController, public lessonProvider: LessonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiveFormPage');
  }

  goToResults() {
    this.lessonProvider.postLessonRequest(this.formValue);
    this.navCtrl.push('ResultsPage', {mode: "give"});
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
    const topicModal = this.modalCtrl.create(TopicModalPage, {'give':true});

    topicModal.onDidDismiss(data => {
      this.formValue.topics = data;
      console.log(this.formValue.topics);
    })
    topicModal.present();
  }

  onLocationFocus(){
    const locationModal = this.modalCtrl.create(LocationModalPage, {'give':true});

    locationModal.onDidDismiss(data => {
      this.formValue.location = data.name;
    })
    locationModal.present();
  }

  onDatesSelection($event) {
    // EVENT = LIST DE DATE
    this.formValue.dates = $event;
  }

}
