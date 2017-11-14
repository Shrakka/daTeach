import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { EditProfilePage } from '../profile/editprofile/editprofile';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public bannerURL;


  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider,public popoverCtrl: PopoverController, public alertCtrl: AlertController) {
    }

  ionViewDidLoad() {
    this.bannerURL = 'assets/img/orange.jpg';
  }

  modifyprofile(myEvent){
    let fieldname = myEvent.currentTarget.children[0].innerText;
  	let popover = this.popoverCtrl.create(EditProfilePage, {field:fieldname});
    popover.present({
      ev: myEvent
    });
  }

  photoEdit() {
    const alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'url',
          placeholder: 'New URL'
        },
      ],
      buttons: [
        {
          text: 'Set',
          handler: data => {
            this.userProvider.user.public.picture = 'assets/img/' + data.url + '.png';
            this.userProvider.updateUser();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]

    });
    alert.present();
  }


  coverEdit() {
    const alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'url',
          placeholder: 'New URL',
          type: 'textarea'
        },
      ],
      buttons: [
        {
          text: 'Set',
          handler: data => {
            this.bannerURL = 'assets/img/' + data.url;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]

    });
    alert.present();
  }

  logout() {
    this.navCtrl.setRoot('LoginPage');
  }

}
