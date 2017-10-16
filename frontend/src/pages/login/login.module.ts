import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { Facebook } from '@ionic-native/facebook';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    HeaderComponentModule,
    FooterComponentModule,
    IonicPageModule.forChild(LoginPage),
  ],
  providers: [
    Facebook
  ]
})
export class LoginPageModule {}
