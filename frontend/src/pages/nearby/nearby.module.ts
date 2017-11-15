import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearbyPage } from './nearby';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { ResultMapComponentModule } from '../../components/result-map/result-map.module';

@NgModule({
  declarations: [
    NearbyPage,
  ],
  imports: [
    HeaderComponentModule,
    FooterComponentModule,
    IonicPageModule.forChild(NearbyPage),
    TranslateModule,
    ResultMapComponentModule
  ],
})
export class NearbyPageModule {}
