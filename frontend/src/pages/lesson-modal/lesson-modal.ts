import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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
  give: boolean; // to precise if it's a give or taken form 

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    
    this.give = this. navParams.get('give');
    console.log(this.give);

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
