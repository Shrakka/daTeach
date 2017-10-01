import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationModalPage } from './location-modal';
import { FooterComponentModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    LocationModalPage,
  ],
  imports: [
    FooterComponentModule,
    IonicPageModule.forChild(LocationModalPage),
  ],
})
export class LocationModalPageModule {}
