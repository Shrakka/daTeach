import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../../providers/user/user';
import { ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditProfilePage {
   field:any;
  constructor(public viewCtrl: ViewController, public navParams: NavParams, public userProvider: UserProvider) {
   this.field=navParams.data.field;
  }

  ionViewDidLoad() {
  }
  closepopover(myevent){
    this.viewCtrl.dismiss();
  }
  editprofile(myevent){
    this.viewCtrl.dismiss();
  }

  // modifyContactPopover(myEvent){
  //   let popover = this.popoverCtrl.create(ModifyContactPage);
  //   popover.present({
  //     ev: myEvent
  //   });
  // }

  // }

}
