import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonProvider } from '../../providers/lesson/lesson';
import { TopicModalPage } from '../../pages/topic-modal/topic-modal';
import { LocationModalPage } from '../../pages/location-modal/location-modal';

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

  constructor(public navCtrl: NavController,private geolocation: Geolocation, public navParams: NavParams, public userProvider: UserProvider, public modalCtrl: ModalController, public lessonProvider: LessonProvider, public alertCtrl: AlertController) {
    // INIT FORM
    this.takeForm =   {
    role: 'student',
    type: 'regular',
    moving: 'move',
    topics: [],
    location: [],
    dates: []
    }

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
       // return
       // var requestUrl="https://maps.googleapis.com/maps/api/geocode/json?latlng="+resp.coords.latitude+","+resp.coords.longitude+
       // "&key=AIzaSyCvYUJBCSnda6uaadmkzlRtDIeWE7QSPlU";
       // this.http.get(requestUrl).map(res => res.json()).subscribe(data => {
       //  var town=data.results[0].address_components[2].long_name;
       //  this.pickedLocation={'town':town, 'fullAddress': data.results[0].formatted_address, 'position':{'lat':resp.coords.latitude,'long':resp.coords.longitude},'clicked':false};
       //  this.closeModal();
        
       //  });


      //  this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
      // .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
      // .catch((error: any) => console.log(error));
      
     })
      .catch((error) => {
    console.log('Error getting location', error);});

  }

   selectedNearby() {
    this.getLatLng();
   
   }

  setMoving(moving){
    this.takeForm.moving = moving;
    console.log(this.takeForm);
  }

  onTopicFocus(){
    const topicModal = this.modalCtrl.create(TopicModalPage, {'give':false});
    topicModal.onDidDismiss(data => {
      this.takeForm.topics = data;
      console.log(this.takeForm.topics);
    })
    topicModal.present();
  }

  onLocationFocus(){
    const locationModal = this.modalCtrl.create(LocationModalPage, {'give':false}, {showBackdrop: true});
    locationModal.onDidDismiss(data => {
      this.takeForm.location = data;
    })
    locationModal.present();
  }

  onDatesSelection($event) {
    // EVENT = LIST DE DATE
    this.takeForm.dates = $event;
  }

  addMarker(latlng,map,label){
     var marker = new google.maps.Marker({
          position: latlng,
          map: map,
          label: label
        });
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
      this.addMarker(latLng,this.map,'Me');
    }, 200);
    
  }
  
  goToResults() {
    if(this.takeForm.location === '' || this.takeForm.topics.length === 0){
      const alert = this.alertCtrl.create({
        title:'Complete the form',
        subTitle:'Please fill the empty fields to continue',
        buttons: ['OK']
      });
      alert.present();
    } else {
      if(this.takeForm.type === 'punctual' && this.takeForm.dates.length === 0) {
        const alert = this.alertCtrl.create({
          title:'Choose a date',
          subTitle:'Please select at least one date you would be available to facilitate matching',
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
