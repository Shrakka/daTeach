import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakeFormPage } from './take-form';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { CalendarComponentModule } from '../../components/calendar/calendar.module';
import { ProfileBannerComponentModule } from '../../components/profile-banner/profile-banner.module'

@NgModule({
  declarations: [
    TakeFormPage,
  ],
  imports: [
    CalendarComponentModule,
    ProfileBannerComponentModule,
    HeaderComponentModule,
    FooterComponentModule,
    IonicPageModule.forChild(TakeFormPage),
  ],
})
export class TakeFormPageModule {}
