import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultsPage } from './results';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { ProfileBannerComponentModule } from '../../components/profile-banner/profile-banner.module';
import { ResultComponentModule } from '../../components/result/result.module';

@NgModule({
  declarations: [
    ResultsPage,
  ],
  imports: [
    ResultComponentModule,
    ProfileBannerComponentModule,
    HeaderComponentModule,
    FooterComponentModule,
    IonicPageModule.forChild(ResultsPage),
  ],
})
export class ResultsPageModule {}
