import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { BackendProvider } from '../../providers/backend/backend';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  firstname: string;
  lastname: string;
  age: number;
  picture: string;
  sex: string;
  email: string;
  phone: string;
  shortDescription: string;
  longDescription: string;
  level: string;
  isAuth: boolean;

  user: Object;


  constructor(public http: Http, private fb: Facebook, public backendProvider: BackendProvider) {
    this.load();
  }

  load() {
    this.firstname = 'Jon';
    this.lastname = 'Snow';
    this.age = 25;
    this.picture = 'assets/img/profile.png';
    this.sex = 'M';
    this.email = 'j.snow@winterfell.com';
    this.phone = '01 23 45 67 89';
    this.shortDescription = 'Knower of nothing';
    this.longDescription = 'Long Description...'
    this.level = 'Bac+3';
    this.isAuth = true;
  }

  signUp(body) {
    return new Promise(resolve => {
      console.log(this.backendProvider.url + '/signup/?apikey=' + this.backendProvider.apikey)
      var options = new RequestOptions({withCredentials: true});
      this.http.post(this.backendProvider.url + '/signup/?apikey=' + this.backendProvider.apikey, body, options)
        .map(res => res.json())
        .subscribe(data => {
          this.user = data
        });
    });
  }

  logIn(body) {
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      this.http.post(this.backendProvider.url + '/login/?apikey=' + this.backendProvider.apikey, body, options)
        .map(res => res.json())
        .subscribe(data => {
          this.user = data
          console.log(data.public.firstname)
        });
    });
  }

  logInFB() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.fb.api('/me?fields=name,email', [])
          .then((profile) => {
            var body = {id: res.authResponse.userID, email: profile.email, firstname: profile.name.split(' ')[0], lastname: profile.name.split(' ')[1]};
            console.log(this.backendProvider.url + '/facebook/?apikey=' + this.backendProvider.apikey)
            var options = new RequestOptions({withCredentials: true});
            this.http.post(this.backendProvider.url + '/facebook/?apikey=' + this.backendProvider.apikey, body, options)
              .map(res => res.json())
              .subscribe(data => {
                this.user = data
              });
          })
      })
  }
}
