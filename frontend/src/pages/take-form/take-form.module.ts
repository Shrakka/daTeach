import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakeFormPage } from './take-form';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    TakeFormPage,
  ],
  imports: [
    HeaderComponentModule,
    FooterComponentModule,
    IonicPageModule.forChild(TakeFormPage),
  ],
})
export class TakeFormPageModule {}
