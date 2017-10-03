import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonModalPage } from '../../pages/lesson-modal/lesson-modal';
import { LocationModalPage } from '../../pages/location-modal/location-modal';

@IonicPage()
@Component({
  selector: 'page-take-form',
  templateUrl: 'take-form.html',
})
export class TakeFormPage {

  formValue = {
    lessonType: "regular",
    move: 'move',
    location: '',
    lessons: []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TakeFormPage');
  }

  goToResults() {
    console.log(this.formValue);
    this.navCtrl.push('ResultsPage');
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
        const lessonModal = this.modalCtrl.create(LessonModalPage);
    
        lessonModal.onDidDismiss(data => {
          this.formValue.lessons = data;
          console.log(this.formValue.lessons);
        })
        lessonModal.present();
      }
    
      onLocationFocus(){
        const locationModal = this.modalCtrl.create(LocationModalPage);
    
        locationModal.onDidDismiss(data => {
          this.formValue.location = data.name;
        })
        locationModal.present();
      }
    
      onDatesSelection($event) {
        // EVENT = LIST DE DATE 
        console.log($event);
      }

}
