import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationModalPage } from './location-modal';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
  declarations: [
    LocationModalPage,
  ],
  imports: [
    FooterComponentModule,
    IonicPageModule.forChild(LocationModalPage),
    TranslateModule
  ],
})
export class LocationModalPageModule {}
