import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonsPage } from './lessons';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { ProfileBannerComponentModule } from '../../components/profile-banner/profile-banner.module';

@NgModule({
  declarations: [
    LessonsPage,
  ],
  imports: [
    ProfileBannerComponentModule,
    HeaderComponentModule,
    FooterComponentModule,
    IonicPageModule.forChild(LessonsPage),
  ],
})
export class LessonsPageModule {}
