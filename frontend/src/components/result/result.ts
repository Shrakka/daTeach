import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'result',
  templateUrl: 'result.html'
})
export class ResultComponent {
  @Input() result: any;
  @Input() mode: string;

  constructor(public navCtrl: NavController) {
  }

  goToClient() {
    this.navCtrl.push('DetailPage', this.result)
  }

}
