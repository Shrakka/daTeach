import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonModalPage } from '../../pages/lesson-modal/lesson-modal';

/**
 * Generated class for the GiveFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-give-form',
  templateUrl: 'give-form.html',
})
export class GiveFormPage {
  
  formValue = {
    lessonType: "regular",
    move: 'move',
    lessons: []
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GiveFormPage');
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

  }

}
