import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { BackendProvider } from '../backend/backend';

@Injectable()
export class UserProvider {
  firstname: string; //
  lastname: string; //
  age: number; //
  picture: string;
  sex: string; //
  email: string; //
  phone: string;
  shortDescription: string;
  longDescription: string;
  level: string;
  isAuth: boolean;

  user: any;


  constructor(public http: Http, private fb: Facebook, public backendProvider: BackendProvider) {
    this.load();
  }

  load() {
    this.firstname = 'Jon';
    this.lastname = 'Snow';
    this.age = 25;
    this.picture = 'assets/img/unknownprofile.png';
    this.sex = 'M';
    this.email = 'j.snow@winterfell.com';
    this.phone = '01 23 45 67 89';
    this.shortDescription = 'Knower of nothing';
    this.longDescription = 'Long Description...'
    this.level = 'Bac+3';
    this.isAuth = true;
  }

  getAge(birthyear: number) {
    return (birthyear === -1) ? '' : (new Date()).getFullYear() - birthyear
  }

  signUp(body) {
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      this.http.post(this.backendProvider.url + '/signup/?apikey=' + this.backendProvider.apikey, body, options)
        .map(res => res.json())
        .subscribe(data => {
          console.log("LOGIN", data);
          this.user = data
          this.user.public.age = this.getAge(this.user.public.birthyear)
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
          this.user.public.age = this.getAge(this.user.public.birthyear)
        });
    });
  }

  logInFB() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.fb.api('/me?fields=name,email,gender,birthday', [])
          .then((profile) => {
            var birthyear= -1;
            if (profile.birthday != null) {
              birthyear = profile.birthday.split('/')[profile.birthday.split('/').length-1];
            }
            var gender = 'N/A';
            if (profile.gender != null) {
              gender = (profile.gender === 'male') ? 'M' : 'F';
            }
            var body = {id: res.authResponse.userID, email: profile.email, firstname: profile.name.split(' ')[0], lastname: profile.name.split(' ')[1], birthyear: birthyear, gender: gender};
            var options = new RequestOptions({withCredentials: true});
            this.http.post(this.backendProvider.url + '/facebook/?apikey=' + this.backendProvider.apikey, body, options)
              .map(res => res.json())
              .subscribe(data => {
                this.user = data
              });
          })
      })
  }

  updateUser() {
    console.log("Update user");
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      this.http.put(this.backendProvider.url + '/user/' + this.user.id + '/?apikey=' + this.backendProvider.apikey, this.user, options)
      .map(res => res.json())
      .subscribe(data =>
      console.log(data));
    });
  }

  sendPhoto(path) {
    
  }

}
