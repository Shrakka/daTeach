import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { LessonsPageModule } from '../pages/lessons/lessons.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ChatPageModule } from '../pages/chat/chat.module';
import { ResultsPageModule } from '../pages/results/results.module';
import { TakeFormPageModule } from '../pages/take-form/take-form.module';
import { GiveFormPageModule } from '../pages/give-form/give-form.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { EditProfilePageModule } from '../pages/profile/editprofile/editprofile.module';
import { HomePageModule } from '../pages/home/home.module';
import { MessagesPageModule } from '../pages/messages/messages.module';
import { TopicModalPageModule } from '../pages/topic-modal/topic-modal.module';
import { DetailPageModule } from '../pages/detail/detail.module';
import { LocationModalPageModule } from '../pages/location-modal/location-modal.module';
import { UserProvider } from '../providers/user/user';
import { BackendProvider } from '../providers/backend/backend';
import { DiscussionProvider } from '../providers/discussion/discussion';
import { LessonProvider } from '../providers/lesson/lesson';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    LessonsPageModule,
    LoginPageModule,
    ChatPageModule,
    DetailPageModule,
    LocationModalPageModule,
    TopicModalPageModule,
    ResultsPageModule,
    TakeFormPageModule,
    GiveFormPageModule,
    ProfilePageModule,
    EditProfilePageModule,
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
    Geolocation,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    BackendProvider,
    DiscussionProvider,
    LessonProvider
  ]
})
export class AppModule {}
