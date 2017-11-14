import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LessonProvider } from '../../providers/lesson/lesson';
import { TranslateService } from 'ng2-translate';

@IonicPage()
@Component({
  selector: 'page-topic-modal',
  templateUrl: 'topic-modal.html',
})
export class TopicModalPage {
  topics = [];
  pickedTopics = [];
  searchQuery: string = '';
  suggestions = [];
  give: boolean; // to precise if it's a give or taken form



  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public lessonProvider: LessonProvider, public translate: TranslateService) {
    this.give = this. navParams.get('give');
    this.topics = this.lessonProvider.topics.topics;

    for(let topic of this.topics) {
      this.suggestions.push({'key': topic, 'name': (this.translate.get('TOPIC_' + topic) as any).value, 'checked': false, 'hidden': false});
    }
  }

  search($event){
    this.suggestions.map(obj => {
      if(!obj.name.toLowerCase().includes(this.searchQuery.toLowerCase())){
        obj.hidden = true;
      } else {
        obj.hidden = false;
      }
    });
  }

  onCancel($event) {

  }


  getVisibleSuggestions() {
    return (this.suggestions.filter(obj => !obj.hidden)).slice(0,7);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopicModalPage');
  }

  closeModal() {
    this.viewCtrl.dismiss(this.suggestions.filter(obj => obj.checked));
  }

}
