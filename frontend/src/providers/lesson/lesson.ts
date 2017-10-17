import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BackendProvider } from '../backend/backend';
import { UserProvider } from '../user/user';
import { RequestOptions } from '@angular/http';

/*
  Generated class for the LessonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LessonProvider {
  lessons;
  lesson;

  constructor(public http: Http, public userProvider: UserProvider, public backendProvider: BackendProvider) {
  }

  postLesson(form) {
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      var students = (form.role === 'student') ? [this.userProvider.user.id] : [];
      var teachers = (form.role === 'teacher') ? [this.userProvider.user.id] : [];
      var body = {author: {id: this.userProvider.user.id, role: form.role}, students: students, teachers: teachers, lessons: form.lessons, location: form.location, moving: form.moving, dates: form.dates};
      this.http.post(this.backendProvider.url + '/lesson/?apikey=' + this.backendProvider.apikey, body, options)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data)
        });
    });
  }

  postLessonRequest(form) {
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      var body = {role: form.role, lessons: form.lessons, location: form.location, moving: form.moving, dates: form.dates};
      this.http.post(this.backendProvider.url + '/lesson/request/?apikey=' + this.backendProvider.apikey, body, options)
        .map(res => res.json())
        .subscribe(data => {
          this.lessons = data
        });
    });
  }

}
