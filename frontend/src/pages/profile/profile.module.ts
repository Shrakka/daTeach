import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { ProfileBannerComponentModule } from '../../components/profile-banner/profile-banner.module';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    ProfileBannerComponentModule,
    FooterComponentModule,
    HeaderComponentModule,
    IonicPageModule.forChild(ProfilePage),
  ],
})
export class ProfilePageModule {}
