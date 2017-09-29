import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultsPage } from './results';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    ResultsPage,
  ],
  imports: [
    HeaderComponentModule,
    FooterComponentModule,
    IonicPageModule.forChild(ResultsPage),
  ],
})
export class ResultsPageModule {}
