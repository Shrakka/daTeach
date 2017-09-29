import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiveFormPage } from './give-form';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    GiveFormPage,
  ],
  imports: [
    HeaderComponentModule,
    FooterComponentModule,
    IonicPageModule.forChild(GiveFormPage),
  ],
})
export class GiveFormPageModule {}
