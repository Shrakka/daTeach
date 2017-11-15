import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LessonProvider } from '../../providers/lesson/lesson';
import { ResultMapComponent } from '../../components/result-map/result-map';
declare var google;

/**
 * Generated class for the LessonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nearby',
  templateUrl: 'nearby.html',
})
export class NearbyPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public lessonProvider: LessonProvider, public popoverCtrl: PopoverController, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NearbyPage');
    this.selectedNearby();
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

   addMarker(latlng,map,label, result){
     var url = (result.lesson.author.role === 'student') ? 'assets/img/map-marker-take.png' : 'assets/img/map-marker.png';
     var mode = (result.lesson.author.role === 'student') ? 'take' : 'give';
      var image = {
       url: url,
       // This marker is 20 pixels wide by 32 pixels high.
       size: new google.maps.Size(48, 48),
       // The origin for this image is (0, 0).
       origin: new google.maps.Point(0, 0),

       labelOrigin:new google.maps.Point(24, 48)
       // The anchor for this image is the base of the flagpole at (0, 32).
       // anchor: new google.maps.Point(0, 32)
     };
      var marker = new google.maps.Marker({
           position: latlng,
           icon:image,
           map: map
         });
       let me=this;
       if(result){
        marker.addListener('click', function(e) {
             let popover = me.popoverCtrl.create(ResultMapComponent, {result:result, mode: mode});
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
         this.addMarker({lat:parseFloat(latlng.lat),lng:parseFloat(latlng.long)},this.map,lessonObj.lesson.topics[0],lessonObj);
       }
     }, 200);

   }

}
