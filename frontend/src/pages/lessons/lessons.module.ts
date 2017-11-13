import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LessonsPage } from './lessons';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { ProfileBannerComponentModule } from '../../components/profile-banner/profile-banner.module';
import { LessonCardComponentModule } from '../../components/lesson-card/lesson-card.module';
import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
  declarations: [
    LessonsPage,
  ],
  imports: [
    LessonCardComponentModule,
    ProfileBannerComponentModule,
    HeaderComponentModule,
    FooterComponentModule,
    IonicPageModule.forChild(LessonsPage),
    TranslateModule
  ],
})
export class LessonsPageModule {}
