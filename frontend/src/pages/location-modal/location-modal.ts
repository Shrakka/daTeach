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
  pickedLocation = {};
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
      this.autocompleteItems.push({'town': l, 'fullAddress':l, 'position':'', 'clicked':false});
    }
    this.updateSearch();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationModalPage');
  }

  closeModal() {
    this.viewCtrl.dismiss(this.pickedLocation);
  }

  chooseLocation(location) {
    console.log(location);
    if(location.position==""){
      var requestUrl=" https://maps.googleapis.com/maps/api/geocode/json?address="+location.fullAddress+"&key=AIzaSyCvYUJBCSnda6uaadmkzlRtDIeWE7QSPlU";
      this.http.get(requestUrl).map(res => res.json()).subscribe(data => {
          var position=data.results[0].geometry.location;
          location.position={'lat':position.lat,'long':position.lng}
          });
    }

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
        var town=data.results[0].address_components[2].long_name;
        this.pickedLocation={'town':town, 'fullAddress': data.results[0].formatted_address, 'position':{'lat':resp.coords.latitude,'long':resp.coords.longitude},'clicked':false};
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

    let me = this;
    this.service.getPlacePredictions({ input: (this.autocomplete.query === '' ? 'metz': this.autocomplete.query),  componentRestrictions: {country: ['FR', 'US']} },
      function (predictions, status) {
        me.autocompleteItems = [];
        me.zone.run(function () {
          if(predictions!=null){
               predictions.forEach(function (prediction) {
                 var t;
                 if(prediction.terms.length>3){
                    t=prediction.terms[2].value
                 }else if(prediction.terms.length==3){
                    t=prediction.terms[1].value
                  }else if(prediction.terms.length==2){
                    t=prediction.terms[0].value
                  }else{
                    t=prediction.terms[0].value
                  }

                 me.autocompleteItems.push({'town': t, 'fullAddress':prediction.description, 'position':'', 'clicked':false});
               });
          }
        });
      });
  }

}
