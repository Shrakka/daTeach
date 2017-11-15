import { Component, Input } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { LessonProvider } from '../../providers/lesson/lesson';

@Component({
  selector: 'result-map',
  templateUrl: 'result-map.html'
})
export class ResultMapComponent {
  @Input() result: any;
  @Input() mode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public lessonProvider: LessonProvider) {

    if(navParams.data.result){//Access from the map
    this.result = navParams.data.result;
    }
  }

  goToClient() {
    this.navCtrl.push('DetailPage', {result: this.result})
  }

  getColor(key: string, value: string) {
    if (key === 'topic') {
      if (this.lessonProvider.request.topics.includes(value)) {
        return (this.mode === 'give') ? 'primary' : 'secondary'
      }
      else {
        return 'light';
      }
    }
    else if (key === 'town') {
      if (value === this.lessonProvider.request.location.town) {
        return (this.mode === 'give') ? 'primary' : 'secondary'
      }
      else {
        return 'light';
      }
    }
    else if (key === 'moving') {
      if (value !== this.lessonProvider.request.moving) {
        return (this.mode === 'give') ? 'primary' : 'secondary'
      }
      else {
        return 'light';
      }
    }
    else {
      if (value === this.lessonProvider.request[key]) {
        return (this.mode === 'give') ? 'primary' : 'secondary'
      }
      else {
        return 'light';
      }
    }
  }

}
