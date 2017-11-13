import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { Facebook } from '@ionic-native/facebook';
import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    HeaderComponentModule,
    FooterComponentModule,
    IonicPageModule.forChild(LoginPage),
    TranslateModule
  ],
  providers: [
    Facebook
  ]
})
export class LoginPageModule {}
