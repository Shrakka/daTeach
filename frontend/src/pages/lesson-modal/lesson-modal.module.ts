import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonModalPage } from './lesson-modal';
import { FooterComponentModule } from '../../components/footer/footer.module';

@NgModule({
  declarations: [
    LessonModalPage,
  ],
  imports: [
    FooterComponentModule,
    IonicPageModule.forChild(LessonModalPage),
  ],
})
export class LessonModalPageModule {}
