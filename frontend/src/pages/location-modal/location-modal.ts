import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-location-modal',
  templateUrl: 'location-modal.html',
})
export class LocationModalPage {

  RawLocations = [
    'Metz',
    'Paris',
    'Nantes',
    'Atlanta',
    'Miami',
    'Ibiza',
    'Cordou',
    'Poitiers'
  ];

  searchQuery: string = '';
  pickedLocation = 'Ibiza';
  locations = [];
  give: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
    this.give = navParams.get('give');
    
    for(let l of this.RawLocations){
      this.locations.push({'name': l, 'clicked':false});
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationModalPage');
  }

  search($event){
    console.log();
  }

  onCancel($event) {

  }

  closeModal() {
        this.viewCtrl.dismiss(this.pickedLocation);
      }

  chooseLocation(location) {
    console.log(location);
    this.pickedLocation = location;
    this.closeModal();
  }

  getposition() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
       console.log('latitude', resp.coords.latitude);
       console.log('longitude', resp.coords.longitude);
       alert(resp.coords.latitude + ", " + resp.coords.longitude);

       this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
      .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
      .catch((error: any) => console.log(error));
      
     })
      .catch((error) => {
    console.log('Error getting location', error);});

    
  }

}
