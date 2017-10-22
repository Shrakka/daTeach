import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { PopoverController } from 'ionic-angular';
import { EditProfilePage } from '../profile/editprofile/editprofile';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider,public popoverCtrl: PopoverController) {
    console.log(userProvider.user);
  }

  ionViewDidLoad() {
  }

  modifyprofile(myEvent){
    let fieldname = myEvent.currentTarget.children[0].innerText;
  	let popover = this.popoverCtrl.create(EditProfilePage, {field:fieldname});
    popover.present({
      ev: myEvent
    });
  }

  // }

}
