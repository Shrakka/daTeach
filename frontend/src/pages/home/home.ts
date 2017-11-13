import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { sysOptions } from '../../app/i18n.constants';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {
    this.sysOptions = sysOptions;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  goToTakeForm() {
    this.navCtrl.push('TakeFormPage');
  }

  goToGiveForm() {
    this.navCtrl.push('GiveFormPage');
  }

  changeLanguage() {
    var language = (sysOptions.systemLanguage == 'fr') ? 'en' : 'fr';
    this.translate.use(language);
    sysOptions.systemLanguage = language;
  }

}
