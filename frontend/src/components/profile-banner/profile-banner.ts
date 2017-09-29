import { Component } from '@angular/core';

/**
 * Generated class for the ProfileBannerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-banner',
  templateUrl: 'profile-banner.html'
})
export class ProfileBannerComponent {

  text: string;

  constructor() {
    console.log('Hello ProfileBannerComponent Component');
    this.text = 'Hello World';
  }

}
