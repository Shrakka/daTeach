import { Component } from '@angular/core';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
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

}
