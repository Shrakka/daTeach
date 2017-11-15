import { Component, Input } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { LessonProvider } from '../../providers/lesson/lesson';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'result-map',
  templateUrl: 'result-map.html'
})
export class ResultMapComponent {

  result: any;
  mode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public lessonProvider: LessonProvider, public userProvider: UserProvider) {
    if(navParams.data.result){
      this.result = navParams.data.result;
    }
    if(navParams.data.mode){//Access from the map
      this.mode = navParams.data.mode;
    }
  }

  goToClient() {
    this.navCtrl.push('DetailPage', {result: this.result})
  }

  getColor(key: string, value: string) {
    if (key === 'topic') {
      if (this.lessonProvider.request.topics.includes(value)) {
        return (this.mode === 'take') ? 'primary' : 'secondary'
      }
      else {
        return 'light';
      }
    }
    else if (key === 'town') {
      if (value === this.lessonProvider.request.location.town) {
        return (this.mode === 'take') ? 'primary' : 'secondary'
      }
      else {
        return 'light';
      }
    }
    else if (key === 'moving') {
      if (value !== this.lessonProvider.request.moving) {
        return (this.mode === 'take') ? 'primary' : 'secondary'
      }
      else {
        return 'light';
      }
    }
    else {
      if (value === this.lessonProvider.request[key]) {
        return (this.mode === 'take') ? 'primary' : 'secondary'
      }
      else {
        return 'light';
      }
    }
  }

}
