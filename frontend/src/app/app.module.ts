import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { TranslateLoader, TranslateStaticLoader } from 'ng2-translate/src/translate.service';
import { Globalization } from '@ionic-native/globalization';

import { MyApp } from './app.component';

import { NearbyPageModule } from '../pages/nearby/nearby.module';
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
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
		NearbyPageModule,
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
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          statusbarPadding: true,
        }
      }
    }),
    TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
    })
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
    Globalization,
    File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    BackendProvider,
    DiscussionProvider,
    LessonProvider
  ]
})
export class AppModule {}
