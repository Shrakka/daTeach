import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  firstname: string;
  lastname: string;
  picture: string;
  shortDescription: string;
  lessons: string[];
  comment: string = '';
  askmessage: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.firstname = this.navParams.get('firstname');
    this.lastname = this.navParams.get('lastname');
    this.picture = this.navParams.get('picture');
    this.shortDescription = this.navParams.get('shortDescription');
    this.lessons = this.navParams.get('lessons');
    this.longDescription = this.navParams.get('longDescription');
    this.askmessage = this.navParams.get('askmessage');
  }

  ionViewDidLoad() {
  }

}
