import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPage } from './detail';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { CalendarComponentModule } from '../../components/calendar/calendar.module';

@NgModule({
  declarations: [
    DetailPage,
  ],
  imports: [
    CalendarComponentModule,
    HeaderComponentModule,
    FooterComponentModule,
    IonicPageModule.forChild(DetailPage),
  ],
})
export class DetailPageModule {}
