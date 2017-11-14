import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { BackendProvider } from '../backend/backend';

@Injectable()
export class UserProvider {
  isAuth: boolean = false;
  spinner: boolean = false;
  user: any;

  constructor(public http: Http, private fb: Facebook, public backendProvider: BackendProvider) {
  }

  getAge(birthyear: number) {
    return (birthyear === -1) ? '' : (new Date()).getFullYear() - birthyear
  }

  signUp(body) {
    this.spinner = true;
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      this.http.post(this.backendProvider.url + '/signup/?apikey=' + this.backendProvider.apikey, body, options)
        .map(res => res.json())
        .subscribe(
          data => {
            this.spinner = false;
            this.user = data
            this.user.public.age = this.getAge(this.user.public.birthyear)
            this.isAuth = true;
          },
          err => {
            this.spinner = false;
            this.isAuth = false;
          }
        );
    });
  }

  logIn(body) {
    this.spinner = true;
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      this.http.post(this.backendProvider.url + '/login/?apikey=' + this.backendProvider.apikey, body, options)
        .map(res => res.json())
        .subscribe(
          data => {
            this.spinner = false;
            this.user = data
            this.user.public.age = this.getAge(this.user.public.birthyear)
            this.isAuth = true;
          },
          err => {
            this.spinner = false;
            this.isAuth = false;
          }
        );
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
                this.isAuth = true;
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

  getStatic(url) {
    return this.backendProvider.static + url;
  }

  getPostPhotoURL(id) {
    return this.backendProvider.url + '/photo/' + id + + '/?apikey=' + this.backendProvider.apikey;
  }

}
