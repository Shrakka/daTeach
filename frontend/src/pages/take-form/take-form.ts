import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonProvider } from '../../providers/lesson/lesson';
import { LessonModalPage } from '../../pages/lesson-modal/lesson-modal';
import { LocationModalPage } from '../../pages/location-modal/location-modal';

@IonicPage()
@Component({
  selector: 'page-take-form',
  templateUrl: 'take-form.html',
})
export class TakeFormPage {

  formValue = {
    role: 'student',
    type: 'regular',
    moving: 'move',
    lessons: [],
    location: '',
    dates: []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public modalCtrl: ModalController, public lessonProvider: LessonProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TakeFormPage');
  }

  goToResults() {
    this.lessonProvider.postLessonRequest(this.formValue);
    this.navCtrl.push('ResultsPage', {mode: "take"});
  }

  selectedRegular() {

  }

  selectedPunctual() {

  }

  searchLesson($event){
    console.log($event);
  }

  searchLocation($event){
    console.log($event);
  }

  onLessonFocus(){
    const lessonModal = this.modalCtrl.create(LessonModalPage, {'give':false});

    lessonModal.onDidDismiss(data => {
      this.formValue.lessons = data;
      console.log(this.formValue.lessons);
    })
    lessonModal.present();
  }

  onLocationFocus(){
    const locationModal = this.modalCtrl.create(LocationModalPage, {'give':false}, {showBackdrop: true});

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
