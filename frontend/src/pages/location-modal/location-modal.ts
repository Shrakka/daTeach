import { Component,NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {} from '@types/googlemaps';

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

  // searchQuery: string = '';
  pickedLocation = {'name':'Ibiza', 'clicked':false};
  // locations = [];
  give: boolean;

  autocompleteItems;
  autocomplete;
  service = new (google.maps).places.AutocompleteService();

  constructor(public navCtrl: NavController, public navParams: NavParams,  public http: Http,
    public viewCtrl: ViewController, private geolocation: Geolocation, private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };

    this.give = navParams.get('give');
    
    for(let l of this.RawLocations){
      this.autocompleteItems.push({'name': l, 'clicked':false});
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationModalPage');
  }

  // search($event){
  //   console.log();
  // }

  // onCancel($event) {

  // }

  closeModal() {
        this.viewCtrl.dismiss(this.pickedLocation);
      }

  chooseLocation(location) {
    console.log(location);
    this.pickedLocation = location;
     // debugger;
    this.closeModal();
   
  }

  getposition() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
       console.log('latitude', resp.coords.latitude);
       console.log('longitude', resp.coords.longitude);

       var requestUrl="https://maps.googleapis.com/maps/api/geocode/json?latlng="+resp.coords.latitude+","+resp.coords.longitude+
       "&key=AIzaSyCvYUJBCSnda6uaadmkzlRtDIeWE7QSPlU";
       this.http.get(requestUrl).map(res => res.json()).subscribe(data => {
        this.pickedLocation={'name': data.results[0].formatted_address, 'clicked':false};
        this.closeModal();
        
        });


      //  this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
      // .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
      // .catch((error: any) => console.log(error));
      
     })
      .catch((error) => {
    console.log('Error getting location', error);});

    
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }

    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query,  componentRestrictions: {country: 'FR'} }, 
      function (predictions, status) {
        me.autocompleteItems = []; 
        me.zone.run(function () {
          predictions.forEach(function (prediction) {
            me.autocompleteItems.push({'name': prediction.description, 'clicked':false});
          });
        });
      });
  }

}
