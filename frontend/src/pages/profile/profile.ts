import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { PopoverController } from 'ionic-angular';
import { EditProfilePage } from '../profile/editprofile/editprofile';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public bannerURL;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider,public popoverCtrl: PopoverController, public alertCtrl: AlertController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
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
    // const alert = this.alertCtrl.create({
    //   title: 'Login',
    //   inputs: [
    //     {
    //       name: 'url',
    //       placeholder: 'New URL'
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: 'Set',
    //       handler: data => {
    //         this.userProvider.user.public.picture = 'assets/img/' + data.url + '.png';
    //         this.userProvider.updateUser();
    //       }
    //     },
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: data => {
    //         console.log('Cancel clicked');
    //       }
    //     }
    //   ]

    // });
    // alert.present();
    this.presentActionSheet();


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
    this.userProvider.isAuth = false;
    this.navCtrl.push('LoginPage');
  }

  // ------------------------- FILE UPLOAD -------------------------
  loading: Loading;

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            let fileName = this.createFileName();
            this.copyAndSend(correctPath, currentName, fileName);
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        let fileName = this.createFileName();
        this.copyAndSend(correctPath, currentName, fileName);
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
private createFileName() {
  return Date.now() + '.jpg';
}
 
// Copy the image to a local folder and send to backend.
private copyAndSend(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.sendPhoto(newFileName);
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

  public sendPhoto(fileName) {
    var url = this.userProvider.getPostPhotoURL(this.userProvider.user.id);
    var targetPath = this.pathForImage(fileName);
    var options = {
      fileKey: "photo",
      fileName: fileName,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {'fileName': fileName}
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loading = this.loadingCtrl.create({
      content: "Uploading photo..."
    });
    this.loading.present();

    fileTransfer.upload(targetPath, url, options).then(data => {
      this.userProvider.user.public.picture = (data.response as any).picture;
      this.loading.dismissAll()
      this.presentToast('Image succesfully uploaded.');
    }, err => {
      console.log(err);
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }



}
