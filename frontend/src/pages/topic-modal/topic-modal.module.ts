import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicModalPage } from './topic-modal';
import { FooterComponentModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    TopicModalPage,
  ],
  imports: [
    FooterComponentModule,
    IonicPageModule.forChild(TopicModalPage),
  ],
})
export class TopicModalPageModule {}
