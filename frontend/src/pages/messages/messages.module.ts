import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagesPage } from './messages';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    MessagesPage,
  ],
  imports: [
    FooterComponentModule,
    HeaderComponentModule,
    IonicPageModule.forChild(MessagesPage),
  ],
})
export class MessagesPageModule {}
