import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonProvider } from '../../providers/lesson/lesson';
import { TopicModalPage } from '../../pages/topic-modal/topic-modal';
import { LocationModalPage } from '../../pages/location-modal/location-modal';

@IonicPage()
@Component({
  selector: 'page-give-form',
  templateUrl: 'give-form.html',
})
export class GiveFormPage {

  giveForm: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public modalCtrl: ModalController, public lessonProvider: LessonProvider, public alertCtrl: AlertController) {
    this.giveForm =   {
      role: 'teacher',
      type: 'regular',
      moving: 'move',
      topics: [],
      location: '',
      dates: []
      };

    this.lessonProvider.getTopics();
  }

  ionViewDidLoad() {console.log('ionViewDidLoad GiveFormPage');}
  selectedRegular() {}
  selectedPunctual() {}

  setMoving(moving){
    this.giveForm.moving = moving;
    console.log(this.giveForm);
  }
  
  onTopicFocus(){
    const topicModal = this.modalCtrl.create(TopicModalPage, {'give':true});

    topicModal.onDidDismiss(data => {
      this.giveForm.topics = data;
      console.log(this.giveForm.topics);
    })
    topicModal.present();
  }

  onLocationFocus(){
    const locationModal = this.modalCtrl.create(LocationModalPage, {'give':true});
    locationModal.onDidDismiss(data => {
      this.giveForm.location = data.name;
    })
    locationModal.present();
  }

  onDatesSelection($event) {
    // EVENT = LIST DE DATE
    this.giveForm.dates = $event;
  }

  goToResults() {
    if(this.giveForm.location === '' || this.giveForm.topics.length === 0){
      const alert = this.alertCtrl.create({
        title:'Complete the form',
        subTitle:'Please fill the empty fields to continue',
        buttons: ['OK']
      });
      alert.present();
    } else {
        if(this.giveForm.type === 'punctual' && this.giveForm.dates.length === 0) {
          const alert = this.alertCtrl.create({
            title:'Choose a date',
            subTitle:'Please select at least one date you would be available to facilitate matching',
            buttons: ['OK']
          });
          alert.present();
        } else {
          this.lessonProvider.request = this.giveForm;
          this.lessonProvider.postLessonRequest(this.giveForm);
          this.navCtrl.push('ResultsPage', {mode: "take"});
        }
      }
    }
  }
