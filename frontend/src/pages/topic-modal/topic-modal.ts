import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-topic-modal',
  templateUrl: 'topic-modal.html',
})
export class TopicModalPage {

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

  pickedTopics = [];
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
    console.log(this.pickedTopics);
  }

  onCancel($event) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TopicModalPage');
  }

  closeModal() {
    for(let s of this.suggestions) {
      if(s.checked){
        this.pickedTopics.push(s.name);
      }
    }
    this.viewCtrl.dismiss(this.pickedTopics);
  }

}
