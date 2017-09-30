import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the LessonModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 

@IonicPage()
@Component({
  selector: 'page-lesson-modal',
  templateUrl: 'lesson-modal.html',
})
export class LessonModalPage {

  RawSubjects = [  // THIS INSTANCE WILL BE REMOVED
    'Mathematics',
    'Physics',
    'English',
    'Flute a bec',
    'Accrobranche',
    'Violon',
    'Freesbee',
    'Trotinette',
    'Omelette du fromage',
    'Sciences et techniques',
    'Japonais (et ouais)',
    'Encore',
    'Encore',
    'Enclume'
  ]

  pickedLessons = [];
  searchQuery: string = '';
  suggestions = [];

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  
    for(let suggestion of this.RawSubjects) {
      this.suggestions.push({'name': suggestion, 'checked': false});
    }
    this.suggestions = this.suggestions.slice(0,8);
  }

  search($event){
    console.log(this.pickedLessons);
  }

  onCancel($event) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonModalPage');
  }

  closeModal() {

    for(let s of this.suggestions) {
      if(s.checked){
        this.pickedLessons.push(s.name);
      }
    }
    this.viewCtrl.dismiss(this.pickedLessons);
  }

}