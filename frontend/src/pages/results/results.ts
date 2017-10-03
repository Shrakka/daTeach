import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ResultsProvider } from '../../providers/results/results';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  mode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public resultsProvider: ResultsProvider) {
    this.mode = this.navParams.get('mode')
  }

  ionViewDidLoad() {
  }

}
