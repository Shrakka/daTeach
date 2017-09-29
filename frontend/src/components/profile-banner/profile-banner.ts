import { Component, Input } from '@angular/core';

@Component({
  selector: 'profile-banner',
  templateUrl: 'profile-banner.html'
})

export class ProfileBannerComponent {
  @Input() firstname: string;
  @Input() lastname: string;
  @Input() picture: string;
  @Input() shortDescription: string;

  constructor() {
  }

}
