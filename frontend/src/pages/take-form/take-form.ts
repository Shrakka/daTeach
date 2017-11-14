import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage, PopoverController, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonProvider } from '../../providers/lesson/lesson';
import { TopicModalPage } from '../../pages/topic-modal/topic-modal';
import { LocationModalPage } from '../../pages/location-modal/location-modal';
import { TranslateService } from 'ng2-translate';
import {ResultComponent } from '../../components/result/result';
declare var google; 


@IonicPage()
@Component({
  selector: 'page-take-form',
  templateUrl: 'take-form.html',
})
export class TakeFormPage {

 @ViewChild('map') mapElement: ElementRef;
  map: any;

  takeForm: any;
  topicsDisplay: any;


  constructor(public navCtrl: NavController,private geolocation: Geolocation, public navParams: NavParams, public userProvider: UserProvider, public modalCtrl: ModalController, public lessonProvider: LessonProvider, public alertCtrl: AlertController, public popoverCtrl: PopoverController,public translate: TranslateService) {
// ||||||| merged common ancestors
//   constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public modalCtrl: ModalController, public lessonProvider: LessonProvider, public alertCtrl: AlertController) {
// =======
//   constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public modalCtrl: ModalController, public lessonProvider: LessonProvider, public alertCtrl: AlertController, public translate: TranslateService) {
// >>>>>>> master
    // INIT FORM
    this.takeForm =   {
    role: 'student',
    type: 'regular',
    moving: 'move',
    topics: [],
    location: [],
    dates: []
    }
    this.topicsDisplay = []

    // LOAD PROVIDER
    this.lessonProvider.getTopics();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TakeFormPage');
  }

  selectedRegular() {

  }

  selectedPunctual() {

  }

  getLatLng(){
    this.geolocation.getCurrentPosition()
      .then((resp) => {
       console.log('latitude', resp.coords.latitude);
       console.log('longitude', resp.coords.longitude);
        this.loadMap({lat:resp.coords.latitude,lng:resp.coords.longitude});
      
     })
      .catch((error) => {
    console.log('Error getting location', error);});

  }

   selectedNearby() {
    let Gform={role: '', location: '', moving: '', dates: '', type: '', topics: '', usage:'Gmaps'};
    this.lessonProvider.postLessonRequest(Gform);
    this.getLatLng();
   
   }

  setMoving(moving){
    this.takeForm.moving = moving;
    console.log(this.takeForm);
  }

  onTopicFocus(){
    const topicModal = this.modalCtrl.create(TopicModalPage, {'give':false});
    topicModal.onDidDismiss(data => {
      this.takeForm.topics = data.map(obj => obj.key);
      this.topicsDisplay = data.map(obj => obj.name);
      console.log(this.takeForm.topics);
    })
    topicModal.present();
  }

  onLocationFocus(){
    const locationModal = this.modalCtrl.create(LocationModalPage, {'give':false}, {showBackdrop: true});
    locationModal.onDidDismiss(data => {
      this.takeForm.location = data;
      console.log(data)
    })
    locationModal.present();
  }

  onDatesSelection($event) {
    // EVENT = LIST DE DATE
    this.takeForm.dates = $event;
  }

  addMarker(latlng,map,label, result){
     var image = {
      url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(50, 60),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),

      labelOrigin:new google.maps.Point(0, -2)
      // The anchor for this image is the base of the flagpole at (0, 32).
      // anchor: new google.maps.Point(0, 32)
    };
     var marker = new google.maps.Marker({
          position: latlng,
          icon:image,
          map: map,
          label: label
        });
      let me=this;
      if(result){
       marker.addListener('click', function(e) {
            let popover = me.popoverCtrl.create(ResultComponent, {result:result});
            popover.present({
              ev: e
            });
            // me.navCtrl.push('DetailPage', {result:result});
            // map.setZoom(8);
            // map.setCenter(marker.getPosition());
          });
      }
  }
  

  loadMap(LatLng) {
    // let LatLng=this.getLatLng()
    // var a=0;
    let latLng = new google.maps.LatLng(LatLng.lat, LatLng.lng);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
     setTimeout(() => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      for( var i=0; i<this.lessonProvider.results.length;i++){
        let lessonObj=this.lessonProvider.results[i];
        let latlng=lessonObj.lesson.location.position;
        this.addMarker({lat:parseFloat(latlng.lat),lng:parseFloat(latlng.long)},this.map,'lesson'+i,lessonObj);
      }
      this.addMarker(latLng,this.map,'Me','');
    }, 200);
    
  }
  
  goToResults() {
    if(this.takeForm.location === '' || this.takeForm.topics.length === 0){
      const alert = this.alertCtrl.create({
        title:(this.translate.get("ALERT_COMPLETE_TITLE") as any).value,
        subTitle:(this.translate.get("ALERT_COMPLETE_TEXT") as any).value,
        buttons: ['OK']
      });
      alert.present();
    } else {
      if(this.takeForm.type === 'punctual' && this.takeForm.dates.length === 0) {
        const alert = this.alertCtrl.create({
          title:(this.translate.get("ALERT_CALENDAR_TITLE") as any).value,
          subTitle:(this.translate.get("ALERT_CALENDAR_TEXT") as any).value,
          buttons: ['OK']
        });
        alert.present();
      } else {
        this.lessonProvider.request = this.takeForm;
        this.lessonProvider.postLessonRequest(this.takeForm);
        this.navCtrl.push('ResultsPage', {mode: "take"});
      }
    }
  }

}
