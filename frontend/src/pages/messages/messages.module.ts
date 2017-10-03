import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagesPage } from './messages';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { ProfileBannerComponentModule } from '../../components/profile-banner/profile-banner.module';
import { MessageCardComponentModule } from '../../components/message-card/message-card.module';

@NgModule({
  declarations: [
    MessagesPage,
  ],
  imports: [
    MessageCardComponentModule,
    ProfileBannerComponentModule,
    FooterComponentModule,
    HeaderComponentModule,
    IonicPageModule.forChild(MessagesPage),
  ],
})
export class MessagesPageModule {}
