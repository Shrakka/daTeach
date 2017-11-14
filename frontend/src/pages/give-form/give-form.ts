import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonProvider } from '../../providers/lesson/lesson';
import { TopicModalPage } from '../../pages/topic-modal/topic-modal';
import { LocationModalPage } from '../../pages/location-modal/location-modal';
import { TranslateService } from 'ng2-translate';

declare var google;

@IonicPage()
@Component({
  selector: 'page-give-form',
  templateUrl: 'give-form.html',
})
export class GiveFormPage {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  giveForm: any;
  topicsDisplay: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public modalCtrl: ModalController, public lessonProvider: LessonProvider, public alertCtrl: AlertController, public translate: TranslateService) {

    this.giveForm =   {
      role: 'teacher',
      type: 'regular',
      moving: 'move',
      topics: [],
      location: [],
      dates: []
      };

      this.topicsDisplay = []

    this.lessonProvider.getTopics();
  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad GiveFormPage');
  }
  selectedRegular() {}
  selectedPunctual() {}

   selectedNearby() {
    this.loadMap();
   }

  setMoving(moving){
    this.giveForm.moving = moving;
    console.log(this.giveForm);
  }

  onTopicFocus(){
    const topicModal = this.modalCtrl.create(TopicModalPage, {'give':true});

    topicModal.onDidDismiss(data => {
      this.giveForm.topics = data.map(obj => obj.key);
      this.topicsDisplay = data.map(obj => obj.name);
      console.log(this.giveForm.topics);
    })
    topicModal.present();
  }

  onLocationFocus(){
    const locationModal = this.modalCtrl.create(LocationModalPage, {'give':true});
    locationModal.onDidDismiss(data => {
      this.giveForm.location = data;
    })
    locationModal.present();
  }

  onDatesSelection($event) {
    // EVENT = LIST DE DATE
    this.giveForm.dates = $event;
  }
   loadMap() {

    let latLng = new google.maps.LatLng(-34.9290, 138.6010);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
     setTimeout(() => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, 200);
    
  }

  goToResults() {
    if(this.giveForm.location === '' || this.giveForm.topics.length === 0){
      const alert = this.alertCtrl.create({
        title: (this.translate.get("ALERT_COMPLETE_TITLE") as any).value,
        subTitle:(this.translate.get("ALERT_COMPLETE_TEXT") as any).value,
        buttons: ['OK']
      });
      alert.present();
    } else {
        if(this.giveForm.type === 'punctual' && this.giveForm.dates.length === 0) {
          const alert = this.alertCtrl.create({
            title: (this.translate.get("ALERT_CALENDAR_TITLE") as any).value,
            subTitle:(this.translate.get("ALERT_CALENDAR_TEXT") as any).value,
            buttons: ['OK']
          });
          alert.present();
        } else {
          this.lessonProvider.request = this.giveForm;
          this.lessonProvider.postLessonRequest(this.giveForm);
          this.navCtrl.push('ResultsPage', {mode: "give"});
        }
      }
    }
  }
