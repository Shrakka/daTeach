import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LessonProvider } from '../../providers/lesson/lesson';

@Component({
  selector: 'result',
  templateUrl: 'result.html'
})
export class ResultComponent {
  @Input() result: any;
  @Input() mode: string;

  constructor(public navCtrl: NavController, public lessonProvider: LessonProvider) {
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
