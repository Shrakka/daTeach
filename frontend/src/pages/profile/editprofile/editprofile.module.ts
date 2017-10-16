import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfilePage } from '../editprofile/editprofile';
import { HeaderComponentModule } from '../../../components/header/header.module';
import { FooterComponentModule } from '../../../components/footer/footer.module';
import { ProfileBannerComponentModule } from '../../../components/profile-banner/profile-banner.module';

@NgModule({
  declarations: [
    EditProfilePage,
  ],
  imports: [
    ProfileBannerComponentModule,
    FooterComponentModule,
    HeaderComponentModule,
    IonicPageModule.forChild(EditProfilePage),
  ],
})
export class EditProfilePageModule {}
