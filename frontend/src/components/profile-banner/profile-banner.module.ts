import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileBannerComponent } from './profile-banner';

@NgModule({
	declarations: [ProfileBannerComponent],
	imports: [IonicPageModule.forChild(ProfileBannerComponent)],
	exports: [ProfileBannerComponent]
})
export class ProfileBannerComponentModule {}
