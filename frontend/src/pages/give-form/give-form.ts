import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonModalPage } from '../../pages/lesson-modal/lesson-modal';
import { LocationModalPage } from '../../pages/location-modal/location-modal';

@IonicPage()
@Component({
  selector: 'page-give-form',
  templateUrl: 'give-form.html',
})
export class GiveFormPage {

  formValue = {
    role: 'student',
    type: 'regular',
    moving: 'move',
    lessons: [],
    location: '',
    dates: []
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiveFormPage');
  }

  goToResults() {
    console.log(this.formValue);
    this.navCtrl.push('ResultsPage', {mode: "give", form: this.formValue});
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
    const lessonModal = this.modalCtrl.create(LessonModalPage, {'give':true});

    lessonModal.onDidDismiss(data => {
      this.formValue.lessons = data;
      console.log(this.formValue.lessons);
    })
    lessonModal.present();
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
