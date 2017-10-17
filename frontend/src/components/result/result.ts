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
    this.lessonProvider.lesson = this.result
    this.navCtrl.push('DetailPage')
  }

}
