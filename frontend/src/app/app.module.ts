import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { ResultsPageModule } from '../pages/results/results.module';
import { TakeFormPageModule } from '../pages/take-form/take-form.module';
import { GiveFormPageModule } from '../pages/give-form/give-form.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { HomePageModule } from '../pages/home/home.module';
import { MessagesPageModule } from '../pages/messages/messages.module';
import { LessonModalPageModule } from '../pages/lesson-modal/lesson-modal.module';
import { DetailPageModule } from '../pages/detail/detail.module';
import { UserProvider } from '../providers/user/user';
import { ResultsProvider } from '../providers/results/results';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    DetailPageModule,
    LessonModalPageModule,
    ResultsPageModule,
    TakeFormPageModule,
    GiveFormPageModule,
    ProfilePageModule,
    HomePageModule,
    MessagesPageModule,
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ResultsProvider
  ]
})
export class AppModule {}
