import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPage } from './detail';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { CalendarComponentModule } from '../../components/calendar/calendar.module';
import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
  declarations: [
    DetailPage,
  ],
  imports: [
    CalendarComponentModule,
    HeaderComponentModule,
    FooterComponentModule,
    IonicPageModule.forChild(DetailPage),
    TranslateModule
  ],
})
export class DetailPageModule {}
