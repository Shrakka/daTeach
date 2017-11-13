import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicModalPage } from './topic-modal';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
  declarations: [
    TopicModalPage,
  ],
  imports: [
    FooterComponentModule,
    IonicPageModule.forChild(TopicModalPage),
    TranslateModule
  ],
})
export class TopicModalPageModule {}
